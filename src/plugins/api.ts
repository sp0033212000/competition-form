import { Plugin } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { loadingEventEmitter } from "@/events";
import { Swagger } from "@/api";

const baseURL = "https://api.u19.org";
const api = axios.create({ baseURL });

const onRequest = (
  config: AxiosRequestConfig
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  if (!config.disableLoader) {
    loadingEventEmitter.emit(true);
  }

  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers!["X-PC-TEACHER-TOKEN"] = token;
  }
  return config;
};

const onResponse = async (response: AxiosResponse) => {
  if (!response.config.disableLoader) {
    loadingEventEmitter.emit(false);
  }
  return response;
};

const onResponseError = (error: any) => {
  if (!error.response.config?.disableLoader) {
    loadingEventEmitter.emit(false);
  }
  if (error.response.config?.showErrorAlert) {
    const errorResponse = error?.response?.data;
    const errorCode = errorResponse?.code;
    const errorName = errorResponse?.name;
    const errorMessages = errorResponse?.messages;
    alert(`${errorCode}: ${errorName}\n${JSON.stringify(errorMessages)}`);
  }

  return Promise.reject(error);
};

api.interceptors.request.use(onRequest);
api.interceptors.response.use(onResponse, onResponseError);

const API = new Swagger();
API.instance = api;

const apiPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$api = API;
  },
};

export default apiPlugin;
