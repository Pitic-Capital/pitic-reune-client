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
   InstitucionClave: string; // "Denominación o razón social"
   Sector: string; // "Sector"
   ConsultasTrim: number; // "Trimestre" (1, 2, 3 o 4)
   NumConsultas: number; // Siempre es 1
   ConsultasFolio: string; // Folio de atención único
   ConsultasEstatusCon: 1 | 2; // 1=Pendiente, 2=Concluido
   ConsultasFecAten?: string | null; // Fecha de atención (solamente si EstatusCon=2) dd/mm/aaaa
   EstadosId: number; // Entidad Federativa
   ConsultasFecRecepcion: string; // Fecha de consulta dd/mm/aaaa
   MediosId: number; // Medio de recepción
   Producto: string; // Producto y/o Servicio (12 alg)
   CausaId: string; // Causa o motivo (4 alg)
   ConsultasCP?: number | null; // Opcional dependiendo de Medio de Recepcion
   ConsultasMpioId: number; // Municipio
   ConsultasLocId?: number | null; // Localidad Opcional
   ConsultasColId?: number | null; // Colonia Opcional
   ConsultascatnivelatenId: number; // Nivel de atención
   ConsultasPori: "SI" | "NO"; // PORI
}
//#endregion

//#region Reclamaciones
export interface Reclamacion {
   RecDenominacion: string;
   RecSector: string;
   RecTrimestre: number;
   RecNumero: number;
   RecFolioAtencion: string;
   RecEstadoConPend: 1 | 2; // 1=Pendiente, 2=Concluido
   RecFechaReclamacion: string; // Fecha de Reclamación dd/mm/aaaa
   RecFechaAtencion?: string | null; // Fecha de Atención dd/mm/aaaa
   RecMedioRecepcionCanal: number;
   RecProductoServicio: string;
   RecCausaMotivo: string;
   RecFechaResolucion?: string | null; // Fecha de Resolución dd/mm/aaaa
   RecFechaNotifiUsuario?: string | null; // Fecha de Notificación dd/mm/aaaa
   RecEntidadFederativa: number;
   RecCodigoPostal?: number | null;
   RecMunicipioAlcaldia: number;
   RecLocalidad?: number | null;
   RecColonia?: number | null;
   RecMonetario: "SI" | "NO";
   RecMontoReclamado?: number | null;
   RecImporteAbonado?: number | null;
   RecFechaAbonoImporte?: string | null; // Fecha de Abono dd/mm/aaaa
   RecPori: "SI" | "NO";
   RecTipoPersona: 1 | 2; // 1=Física, 2=Moral
   RecSexo?: "H" | "M" | null;
   RecEdad?: number | null;
   RecSentidoResolucion?: 1 | 2 | 3 | null; // 1=Favorable, 2=Desfavorable, 3=Parcial
   RecNivelAtencion: number;
}
//#endregion

//#region Aclaraciones
export interface Aclaracion {
   AclaracionDenominacion: string;
   AclaracionSector: string;
   AclaracionTrimestre: number;
   AclaracionNumero: number;
   AclaracionFolioAtencion: string;
   AclaracionEstadoConPend: 1 | 2; // 1=Pendiente, 2=Concluido
   AclaracionFechaAclaracion: string; // Fecha de Aclaración dd/mm/aaaa
   AclaracionFechaAtencion?: string | null; // Fecha de Atención dd/mm/aaaa
   AclaracionMedioRecepcionCanal: number;
   AclaracionProductoServicio: string;
   AclaracionCausaMotivo: string;
   AclaracionFechaResolucion?: string | null; // Fecha de Resolución dd/mm/aaaa
   AclaracionFechaNotifiUsuario?: string | null; // Fecha de Notificación dd/mm/aaaa
   AclaracionEntidadFederativa: number;
   AclaracionCodigoPostal?: number | null;
   AclaracionMunicipioAlcaldia: number;
   AclaracionLocalidad?: number | null;
   AclaracionColonia?: number | null;
   AclaracionMonetario: "SI" | "NO";
   AclaracionMontoReclamado?: number | null;
   AclaracionPori: "SI" | "NO";
   AclaracionTipoPersona: 1 | 2; // 1=Física, 2=Moral
   AclaracionSexo?: "H" | "M" | null;
   AclaracionEdad?: number | null;
   AclaracionSentidoResolucion?: 1 | 2 | 3 | null; // 1=Favorable, 2=Desfavorable, 3=Parcial
   AclaracionNivelAtencion: number;
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
