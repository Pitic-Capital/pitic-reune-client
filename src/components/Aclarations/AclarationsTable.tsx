import { useEffect, useState, useCallback } from "react";
import { Alert, Stack } from "@mui/material";
import { TableComponent } from "../Common/TableComponent";
import { getAclaraciones, getAclaracionesTotal, deleteAclaracion } from "../../api/reune.client";
import ConfirmDeleteDialog from "../Common/ConfirmDeleteDialog";
import { useSnackbar } from "../../context/SnackbarContext";

const AclarationsTable = () => {
   const [error, setError] = useState("");
   const [consultData, setConsultData] = useState([]);

   const [deleteItem, setDeleteItem] = useState<any>(null);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const { showSnackbar } = useSnackbar();

   const fetchData = useCallback(async () => {
      setError("");
      const token = localStorage.getItem("AUTH_TOKEN_REUNE");
      if (!token) return setError("Token no disponible");

      try {
         // Paso 1: Obtener total de páginas
         const { data: totalData } = await getAclaracionesTotal(token);

         const totalPages = totalData?.folios?.[0]?.paginas || 0;

         if (totalPages === 0) {
            setConsultData([]);
            return setError("No se encontraron aclaraciones generales.");
         }

         // Paso 2: Obtener datos de cada página
         const requests = Array.from({ length: totalPages }, (_, i) => getAclaraciones(token, i + 1));

         const responses = await Promise.all(requests);
         const allResults = responses.flatMap((res: any) => res.data?.folios || []);

         // Paso 3: Transformar y guardar
         const transformed = [
            {
               label: "Aclaraciones Generales",
               data: allResults,
            },
         ];
         setConsultData(transformed);
      } catch (err: any) {
         const msg = err?.response?.data?.error || err.message || "Error desconocido";
         setError("Error al consultar aclaraciones: " + msg);
         setConsultData([]);
      }
   }, []);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   const handleDeleteClick = (item: any) => {
      setDeleteItem(item);
      setIsDialogOpen(true);
   };

   const handleConfirmDelete = async () => {
      if (!deleteItem) return;
      const token = localStorage.getItem("AUTH_TOKEN_REUNE");
      setIsDeleting(true);
      try {
         await deleteAclaracion(token!, deleteItem.AclaracionFolioAtencion);
         showSnackbar("Aclaración eliminada exitosamente", "success");
         fetchData();
      } catch (err: any) {
         const msg = err?.response?.data?.error || err.message || "Error al eliminar";
         showSnackbar(msg, "error");
      } finally {
         setIsDeleting(false);
         setIsDialogOpen(false);
         setDeleteItem(null);
      }
   };

   return (
      <Stack spacing={2}>
         {error && <Alert severity={"error"}>{error}</Alert>}
         {consultData.map(({ data, label }) => (
            <Stack key={label} spacing={2}>
               <Alert severity={Array.isArray(data) && data.length > 0 ? "success" : "warning"}>
                  {data.length > 0 ? `${label} cargadas` : `No se pudo cargar ${label.toLowerCase()}`}
               </Alert>
               <TableComponent data={data} label={label} onDeleteRow={handleDeleteClick} />
            </Stack>
         ))}

         <ConfirmDeleteDialog
            open={isDialogOpen}
            folio={deleteItem?.AclaracionFolioAtencion}
            loading={isDeleting}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDialogOpen(false)}
         />
      </Stack>
   );
};

export default AclarationsTable;
