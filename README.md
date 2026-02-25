# pitic-reune-client

Frontend para la integración con la **API REUNE de CONDUSEF**. Permite a instituciones financieras registrar, consultar y eliminar **Consultas, Reclamaciones y Aclaraciones** de usuarios a través de una interfaz web integrada.

**URL produccion:** https://Pitic-Capital.github.io/pitic-reune-client

---

## Requisitos

- Node.js >= 16
- npm >= 8

---

## Ejecucion local

```bash
npm install
npm start
```

La app estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Deploy a GitHub Pages

```bash
npm run deploy
```

Esto ejecuta el build de produccion y publica automaticamente en la rama `gh-pages`.

---

## Modulos principales

### `src/api/reune.client.ts`

Cliente centralizado con todas las llamadas a las distintas APIs de CONDUSEF.

| Region                    | Funciones                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| Config de ambiente        | `getApiUrl`, `ENV_KEY`, URLs dinámicas de producción y pruebas                                          |
| Autenticacion             | `createSuperUser`, `createUser`, `getToken`, `renewToken`                                               |
| Consultas                 | `sendConsultas`, `deleteConsulta`, `getConsultas`, `getConsultasTotal`                                  |
| Reclamaciones             | `sendReclamaciones`, `deleteReclamacion`, `getReclamaciones`, `getReclamacionesTotal`                   |
| Aclaraciones              | `sendAclaraciones`, `deleteAclaracion`, `getAclaraciones`, `getAclaracionesTotal`                       |
| Catalogos institucionales | `getCatalogoMediosRecepcion`, `getCatalogoNivelesAtencion`, `getCatalogoProductos`, `getCatalogoCausas` |
| SEPOMEX                   | `getEstados`, `getCodigosPostales`, `getMunicipios`, `getColonias`                                      |

> **Nota:** Los catálogos institucionales y códigos postales en REUNE consumen por debajo la URL de la API REDECO.

### `src/types/reune.types.ts`

Tipos y contratos TypeScript (`Consulta`, `Reclamacion`, `Aclaracion`, `BaseResponseEnvio`, etc.).

### `src/pages/`

| Archivo         | Descripcion                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| `Login.tsx`     | Autenticacion con usuario y contrasena. Incluye toggle de ambiente (produccion / pruebas). |
| `Dashboard.tsx` | Vista principal con pestañas para Consultas, Aclaraciones, Reclamaciones y Catálogos.      |

### `src/components/`

| Archivo                            | Descripcion                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `Form.tsx`                         | Formulario principal centralizado para el registro de los módulos.                                 |
| `Consults/ConsultsTable.tsx`       | Paginación, consulta y eliminación específica de **Consultas**.                                    |
| `Aclarations/AclarationsTable.tsx` | Paginación, consulta y eliminación específica de **Aclaraciones**.                                 |
| `Complaints/ComplaintsTable.tsx`   | Paginación, consulta y eliminación específica de **Reclamaciones**.                                |
| `Catalogues.tsx`                   | Visualiza en formato _custom tab panels_ los catálogos descargados de la institución.              |
| `Common/TableComponent.tsx`        | Tabla genérica paginada con soporte de scroll horizontal y control de skeleton de carga integrado. |
| `Common/ConfirmDeleteDialog.tsx`   | Diálogo de confirmacion de eliminación reutilizable con el tema UI corporativo de la empresa.      |
| `Common/TabPanel.tsx`              | Contenedor semántico responsivo para el contenido de las pestañas en el Dashboard.                 |

### `src/context/CataloguesContext.tsx`

Context global que carga y expone los catalogos institucionales y SEPOMEX al inicio de la sesión. Disponible vía `useCatalogues()`.

- Implementa `loading` base para renderizar _skeletons_ visuales en su lugar.
- Implementa _retry logic_ (3 intentos con retrasos exponenciales) de respaldo.

### `src/context/SnackbarContext.tsx`

Context global de notificaciones UI (`useSnackbar()`). Facilita invocar una alerta emergente (success, error, warning) que desaparece automáticamente o a demanda del usuario en cualquier punto de la aplicación.

---

## Ambientes

El ambiente se controla desde el **Switch/Toggle** en la pantalla de Login y se persiste en `localStorage` bajo la llave `APP_ENV`.

| Valor            | URL Base de Peticiones REUNE        |
| ---------------- | ----------------------------------- |
| `prod` (default) | `https://api-reune.condusef.gob.mx` |
| `test`           | `https://api.condusef.gob.mx`       |

---

## Referencia API

- **Documentación de diccionarios:** PDF y manuales técnicos del REUNE.
- Soporte tecnico CONDUSEF: `soporte.api@condusef.gob.mx`
