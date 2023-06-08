import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";

interface Props {
  items: { image: string; product: string; seller: string; time: string }[];
}

export const Record: NextPage<Props> = ({ items }) => {
  return (
    <Card>
      <CardContent sx={{ background: "#fff" }}>
        <Typography variant="h3" mb={4}>
          Últimas compras
        </Typography>
        <Stack spacing={2}>
          {items.map((item, index) => (
            <Box key={index} display="flex" gap={2} alignItems="center">
              <Image
                style={{ borderRadius: "9px" }}
                src={item.image}
                alt={item.product}
                width={48}
                height={48}
              />
              <Box flexGrow={1}>
                <Typography fontWeight={600}>{item.product}</Typography>
                <Typography color="#637381">{item.seller}</Typography>
              </Box>
              <Typography>{item.time}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
