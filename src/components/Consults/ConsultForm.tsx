import {
   TextField,
   Button,
   Stack,
   Box,
   MenuItem,
   Select,
   FormControl,
   InputLabel,
   Chip,
   Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { es } from "date-fns/locale";
import { sendConsultas } from "../../api/reune.client";
import { useCatalogues } from "../../context/CataloguesContext";
import { useSnackbar } from "../../context/SnackbarContext";

const ConsultForm = () => {
   const {
      mediosRecepcion,
      nivelesAtencion,
      productos,
      estados,
      causas,
      postalCodes,
      municipalities,
      neighborhoods,
      fetchCausas,
      fetchMunicipalities,
      fetchNeighborhoods,
   } = useCatalogues();

   const mapOptions = (arr) => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item) => {
         const [id, label] = Object.values(item);
         return { id, label };
      });
   };

   const getFirstId = (arr) => (arr?.length ? Object.values(arr[0])[0] : null);

   useEffect(() => {
      fetchCausas(getFirstId(productos) as string);
      fetchMunicipalities("26", "83000");
      fetchNeighborhoods("83000");
   }, []);

   const fieldConfig = useMemo(
      () => ({
         InstitucionClave: {
            label: "Denominación o razón social",
            type: "string",
            options: [],
            default: "Pitic Capital, S.A.P.I. de C.V., SOFOM, E.N.R.",
            onChange: () => {},
         },
         Sector: {
            label: "Sector",
            type: "string",
            options: [],
            default: "Sociedades Financieras de Objeto Múltiple E.N.R.",
            onChange: () => {},
         },
         ConsultasTrim: {
            label: "Trimestre",
            type: "select",
            options: [
               { id: 1, label: "Trimestre 1" },
               { id: 2, label: "Trimestre 2" },
               { id: 3, label: "Trimestre 3" },
               { id: 4, label: "Trimestre 4" },
            ],
            default: 1,
            onChange: () => {},
         },

         NumConsultas: {
            label: "Número de consultas",
            type: "number",
            options: [],
            default: 1,
            disabled: true,
            onChange: () => {},
         },
         ConsultasFolio: { label: "Número de folio", type: "string", options: [], default: "", onChange: () => {} },
         ConsultasFecRecepcion: {
            label: "Fecha de recepción",
            type: "date",
            options: [],
            default: new Date(),
            onChange: () => {},
         },
         MediosId: {
            label: "Medio de recepción o canal",
            type: "select",
            options: mapOptions(mediosRecepcion),
            default: getFirstId(mediosRecepcion),
            onChange: () => {},
         },
         ConsultascatnivelatenId: {
            label: "Nivel de atención",
            type: "select",
            options: mapOptions(nivelesAtencion),
            default: getFirstId(nivelesAtencion),
            onChange: () => {},
         },
         Producto: {
            label: "Producto y/o Servicio",
            type: "select",
            options: mapOptions(productos),
            default: getFirstId(productos),
            onChange: (value) => {
               fetchCausas(value);
            },
         },
         CausaId: {
            label: "Causa de la consulta",
            type: "select",
            options: mapOptions(causas),
            default: getFirstId(causas),
            onChange: () => {},
         },
         ConsultasPori: {
            label: "PORI",
            type: "select",
            options: [
               { id: "SI", label: "Sí" },
               { id: "NO", label: "No" },
            ],
            default: "SI",
            onChange: () => {},
         },
         ConsultasEstatusCon: {
            label: "Estado de la consulta",
            type: "select",
            options: [
               { id: 1, label: "Pendiente" },
               { id: 2, label: "Concluido" },
            ],
            default: 1,
            onChange: () => {},
         },
         EstadosId: {
            label: "Entidad Federativa",
            type: "select",
            options: mapOptions(estados),
            default: 26,
            onChange: () => {},
         },
         ConsultasMpioId: {
            label: "Municipio o Alcaldía",
            type: "select",
            options: mapOptions(municipalities),
            default: 30,
            onChange: () => {},
         },
         ConsultasLocId: { label: "Localidad", type: "string", options: [], default: null, onChange: () => {} },
         ConsultasColId: {
            label: "Colonia",
            type: "select",
            options: mapOptions(neighborhoods),
            default: getFirstId(neighborhoods),
            onChange: () => {},
         },
         ConsultasCP: {
            label: "Código Postal",
            type: "string",
            options: [],
            default: 83000,
            onChange: (value) => {
               fetchNeighborhoods(value);
            },
         },
         ConsultasFecAten: {
            label: "Fecha de atención",
            type: "date",
            options: [],
            default: new Date(),
            onChange: () => {},
         },
      }),
      [causas, postalCodes, municipalities, neighborhoods],
   );

   const defaultValues = Object.fromEntries(Object.entries(fieldConfig).map(([key, config]) => [key, config.default]));

   const { control, handleSubmit, reset } = useForm({ defaultValues });
   const { showSnackbar } = useSnackbar();
   const [loading, setLoading] = useState(false);

   const isTestEnv = localStorage.getItem("APP_ENV") === "test";

   const fillTestData = () => {
      const folio = `TEST/${new Date().getFullYear()}/REUNE_${Date.now()}`;
      reset({
         ...defaultValues,
         ConsultasFolio: folio,
         ConsultasTrim: 1,
         NumConsultas: 1,
         ConsultasFecRecepcion: new Date(new Date().getFullYear(), 0, 1),
         MediosId: getFirstId(mediosRecepcion),
         ConsultascatnivelatenId: getFirstId(nivelesAtencion),
         Producto: getFirstId(productos),
         CausaId: getFirstId(causas),
         ConsultasPori: "NO",
         ConsultasEstatusCon: 1,
         EstadosId: 26,
         ConsultasMpioId: getFirstId(municipalities) ?? 30,
         ConsultasLocId: null,
         ConsultasColId: getFirstId(neighborhoods),
         ConsultasCP: 83000,
         ConsultasFecAten: null,
      });
   };

   const formatToDDMMYY = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());
      return `${day}/${month}/${year}`;
   };

   const onSubmit = async (data: any) => {
      const token = localStorage.getItem("AUTH_TOKEN_REUNE");
      if (!token) {
         showSnackbar("Sesión expirada. Inicia sesión nuevamente.", "error");
         return;
      }
      setLoading(true);
      try {
         const formattedData = {
            ...data,
            ConsultasCP: data.ConsultasCP ? Number(data.ConsultasCP) : null,
            ConsultasFecRecepcion: data.ConsultasFecRecepcion ? formatToDDMMYY(data.ConsultasFecRecepcion) : null,
            ConsultasFecAten: data.ConsultasFecAten ? formatToDDMMYY(data.ConsultasFecAten) : null,
         };

         const res = await sendConsultas(token, [formattedData]);
         const foliosEnviados = res.data?.["Consultas enviadas"]?.join(", ") ?? data.ConsultasFolio;
         showSnackbar(`Consulta enviada exitosamente. Folios: ${foliosEnviados}`, "success");
         reset(defaultValues);
      } catch (err: any) {
         const apiErrors = err?.response?.data?.errors;
         if (apiErrors) {
            showSnackbar((Object.values(apiErrors) as string[][]).flat().join("\n"), "error");
         } else {
            showSnackbar(
               err?.response?.data?.message || err?.response?.data?.error || err.message || "Error desconocido",
               "error",
            );
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
         <Box sx={{ maxWidth: 960, mx: "auto", width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing={2}>
                  {isTestEnv && (
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "space-between",
                           p: 1.5,
                           bgcolor: "#fff8e1",
                           borderRadius: 1,
                           border: "1px solid #ffe082",
                        }}
                     >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                           <Chip
                              label="TEST"
                              size="small"
                              sx={{ bgcolor: "#f57c00", color: "#fff", fontWeight: "bold", fontSize: 10 }}
                           />
                           <Typography variant="caption" color="text.secondary">
                              Ambiente de pruebas
                           </Typography>
                        </Box>
                        <Button size="small" variant="outlined" color="warning" onClick={fillTestData}>
                           Llenar datos de prueba
                        </Button>
                     </Box>
                  )}
                  <Box
                     sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                     }}
                  >
                     {Object.entries(fieldConfig).map(([name, config]) => (
                        <Box
                           key={name}
                           sx={{
                              flex: "1 1 45%",
                              minWidth: "250px",
                           }}
                        >
                           <Controller
                              name={name}
                              control={control}
                              defaultValue=""
                              render={({ field }) => {
                                 switch (config.type) {
                                    case "date":
                                       return (
                                          <DatePicker
                                             label={config.label}
                                             value={(field.value as Date) || null}
                                             onChange={(date) => field.onChange(date)}
                                             slotProps={{ textField: { size: "small", fullWidth: true } }}
                                             minDate={new Date("2000-01-01")}
                                             maxDate={new Date()}
                                          />
                                       );
                                    case "select":
                                       return (
                                          <FormControl fullWidth>
                                             <InputLabel>{config.label}</InputLabel>
                                             <Controller
                                                name={name}
                                                control={control}
                                                render={({ field }) => (
                                                   <Select
                                                      {...field}
                                                      label={fieldConfig[name].label}
                                                      size="small"
                                                      onChange={(e) => {
                                                         field.onChange(e);
                                                         fieldConfig[name]?.onChange?.(e.target.value);
                                                      }}
                                                      MenuProps={{
                                                         PaperProps: {
                                                            style: {
                                                               maxHeight: 300,
                                                               overflow: "auto",
                                                               whiteSpace: "normal",
                                                               wordBreak: "break-word",
                                                            },
                                                         },
                                                      }}
                                                   >
                                                      {fieldConfig[name].options.map((option) => (
                                                         <MenuItem key={option.id} value={option.id}>
                                                            {option.label}
                                                         </MenuItem>
                                                      ))}
                                                   </Select>
                                                )}
                                             />
                                          </FormControl>
                                       );
                                    default:
                                       return (
                                          <TextField
                                             {...field}
                                             type={config.type === "number" ? "number" : "text"}
                                             label={config.label}
                                             fullWidth
                                             variant="outlined"
                                             size="small"
                                             onChange={(e) => {
                                                field.onChange(e);
                                                config.onChange?.(e.target.value);
                                             }}
                                          />
                                       );
                                 }
                              }}
                           />
                        </Box>
                     ))}
                  </Box>
                  <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: "#305e58ff" }}>
                     {loading ? "Enviando..." : "Enviar"}
                  </Button>
               </Stack>
            </form>
         </Box>
      </LocalizationProvider>
   );
};

export default ConsultForm;
