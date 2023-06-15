import { getItemImage } from "@/app/database/firebase";
import { Item } from "@/interfaces";
import { Edit, MonetizationOn, Sell, Widgets } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CardMedia,
  Typography,
  DialogActions,
  Button,
  PaperProps,
  Paper,
  Card,
  Box,
  CardContent,
  IconButton,
} from "@mui/material";
import { use, useEffect, useState } from "react";
import Draggable from "react-draggable";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: Item;
}

export const ShowItem: React.FC<DialogProps> = ({ open, setOpen, item }) => {
  const { name, description, price, quantity, category, sales } = item;
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

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{ cursor: "move", display: "flex", alignItems: "center" }}
        id="draggable-dialog-title"
      >
        <Typography variant="body2" flexGrow={1}>
          {name}
        </Typography>
        <IconButton autoFocus onClick={() => setOpen(false)}>
          <Edit />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CardMedia
          sx={{ height: 270, width: 270 }}
          image={image}
          title={name}
        />
        <Typography>{description}</Typography>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
            <MonetizationOn />
            <Typography fontWeight={600}>{price}</Typography>
          </Box>
          <Paper elevation={0} sx={{ background: "#00AB55", p: 1 }}>
            <Typography color="#fff">{category}</Typography>
          </Paper>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Widgets />
          <Typography>Inventario: {quantity}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Sell />
          <Typography>Ventas: {sales}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
