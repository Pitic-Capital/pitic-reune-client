import axios from "axios";
import { CreateSuperUserPayload, CreateUserPayload, TokenPayload, TokenResponse } from "../types/reune.types";

//#region Config de ambiente
export const API_URL_PROD = "https://api-reune.condusef.gob.mx";
export const API_URL_TEST = "https://api-reune-pruebas.condusef.gob.mx";

export const ENV_KEY = "APP_ENV";
export const getApiUrl = (): string => (localStorage.getItem(ENV_KEY) === "test" ? API_URL_TEST : API_URL_PROD);
//#endregion

//#region Factory
const buildClient = (token?: string) =>
   axios.create({
      baseURL: getApiUrl(),
      headers: {
         "Content-Type": "application/json",
         ...(token && { Authorization: token }),
      },
   });
//#endregion

//#region Autenticacion
/** Crea el super usuario de la institucion. Requiere la clave REDECO. */
export const createSuperUser = (payload: CreateSuperUserPayload) =>
   buildClient().post("/auth/users/create-super-user/", payload);

/** Crea un usuario normal. Requiere token del super usuario. */
export const createUser = (token: string, payload: CreateUserPayload) =>
   buildClient(token).post("/auth/users/create-user/", payload);

/** Obtiene token inicial (GET). */
export const getToken = (payload: TokenPayload) =>
   buildClient().get<TokenResponse>("/auth/users/token/", { data: payload });

/** Renueva token (POST). */
export const renewToken = (payload: TokenPayload) => buildClient().post<TokenResponse>("/auth/users/token/", payload);
//#endregion
