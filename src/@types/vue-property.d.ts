/* eslint-disable */
import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: string;
    $validate: (data: Record<string, unknown>, rule: Record<string, unknown>) => boolean;
  }
}
