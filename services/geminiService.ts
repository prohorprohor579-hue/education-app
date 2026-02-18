// services/geminiService.ts
// Safe Gemini service for Vite + TypeScript
// Uses env var: VITE_GEMINI_API_KEY

export type GeminiRole = "user" | "model";

export type GeminiPart = { text: string };

export type GeminiMessage = {
  role: GeminiRole;
  parts: GeminiPart[];
};

export type GeminiGenerateOptions = {
  model?: string;          // default: "gemini-1.5-flash"
  temperature?: number;    // 0.0 - 2.0
  maxOutputTokens?: number;
  topP?: number;
  topK?: number;
  timeoutMs?: number;      // default: 20000
};

function getApiKey(): string {
  const key = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  if (!key || typeof key !== "string") {
    throw new Error("Missing API key. Set VITE_GEMINI_API_KEY in .env");
  }
  return key.trim();
}

function safeText(input: unknown): string {
  if (typeof input !== "string") return "";
  // Basic sanitization: remove very long junk, keep it safe for logs/UI
  return input.replace(/\u0000/g, "").slice(0, 20000);
}

function buildUserMessage(prompt: string): GeminiMessage {
  return {
    role: "user",
    parts: [{ text: safeText(prompt) }],
  };
}

export async function geminiGenerateText(
  prompt: string,
  history: GeminiMessage[] = [],
  options: GeminiGenerateOptions = {}
): Promise<string> {
  const apiKey = getApiKey();

  const model = options.model ?? "gemini-1.5-flash";
  const timeoutMs = options.timeoutMs ?? 20000;

  // Basic guard
  const trimmed = safeText(prompt).trim();
  if (!trimmed) return "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const body = {
      contents: [...history, buildUserMessage(trimmed)],
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        topP: options.topP ?? 0.95,
        topK: options.topK ?? 40,
        maxOutputTokens: options.maxOutputTokens ?? 1024,
      },
      // Safety settings can be added here if needed
      // safetySettings: [...]
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg =
        data?.error?.message ||
        `Gemini request failed (${res.status})`;
      throw new Error(msg);
    }

    // Extract text safely
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => (typeof p?.text === "string" ? p.text : ""))
        ?.join("") ?? "";

    return safeText(text).trim();
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new Error("Request timeout. Try again.");
    }
    throw new Error(err?.message || "Something went wrong.");
  } finally {
    clearTimeout(timeout);
  }
}
