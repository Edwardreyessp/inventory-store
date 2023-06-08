"use client";
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

  const startIcon = (
    <Image src="/assets/icons/google.svg" alt="Google" width={24} height={24} />
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="h2">
        Inicia sesión en iStock
      </Typography>
      <Box display="flex" gap={1}>
        <Typography>¿Usuario nuevo?</Typography>
        <Link href="/auth/register" passHref style={{ textDecoration: "none" }}>
          <Typography color="secondary.main" sx={{ cursor: "pointer" }}>
            Crea una cuenta
          </Typography>
        </Link>
      </Box>
      <TextField label="Correo" placeholder="Correo..." />
      <TextField
        label="Contraseña"
        placeholder="Contraseña..."
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
      <Button>Iniciar sesión</Button>
      <Typography textAlign="end" maxWidth="352px">
        ¿Olvidaste tu contraseña?
      </Typography>
      <Divider>o</Divider>
      <Button startIcon={startIcon}>Inicia sesión con Google</Button>
    </Stack>
  );
};

export default LoginPage;
