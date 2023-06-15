import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  PaperProps,
  Paper,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { FC, useState } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import { createItem, uploadImage } from "../../app/database/firebase";
import { Item } from "@/interfaces";
import { uuid } from "uuidv4";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
}

export const CreateItem: FC<DialogProps> = ({
  open,
  setOpen,
  update,
  setUpdate,
}) => {
  const [image, setImage] = useState<File>();
  const [item, setItem] = useState<Item>({
    id: uuid(),
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    sales: "0",
    image: "",
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpg": [".jpg"] },
    onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
  });

  const onClose = () => {
    setOpen(false);
    setImage(undefined);
    setItem({
      id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      sales: "",
      image: "",
    });
  };

  const handleCreate = async () => {
    if (image) {
      const path = await createItem(item, image);
      setItem({ ...item, image: path });
      setUpdate(!update);
      onClose();
    }
  };

  const handleChanges = (e: any) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Agregar producto
      </DialogTitle>
      <DialogContent>
        <Stack alignItems="center" spacing={1}>
          <TextField
            margin="dense"
            name="name"
            label="Nombre del producto"
            value={item.name}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="description"
            value={item.description}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            type="number"
            label="Precio"
            name="price"
            value={item.price}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            type="number"
            label="Cantidad"
            name="quantity"
            value={item.quantity}
            onChange={handleChanges}
          />
          <TextField
            margin="dense"
            label="Categoría"
            name="category"
            value={item.category}
            onChange={handleChanges}
          />
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button color="secondary" fullWidth>
              Agregar imagen
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
        <Button autoFocus onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleCreate}>Agregar</Button>
      </DialogActions>
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
