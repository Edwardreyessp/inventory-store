import { deleteItem, getItemImage } from "@/app/database/firebase";
import { Item } from "@/interfaces";
import {
  Delete,
  Edit,
  MonetizationOn,
  Sell,
  Widgets,
} from "@mui/icons-material";
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
  update: boolean;
  setUpdate: (update: boolean) => void;
}

export const ShowItem: React.FC<DialogProps> = ({
  open,
  setOpen,
  item,
  update,
  setUpdate,
}) => {
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

  const handleDelete = async () => {
    await deleteItem(item.id);
    setUpdate(!update);
    setOpen(false);
  };

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
        <IconButton onClick={() => setOpen(false)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={handleDelete}>
          <Delete />
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
