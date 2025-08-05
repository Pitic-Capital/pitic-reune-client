import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../const/api_urls";

const Login = ({ setToken }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const iniciarSesion = async () => {
      setError("");
      setSuccess("");

      const url = API_URL?.replace(/\/+$/, "") + "/auth/users/token/";
      const credentials = { username, password };

      try {
         const response = await axios.post(url, credentials, {
            headers: { "Content-Type": "application/json" },
         });

         const token = response.data.user?.token_access;
         if (!token) throw new Error("Token no encontrado en la respuesta");

         localStorage.setItem("AUTH_TOKEN", token);
         setToken(token);
         setSuccess("Inicio de sesión exitoso ✅");
      } catch (err) {
         setError("Error al consultar quejas: " + err?.response?.data?.message || err.message);
      }
   };

   return (
      <Box
         sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
         }}
      >
         <Typography textAlign="center" sx={{ fontWeight: "bold", fontSize: 24, color: "#305e58ff" }}>
            REUNE
         </Typography>
         <Typography variant="h5" textAlign="center">
            Iniciar Sesión
         </Typography>

         <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         {error && <Alert severity="error">{error}</Alert>}
         {success && <Alert severity="success">{success}</Alert>}

         <Button variant="contained" fullWidth onClick={iniciarSesion} sx={{ bgcolor: "#305e58ff" }}>
            Iniciar sesión
         </Button>
      </Box>
   );
};

export default Login;
