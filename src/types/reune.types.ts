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
