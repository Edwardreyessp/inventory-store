import { Box, Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";

interface Props {
  background: string;
  color: string;
  children: React.ReactNode;
  text: string;
  number: string;
}

export const StatsCard: NextPage<Props> = ({
  background,
  color,
  children,
  text,
  number,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          width={64}
          height={64}
          borderRadius={50}
          display="flex"
          justifyContent="center"
          alignItems="center"
          color={color}
          mb={3}
          sx={{
            background: `radial-gradient(50% 50% at 50% 50%, ${color}00 0%, ${color}3D 100%)`,
          }}
        >
          {children}
        </Box>
        <Typography variant="h1" color={color}>
          {number}
        </Typography>
        <Typography fontWeight={600} sx={{ opacity: 0.72 }} color={color}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
