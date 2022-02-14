import { AxiosResponse } from "axios";

import { CachiosInstance, CachiosRequestConfig } from "cachios";

import { routeBuilder } from "../utils/route";
import { payloadBuilder } from "../utils/payload";
import { Route } from "../types/route";
import { Key } from "types/payload";

export type WithPayloadHTTPMethods = "post" | "put" | "patch";

export const withPayloadRequestMethods: Record<string, WithPayloadHTTPMethods> = {
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

export interface WithPayloadRequestFactoryProps {
  cachios: CachiosInstance;
  prefix: string;
  method: WithPayloadHTTPMethods;
}

type DataPayload<T> = T | { [key in Key]: T };

/**
 * Util Method For Sending HTTP Requests
 * @param cachios - Cachios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequest =
  ({ cachios, prefix, method }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType>(route?: Route, key?: Key, config?: CachiosRequestConfig) => {
    return async (data: PayloadType) =>
      cachios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilder(prefix, route),
        payloadBuilder(data, key),
        config
      ).then((res) => res.data);
  };
