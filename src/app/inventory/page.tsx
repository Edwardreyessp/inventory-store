"use client";
import { ItemCard } from "@/components/cart";
import { CreateItem } from "@/components/ui";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../interfaces/item";
import { getItems } from "../database/firebase";

const InventoryPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await getItems();
      console.log(items);
      setData(items);
      setLoading(false);
    };
    fetchData();
  }, [open]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box display="flex" gap={2} mb={5}>
        <Typography variant="h1" component="h1">
          Inventario
        </Typography>
        <Button
          color="secondary"
          endIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Agregar
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {Object.values(data).map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </Box>
      <CreateItem open={open} setOpen={setOpen} />
    </Box>
  );
};

export default InventoryPage;
