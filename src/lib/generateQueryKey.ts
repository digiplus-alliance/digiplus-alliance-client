export type GenerateQueryKeyOptions = {
  url: string;
  baseUrl?: string;
  hasAuth?: boolean;
};

export function generateQueryKey({ url, baseUrl, hasAuth }: GenerateQueryKeyOptions) {
  const prefix = baseUrl ? baseUrl.replace(/\/+$/, "") : "";
  const key = [prefix, url].filter(Boolean).join("");
  return ["api", hasAuth ? "auth" : "public", key];
}
