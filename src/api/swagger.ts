/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignupReq {
  email: string;
  phoneCountryCode: string;
  phone: string;
}

export interface ChildrenData {
  first_name: string;
  last_name: string;
  nickname: string;
  id_number: string;
  birthday: string;
  gender: string;
  skill_level: string;
  emergency_contact_first_name: string;
  emergency_contact_last_name: string;
  emergency_contact_country_code: string;
  emergency_contact_phone: string;
}

export interface UpdateChildrenDataReq {
  mailToken: string;
  childrenDataList: ChildrenData[];
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://api.u19.org",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`
      );
      return formData;
    }, new FormData());
  }
}

/**
 * @title No title
 * @baseUrl https://api.u19.org
 */
export class Swagger<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  signup = {
    /**
     * No description
     *
     * @tags signup-api
     * @name Signup
     * @request POST:/signup
     */
    signup: (data: SignupReq, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  childrenData = {
    /**
     * No description
     *
     * @tags children-data-api
     * @name SaveChildrenData
     * @request POST:/childrenData
     */
    saveChildrenData: (
      data: UpdateChildrenDataReq,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/childrenData`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
