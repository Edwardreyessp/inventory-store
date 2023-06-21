import { Item } from "@/interfaces";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ShowItem } from "../ui";
import { getItemImage } from "../../app/istock/database/firebase";

export interface ItemProps {
  item: Item;
  update: boolean;
  setUpdate: (open: boolean) => void;
}

export const ItemCard: NextPage<ItemProps> = ({ item, update, setUpdate }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      const response = await getItemImage(item.image);
      setImage(response);
      setLoading(false);
    };
    getImage();
  }, [item]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card sx={{ height: 360, width: 270 }}>
        <CardActionArea onClick={() => setOpen(!open)}>
          <CardMedia sx={{ height: 270 }} image={image} title={item.name} />
          <CardContent>
            <Stack spacing={2} justifyContent="center">
              <Typography fontWeight={600}>{item.name}</Typography>
              <Box display="flex">
                <Typography variant="caption" flexGrow={1}>
                  {item.quantity}
                </Typography>
                <Typography>{item.price}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <ShowItem
        open={open}
        setOpen={setOpen}
        item={item}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
};
