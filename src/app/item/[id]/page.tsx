"use client";
import { getItem } from "@/app/api/items/route";
import { Item } from "@/interfaces";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

const ItemPage: NextPage<Props> = async ({ params }) => {
  const { name, price, quantity, image }: Item = await getItem(params.id);

  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography>{price}</Typography>
      <Typography>{quantity}</Typography>
      <Image src={image} alt={name} width={270} height={270} />
    </Box>
  );
};

export default ItemPage;
