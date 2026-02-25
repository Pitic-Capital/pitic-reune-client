import { Box, Paper, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useCatalogues } from "../context/CataloguesContext";
import { useState } from "react";
import { TableComponent } from "./Common/TableComponent";
import TabPanel from "./Common/TabPanel";

const Catalogues = () => {
   const [tabIndex, setTabIndex] = useState(0);

   const { mediosRecepcion, nivelesAtencion, productos, estados, loading } = useCatalogues();

   // Si esta cargando, mostramos skeleton tabs y skeleton tables
   if (loading) {
      return (
         <Box sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}>
               <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
            </Box>
            <Box sx={{ p: 3 }}>
               <Skeleton variant="rounded" height={400} />
            </Box>
         </Box>
      );
   }

   const tabsConfig = [
      { label: "Medios de recepción", data: mediosRecepcion },
      { label: "Niveles de atención", data: nivelesAtencion },
      { label: "Productos", data: productos },
      { label: "Estados (SEPOMEX)", data: estados },
   ];

   return (
      <Paper elevation={0} sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
         <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f8fdfc" }}>
            <Tabs
               value={tabIndex}
               onChange={(_, newValue) => setTabIndex(newValue)}
               variant="scrollable"
               scrollButtons="auto"
               textColor="inherit"
               TabIndicatorProps={{ style: { backgroundColor: "#305e58ff" } }}
               sx={{ "& .MuiTab-root": { fontWeight: "bold", color: "#305e58ff" } }}
            >
               {tabsConfig.map((tab, idx) => (
                  <Tab key={idx} label={tab.label} />
               ))}
            </Tabs>
         </Box>

         {tabsConfig.map((tab, idx) => (
            <TabPanel key={idx} value={tabIndex} index={idx}>
               {tab.data.length > 0 ? (
                  <TableComponent data={tab.data} label={tab.label} rowsPerPageDefault={10} />
               ) : (
                  <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                     No se encontró información para {tab.label.toLowerCase()}
                  </Typography>
               )}
            </TabPanel>
         ))}
      </Paper>
   );
};

export default Catalogues;
