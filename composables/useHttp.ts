import type { FetchOptions } from "ofetch";

type Url = string;
type Options = FetchOptions;
type HttpMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE";
type Body = Record<string, any> | FormData;
export interface Response<T> {
  data: T;
  message: string;
  status: number;
}

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
      credentials: "same-origin",
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

  const $get = async <T = Record<string, any>>(url: Url, options?: Options) => {
    const { data } = await get<T>(url, options);
    return data;
  };

  const put = <T = Record<string, any>>(
    url: Url,
    body?: Body,
    options?: Options
  ) => request<Response<T>>(url, "PUT", body, options);

  const del = <T = Record<string, any>>(url: Url, options?: Options) =>
    request<Response<T>>(url, "DELETE", undefined, options);

  return {
    get,
    $get,
    post,
    put,
    delete: del,
  };
}
