import {
  deleteItem,
  getItemImage,
  updateItem,
} from "@/app/istock/database/firebase";
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
  TextField,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import { uuid } from "uuidv4";

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
  const [image, setImage] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      {isEditing ? (
        <ItemEdit
          item={item}
          setIsEditing={setIsEditing}
          setUpdate={setUpdate}
          setOpen={setOpen}
          update={update}
        />
      ) : (
        <ItemStatus
          item={item}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
          image={image}
        />
      )}
    </Dialog>
  );
};

interface StatusProps {
  item: Item;
  setIsEditing: (isEditing: boolean) => void;
  handleDelete: () => void;
  image: string;
}

const ItemStatus: React.FC<StatusProps> = ({
  item,
  setIsEditing,
  handleDelete,
  image,
}) => {
  const { name, description, price, quantity, category, sales } = item;

  return (
    <>
      <DialogTitle
        style={{ cursor: "move", display: "flex", alignItems: "center" }}
        id="draggable-dialog-title"
      >
        <Typography variant="body2" flexGrow={1}>
          {name}
        </Typography>
        <IconButton onClick={() => setIsEditing(true)}>
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
    </>
  );
};

interface EditProps {
  item: Item;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const ItemEdit: React.FC<EditProps> = ({
  item,
  setOpen,
  update,
  setUpdate,
  setIsEditing,
}) => {
  const [image, setImage] = useState<File>();
  const [editedItem, setEditedItem] = useState<Item>(item);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpg": [".jpg"] },
    onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
  });

  const handleChanges = (e: any) => {
    setEditedItem({
      ...editedItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    await updateItem(editedItem, image);
    setOpen(false);
    setUpdate(!update);
    setIsEditing(false);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  return (
    <>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Editar producto
      </DialogTitle>
      <DialogContent>
        <Stack alignItems="center" spacing={1}>
          <TextField
            margin="dense"
            name="name"
            label="Nombre del producto"
            value={editedItem.name}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="description"
            value={editedItem.description}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            type="number"
            label="Precio"
            name="price"
            value={editedItem.price}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            type="number"
            label="Cantidad"
            name="quantity"
            value={editedItem.quantity}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            label="Categoría"
            name="category"
            value={editedItem.category}
            onChange={handleChanges}
          />
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button color="secondary" fullWidth>
              Cambiar imagen
            </Button>
          </div>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Imagen"
              width={200}
              height={200}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleUpdate}>Guardar</Button>
      </DialogActions>
    </>
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
