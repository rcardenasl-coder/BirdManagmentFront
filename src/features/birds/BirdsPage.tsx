import React, { useState } from "react";
import { BirdList } from "./components/BirdList";
import { BirdForm } from "./components/BirdForm";
import { BirdDto } from "../../models/bird";
import { Button } from "@mui/material";

export const BirdsPage: React.FC = () => {
  const [selectedBird, setSelectedBird] = useState<BirdDto | undefined>(
    undefined
  );
  const [openForm, setOpenForm] = useState(false);

  const handleEdit = (bird: BirdDto) => {
    setSelectedBird(bird); // Aseguramos que el ave seleccionada se pasa correctamente
    setOpenForm(true);
  };

  const handleCreate = () => {
    setSelectedBird(undefined);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setSelectedBird(undefined);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bird Registry</h1>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create New Bird
      </Button>
      <BirdList onEdit={handleEdit} />
      <BirdForm bird={selectedBird} open={openForm} onClose={handleClose} />
    </div>
  );
};
