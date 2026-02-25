import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ConsultsTable from "../components/Consults/ConsultsTable";
import AclarationsTable from "../components/Aclarations/AclarationsTable";
import ComplaintsTable from "../components/Complaints/ComplaintsTable";
import Catalogues from "../components/Catalogues";
import TabPanel from "../components/Common/TabPanel";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = ({ setToken }) => {
   const [value, setValue] = useState(0);

   const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const handleLogout = () => {
      localStorage.removeItem("AUTH_TOKEN_REUNE");
      setToken(null);
   };

   return (
      <Stack>
         <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 1, sm: 4 }, py: 1 }}
         >
            <Box sx={{ minWidth: { xs: 40, sm: 120 } }} />
            <Typography
               sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 18, sm: 24 },
                  color: "#305e58ff",
                  textAlign: "center",
                  flex: 1,
               }}
            >
               REUNE
            </Typography>
            <Button
               variant="contained"
               onClick={handleLogout}
               sx={{ bgcolor: "#305e58ff", minWidth: { xs: 40, sm: 120 }, px: { xs: 1, sm: 2 } }}
            >
               <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  Cerrar sesión
               </Box>
               <Box
                  component="span"
                  sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center", justifyContent: "center" }}
               >
                  <LogoutIcon />
               </Box>
            </Button>
         </Box>
         <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
            <Tabs
               value={value}
               onChange={handleChange}
               variant="scrollable"
               scrollButtons="auto"
               textColor="inherit"
               TabIndicatorProps={{ style: { backgroundColor: "#305e58ff" } }}
               sx={{ "& .MuiTab-root": { fontWeight: "bold", color: "#305e58ff" } }}
            >
               <Tab label="Consultas" />
               <Tab label="Aclaraciones" />
               <Tab label="Reclamaciones" />
               <Tab label="Catálogos" />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <ConsultsTable />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <AclarationsTable />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <ComplaintsTable />
         </TabPanel>
         <TabPanel value={value} index={3}>
            <Catalogues />
         </TabPanel>
      </Stack>
   );
};

export default Dashboard;
