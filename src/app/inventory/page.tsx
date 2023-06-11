"use client";
import { Item } from "@/components/cart";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const InventoryPage = () => {
  const items = [
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
    {
      name: "Nike Air Force 1 NDESTRUKT",
      price: "$303.99",
      quantity: "40",
      image: "/assets/images/bgcard.png",
    },
  ];

  return (
    <Box>
      <Box display="flex" gap={2} mb={5}>
        <Typography variant="h1" component="h1">
          Inventario
        </Typography>
        <Button color="secondary" endIcon={<Add />}>
          Agregar
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {items.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
          />
        ))}
      </Box>
    </Box>
  );
};

export default InventoryPage;
