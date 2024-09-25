import type { FetchOptions } from "ofetch";

type Url = string;
type Options = FetchOptions;
type HttpMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE";
type Body = Record<string, any> | FormData;
export type Response<T> = T;

export function useHttp() {
  const config = useRuntimeConfig();

  function request<T, B = Body>(
    url: Url,
    method: HttpMethod,
    body?: B,
    options?: Options
  ): Promise<T> {
    const isFormData = body instanceof FormData;

    return $fetch<T>(url, {
      baseURL: config.public.apiUrl,
      // baseURL: "/api",
      headers: {
        Accept: "application/json",
      },
      method: method as any,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
      ...options,
    });
  }

  const post = <T = Record<string, any>>(
    url: Url,
    body?: Body,
    options?: Options
  ) => request<Response<T>>(url, "POST", body, options);

  const get = <T = Record<string, any>>(url: Url, options?: Options) =>
    request<Response<T>>(url, "GET", undefined, options);

  const put = <T = Record<string, any>>(
    url: Url,
    body?: Body,
    options?: Options
  ) => request<Response<T>>(url, "PUT", body, options);

  const del = <T = Record<string, any>>(url: Url, options?: Options) =>
    request<Response<T>>(url, "DELETE", undefined, options);

  return {
    get,
    post,
    put,
    delete: del,
  };
}
