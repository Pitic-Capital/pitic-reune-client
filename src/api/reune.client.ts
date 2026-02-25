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

const buildRedecoClient = (token?: string) =>
   axios.create({
      baseURL:
         localStorage.getItem(ENV_KEY) === "test"
            ? "https://api.condusef.gob.mx"
            : "https://api-redeco.condusef.gob.mx",
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

//#region Consultas
export const sendConsultas = (token: string, payload: any[]) => buildClient(token).post("/reune/consultas", payload);

export const getConsultasTotal = (token: string) =>
   buildClient(token).get("/reune/consultas/obtener/consultageneral/total");

export const getConsultas = (token: string, page: number) =>
   buildClient(token).get(`/reune/consultas/obtener/consultageneral/${page}`);

export const deleteConsulta = (token: string, folio: string) => buildClient(token).delete(`/reune/consultas/${folio}`);
//#endregion

//#region Reclamaciones
export const sendReclamaciones = (token: string, payload: any[]) =>
   buildClient(token).post("/reune/reclamaciones", payload);

export const getReclamacionesTotal = (token: string) =>
   buildClient(token).get("/reune/reclamaciones/obtener/reclamaciongeneral/total");

export const getReclamaciones = (token: string, page: number) =>
   buildClient(token).get(`/reune/reclamaciones/obtener/reclamaciongeneral/${page}`);

export const deleteReclamacion = (token: string, folio: string) =>
   buildClient(token).delete(`/reune/reclamaciones/${folio}`);
//#endregion

//#region Aclaraciones
export const sendAclaraciones = (token: string, payload: any[]) =>
   buildClient(token).post("/reune/aclaraciones", payload);

export const getAclaracionesTotal = (token: string) =>
   buildClient(token).get("/reune/aclaraciones/obtener/aclaraciongeneral/total");

export const getAclaraciones = (token: string, page: number) =>
   buildClient(token).get(`/reune/aclaraciones/obtener/aclaraciongeneral/${page}`);

export const deleteAclaracion = (token: string, folio: string) =>
   buildClient(token).delete(`/reune/aclaraciones/${folio}`);
//#endregion

//#region Catalogos institucionales
export const getCatalogoMediosRecepcion = (token: string) => buildRedecoClient(token).get("/catalogos/medio-recepcion");

export const getCatalogoNivelesAtencion = (token: string) =>
   buildRedecoClient(token).get("/catalogos/niveles-atencion");

export const getCatalogoProductos = (token: string) => buildRedecoClient(token).get("/catalogos/products-list");

export const getCatalogoCausas = (token: string, productId: string) =>
   buildRedecoClient(token).get(`/catalogos/causas-list/?product=${productId}`);
//#endregion

//#region SEPOMEX
export const getEstados = () => buildRedecoClient().get("/sepomex/estados/");

export const getCodigosPostales = (estadoId: number) =>
   buildRedecoClient().get(`/sepomex/codigos-postales/?estado_id=${estadoId}`);

export const getMunicipios = (estadoId: number, cp: string) =>
   buildRedecoClient().get(`/sepomex/municipios/?estado_id=${estadoId}&cp=${cp}`);

export const getColonias = (cp: string) => buildRedecoClient().get(`/sepomex/colonias/?cp=${cp}`);
//#endregion
