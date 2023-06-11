"use client";
import { Navbar, Record, StatsCard } from "@/components/ui";
import { Shop2TwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const HomePage = () => {
  const statsCards = [
    {
      number: "104k",
      text: "Ventas semanales",
      color: "#103996",
      background: "#D1E9FC",
      icon: <Shop2TwoTone />,
    },
    {
      number: "150",
      text: "Clientes nuevos",
      color: "#0C53B7",
      background: "#D0F2FF",
      icon: <Shop2TwoTone />,
    },
    {
      number: "10",
      text: "Ordenes pendientes",
      color: "#7A4F01",
      background: "#FFF7CD",
      icon: <Shop2TwoTone />,
    },
    {
      number: "0",
      text: "Ordenes canceladas",
      color: "#7A0C2E",
      background: "#FFE7D9",
      icon: <Shop2TwoTone />,
    },
  ];

  const items = [
    {
      image: "/assets/images/bgcard.png",
      product: "Chamarra genérica xs",
      seller: "Edward Reyes",
      time: "hace 8 horas",
    },
    {
      image: "/assets/images/bgcard.png",
      product: "Chamarra genérica xs",
      seller: "Edward Reyes",
      time: "hace 8 horas",
    },
    {
      image: "/assets/images/bgcard.png",
      product: "Chamarra genérica xs",
      seller: "Edward Reyes",
      time: "hace 8 horas",
    },
  ];

  return (
    <>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={8}>
          <Card sx={{ display: "flex", background: "#DBF8E5" }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack spacing={2} justifyContent="center" height="100%">
                <Typography variant="h2" color="text.secondary">
                  ¡Bienvenido de nuevo a iStock!
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Recuerda ver tu progreso de ventas y actualizar tu inventario
                  constantemente.
                </Typography>
                <Box>
                  <Button color="secondary">Actualizar</Button>
                </Box>
              </Stack>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 400 }}
              image="/assets/images/login.png"
              alt="Hero"
            />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              display: "flex",
              background: "url('/assets/images/bgcard.png') center/cover",
              height: "100%",
            }}
          >
            <CardContent>
              <Stack spacing={1} justifyContent="end" height="100%">
                <Typography
                  color="primary.contrastText"
                  variant="overline"
                  sx={{ opacity: 0.48 }}
                >
                  MEJOR PRODUCTO
                </Typography>
                <Typography color="primary.contrastText" variant="h3">
                  Nombre del producto más vendido
                </Typography>
                <Typography color="primary.contrastText">
                  +50 ventas este mes
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={4}>
        {statsCards.map((card, index) => (
          <Grid key={index} item xs={3}>
            <StatsCard
              background={card.background}
              number={card.number}
              text={card.text}
              color={card.color}
            >
              {card.icon}
            </StatsCard>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Record items={items} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
