import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TabPanel from "../Common/TabPanel";
import ConsultsTable from "./ConsultsTable";
import ConsultForm from "./ConsultForm";

const Consults = () => {
   const [tabIndex, setTabIndex] = useState(0);

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
               <Tab label="Formulario de Consulta" />
               <Tab label="Consultas Enviadas" />
            </Tabs>
         </Box>

         <TabPanel value={tabIndex} index={0}>
            <ConsultForm />
         </TabPanel>
         <TabPanel value={tabIndex} index={1}>
            <ConsultsTable />
         </TabPanel>
      </Paper>
   );
};

export default Consults;
