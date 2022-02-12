import { ArpeggiosInstance } from "arpeggios/instance";
import { createRequestMethods } from "RequestFactory";
import { Route } from "../types/route";

export interface ArpeggiosConfig {
  prefix?: string;
  routes?: {
    getAll?: Route;
    getByParam?: Route;
    deleteAll?: Route;
    deleteByParam?: Route;
    post?: Route;
    patch?: Route;
    put?: Route;
  };
  instance?: ArpeggiosInstance;
}

export type ArpeggiosMethods = ReturnType<typeof createRequestMethods>;
