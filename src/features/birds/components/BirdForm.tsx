import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BirdDto } from "../../../models/bird";
import { birdApi } from "../../../api/birdApi";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(1, "Name cannot be empty"),
    type: yup
      .string()
      .required("Type is required")
      .min(1, "Type cannot be empty"),
    color: yup
      .string()
      .required("Color is required")
      .min(1, "Color cannot be empty"),
    dateCreate: yup
      .string()
      .required("Date is required")
      .test("not-future", "Date cannot be in the future", (value) => {
        return new Date(value) <= new Date();
      }),
    description: yup
      .string()
      .required("Description is required")
      .min(1, "Description cannot be empty"),
  })
  .required();

interface BirdFormProps {
  bird?: BirdDto; // Puede ser undefined si es creación
  open: boolean;
  onClose: () => void;
}

export const BirdForm: React.FC<BirdFormProps> = ({ bird, open, onClose }) => {
  const { control, handleSubmit, reset } = useForm<BirdDto>({
    resolver: yupResolver(schema),
    defaultValues: bird
      ? { ...bird } // Usamos los valores del ave si existe
      : {
          name: "",
          type: "",
          color: "",
          dateCreate: new Date().toISOString().split("T")[0],
          description: "",
        },
  });

  const mutationFn = bird?.birdCode
    ? (data: BirdDto) =>
        birdApi.updateBird(bird.birdCode!, { ...data, birdCode: bird.birdCode })
    : (data: Omit<BirdDto, "birdCode">) => birdApi.createBird(data);

  const { mutate, isPending, error } = useFormSubmit(mutationFn, ["birds"]);

  const onSubmit = (data: BirdDto) => {
    mutate(data, {
      onSuccess: () => {
        reset(); // Reseteamos el formulario al cerrar
        onClose();
      },
    });
  };

  // Reiniciamos el formulario cada vez que cambia el prop 'bird' o se abre el diálogo
  React.useEffect(() => {
    if (open) {
      reset(
        bird || {
          name: "",
          type: "",
          color: "",
          dateCreate: new Date().toISOString().split("T")[0],
          description: "",
        }
      );
    }
  }, [bird, open, reset]);

  const errorMessage =
    error && error instanceof AxiosError && error.response?.data?.message
      ? error.response.data.message
      : error?.message || "An unexpected error occurred";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{bird ? "Edit Bird" : "Create Bird"}</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Type"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Color"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="dateCreate"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Date Created"
                type="date"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <DialogActions>
            <Button onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {bird ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
