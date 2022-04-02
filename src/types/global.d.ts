import "axios";
import { Swagger } from "@/api";

declare module "axios" {
  interface AxiosRequestConfig {
    disableLoader?: boolean;
    showErrorAlert?: boolean;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: Swagger<any>;
  }
}
