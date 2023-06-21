"use client";
import { loginGoogle, registerEmail } from "@/app/database/firebase";
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

const RegisterPage = () => {
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
      localStorage.setItem("uid", uid);
      console.log(uid);
      location.href = "/";
    } catch (error) {
      console.log(error); // Manejar cualquier error que pueda ocurrir
    }
  };

  const emailLogin = async () => {
    try {
      const uid: string = await registerEmail(email, password);
      // localStorage.setItem("uid", uid);
      console.log(uid);
      location.href = "/";
    } catch (error) {
      console.log(error); // Manejar cualquier error que pueda ocurrir
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="h2">
        Comienza la aventura
      </Typography>
      {error !== "" && <Typography color="error.main">{error}</Typography>}
      <Box display="flex" gap={1}>
        <Typography>¿Ya tienes una cuenta?</Typography>
        <Link href="/auth/login" passHref style={{ textDecoration: "none" }}>
          <Typography color="secondary.main" sx={{ cursor: "pointer" }}>
            Ingresa aquí
          </Typography>
        </Link>
      </Box>
      <TextField label="Nombre" placeholder="Nombre..." />
      <TextField
        label="Correo"
        placeholder="Correo..."
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        label="Contraseña"
        placeholder="Contraseña..."
        onChange={(e) => setPassword(e.target.value)}
        value={password}
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
      <Button onClick={emailLogin}>Registrarse</Button>
      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        maxWidth="352px"
      >
        Al registrarte, aceptas nuestras Condiciones de uso y Política de
        privacidad.
      </Typography>
      <Divider>o</Divider>
      <Button startIcon={startIcon} onClick={googleLogin}>
        Registrarse con Google
      </Button>
    </Stack>
  );
};

export default RegisterPage;
