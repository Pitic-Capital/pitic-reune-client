import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TabPanel from "../Common/TabPanel";
import ComplaintsTable from "./ComplaintsTable";
import ComplaintForm from "./ComplaintForm";

const Complaints = () => {
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
               <Tab label="Formulario de Reclamación" />
               <Tab label="Reclamaciones Enviadas" />
            </Tabs>
         </Box>

         <TabPanel value={tabIndex} index={0}>
            <ComplaintForm />
         </TabPanel>
         <TabPanel value={tabIndex} index={1}>
            <ComplaintsTable />
         </TabPanel>
      </Paper>
   );
};

export default Complaints;
