//#region Autenticacion
export interface CreateSuperUserPayload {
   key: string;
   username: string;
   password: string;
   confirm_password: string;
}

export interface CreateUserPayload {
   username: string;
   password: string;
   confirm_password: string;
}

export interface TokenPayload {
   username: string;
   password: string;
}

export interface TokenResponse {
   msg: string;
   user: {
      token_access: string;
      username: string;
   };
}
//#endregion

//#region Tipos Base
export interface BaseResponseEnvio {
   "Número total de envios": number;
   message: string;
}

export interface RespuestaEnvioConsultas extends BaseResponseEnvio {
   "Consultas enviadas": string[];
}

export interface RespuestaEnvioReclamaciones extends BaseResponseEnvio {
   "Reclamaciones enviadas": string[];
}

export interface RespuestaEnvioAclaraciones extends BaseResponseEnvio {
   "Aclaraciones enviadas": string[];
}

export interface EnvioErrorResponse {
   errors: Record<string, string[]>;
   message: string;
}

export interface PaginatedFoliosResponse {
   folios: any[];
}
//#endregion

//#region Consultas
export interface Consulta {
   ConsultasDenominacion: string;
   ConsultasSector: string;
   ConsultasNoMes: number;
   ConsultasNum: number;
   ConsultasFolio: string;
   ConsultasEstatusCon: 1 | 2; // 1=Pendiente, 2=Concluido
   ConsultasFecRecepcion: string; // dd/mm/aaaa
   ConsultasMedio: number;
   ConsultasNivelAT: number;
   ConsultasProducto: string;
   ConsultasCausa: string;
   ConsultasCP: number;
   ConsultasMunId: number;
   ConsultasLocId?: number | null;
   ConsultasColId: number;
   ConsultasEstados: number;
   ConsultasPori: "SI" | "NO";
   ConsultasFecAtencion?: string | null; // dd/mm/aaaa
}
//#endregion

//#region Reclamaciones
export interface Reclamacion {
   ReclamacionDenominacion: string;
   ReclamacionSector: string;
   ReclamacionNoMes: number;
   ReclamacionNum: number;
   ReclamacionFolio: string;
   ReclamacionEstatusRec: 1 | 2; // 1=Pendiente, 2=Concluido
   ReclamacionFecRecepcion: string; // dd/mm/aaaa
   ReclamacionMedio: number;
   ReclamacionNivelAT: number;
   ReclamacionProducto: string;
   ReclamacionCausa: string;
   ReclamacionCP: number;
   ReclamacionMunId: number;
   ReclamacionLocId?: number | null;
   ReclamacionColId: number;
   ReclamacionEstados: number;
   ReclamacionPori: "SI" | "NO";
   ReclamacionTipoPersona: 1 | 2; // 1=Física, 2=Moral
   ReclamacionSexo?: "H" | "M" | null;
   ReclamacionEdad?: number | null;
   ReclamacionFecAtencion?: string | null; // dd/mm/aaaa
   ReclamacionFecResolucion?: string | null; // dd/mm/aaaa
   ReclamacionFecNotificacion?: string | null; // dd/mm/aaaa
   ReclamacionRespuesta?: 1 | 2 | 3 | null; // 1=Favorable, 2=Desfavorable, 3=Parcial
   ReclamacionNumPenal?: number | null;
   ReclamacionPenalizacion?: 1 | 2 | 3 | null;
}
//#endregion

//#region Aclaraciones
export interface Aclaracion {
   AclaracionDenominacion: string;
   AclaracionSector: string;
   AclaracionNoMes: number;
   AclaracionNum: number;
   AclaracionFolio: string;
   AclaracionEstatusAcla: 1 | 2; // 1=Pendiente, 2=Concluido
   AclaracionFecRecepcion: string; // dd/mm/aaaa
   AclaracionMedio: number;
   AclaracionNivelAT: number;
   AclaracionProducto: string;
   AclaracionCausa: string;
   AclaracionCP: number;
   AclaracionMunId: number;
   AclaracionLocId?: number | null;
   AclaracionColId: number;
   AclaracionEstados: number;
   AclaracionPori: "SI" | "NO";
   AclaracionFecAtencion?: string | null; // dd/mm/aaaa
   AclaracionFecResolucion?: string | null; // dd/mm/aaaa
   AclaracionFecNotificacion?: string | null; // dd/mm/aaaa
   AclaracionRespuesta?: 1 | 2 | 3 | null; // 1=Favorable, 2=Desfavorable, 3=Parcial
}
//#endregion

//#region SEPOMEX
export interface Estado {
   estadoId: number;
   estado: string;
}

/** Forma normalizada usada internamente para selects de SEPOMEX */
export interface SelectOption {
   id: string | number;
   label: string;
}
//#endregion
