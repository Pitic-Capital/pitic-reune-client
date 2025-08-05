import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
import axios from "axios";
import { TableComponent } from "../Common/TableComponent";
import { API_URL } from "../../const/api_urls";

const ConsultsTable = () => {
   const [error, setError] = useState("");
   const [consultData, setConsultData] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         setError("");
         const token = localStorage.getItem("AUTH_TOKEN");
         if (!token) return setError("Token no disponible");

         try {
            // Paso 1: Obtener total de páginas
            const { data: totalData } = await axios.get(
               `${API_URL}/reune/consultas/obtener/consultageneral/total`,
               { headers: { Authorization: token } }
            );

            const totalPages = totalData?.folios?.[0]?.paginas || 0;

            if (totalPages === 0) {
               return setError("No se encontraron consultas generales.");
            }

            // Paso 2: Obtener datos de cada página
            const requests = Array.from({ length: totalPages }, (_, i) =>
               axios.get(`${API_URL}/reune/consultas/obtener/consultageneral/${i + 1}`, {
                  headers: { Authorization: token },
               })
            );

            const responses = await Promise.all(requests);
            const allResults = responses.flatMap((res) => res.data?.folios || []);

            // Paso 3: Transformar y guardar
            const transformed = [
               {
                  label: "Consultas Generales",
                  data: allResults,
               },
            ];
            setConsultData(transformed);
         } catch (err: any) {
            const msg = err?.response?.data?.error || err.message || "Error desconocido";
            setError("Error al consultar quejas: " + msg);
         }
      };

      fetchData();
   }, []);

   return (
      <Stack spacing={2}>
         {error && <Alert severity={"error"}>{error}</Alert>}
         {consultData.map(({ data, label }) => (
            <Stack key={label} spacing={2}>
               <Alert severity={Array.isArray(data) && data.length > 0 ? "success" : "warning"}>
                  {data.length > 0 ? `${label} cargadas` : `No se pudo cargar ${label.toLowerCase()}`}
               </Alert>
               <TableComponent data={data} label={label} />
            </Stack>
         ))}
      </Stack>
   );
};

export default ConsultsTable;
