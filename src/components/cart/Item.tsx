import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";

export interface ItemProps {
  name: string;
  price: string;
  quantity: string;
  image: string;
}

export const Item: NextPage<ItemProps> = ({ name, price, quantity, image }) => {
  return (
    <Card sx={{ height: 360, width: 270 }}>
      <CardMedia sx={{ height: 270 }} image={image} title={name} />
      <CardContent>
        <Stack spacing={2} justifyContent="center">
          <Typography fontWeight={600}>{name}</Typography>
          <Box display="flex">
            <Typography variant="caption" flexGrow={1}>
              {quantity}
            </Typography>
            <Typography>{price}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
