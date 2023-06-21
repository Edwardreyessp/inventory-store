"use client";
import { loginEmail, loginGoogle } from "@/app/database/firebase";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Button,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const startIcon = (
    <Image src="/assets/icons/google.svg" alt="Google" width={24} height={24} />
  );

  const googleLogin = async () => {
    try {
      const uid: string = await loginGoogle();
      // localStorage.setItem("uid", uid);
      console.log(uid);
      location.href = "/";
    } catch (error) {
      console.log(error); // Manejar cualquier error que pueda ocurrir
    }
  };

  const emailLogin = async () => {
    try {
      const uid: string = await loginEmail(email, password);
      // localStorage.setItem("uid", uid);
      console.log(uid);
      location.href = "/";
    } catch (error) {
      console.log(error); // Manejar cualquier error que pueda ocurrir
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="h2">
        Inicia sesión en iStock
      </Typography>
      {error !== "" && <Typography color="error.main">{error}</Typography>}
      <Box display="flex" gap={1}>
        <Typography>¿Usuario nuevo?</Typography>
        <Link href="/auth/register" passHref style={{ textDecoration: "none" }}>
          <Typography color="secondary.main" sx={{ cursor: "pointer" }}>
            Crea una cuenta
          </Typography>
        </Link>
      </Box>
      <TextField
        label="Correo"
        placeholder="Correo..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        placeholder="Contraseña..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={emailLogin}>Iniciar sesión</Button>
      <Typography textAlign="end" maxWidth="352px">
        ¿Olvidaste tu contraseña?
      </Typography>
      <Divider>o</Divider>
      <Button startIcon={startIcon} onClick={googleLogin}>
        Inicia sesión con Google
      </Button>
    </Stack>
  );
};

export default LoginPage;
