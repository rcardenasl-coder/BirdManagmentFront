import React from "react";
import { useBirds } from "../hooks/useBirds";
import { BirdDto } from "../../../models/bird";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { birdApi } from "../../../api/birdApi";
import { useFormSubmit } from "../../../hooks/useFormSubmit";

interface BirdListProps {
  onEdit: (bird: BirdDto) => void;
}

export const BirdList: React.FC<BirdListProps> = ({ onEdit }) => {
  const { data: birds, isLoading, error } = useBirds();
  const deleteMutation = useFormSubmit(
    (id: number) => birdApi.deleteBird(id),
    ["birds"]
  );

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this bird?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Color</TableCell>
          <TableCell>Date Created</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {birds?.map((bird) => (
          <TableRow key={bird.birdCode}>
            <TableCell>{bird.birdCode}</TableCell>
            <TableCell>{bird.name}</TableCell>
            <TableCell>{bird.type}</TableCell>
            <TableCell>{bird.color}</TableCell>
            <TableCell>{bird.dateCreate}</TableCell>
            <TableCell>{bird.description}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(bird)}>Edit</Button>
              <Button
                onClick={() => handleDelete(bird.birdCode!)}
                color="error"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
