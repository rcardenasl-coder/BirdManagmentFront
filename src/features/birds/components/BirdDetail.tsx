import React from "react";
import { useBirdById } from "../hooks/useBirds";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Typography } from "@mui/material";

interface BirdDetailProps {
  birdId: number;
}

export const BirdDetail: React.FC<BirdDetailProps> = ({ birdId }) => {
  const { data: bird, isLoading, error } = useBirdById(birdId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Typography variant="h5">Bird Details</Typography>
      <Typography>
        <strong>ID:</strong> {bird?.birdCode}
      </Typography>
      <Typography>
        <strong>Name:</strong> {bird?.name}
      </Typography>
      <Typography>
        <strong>Type:</strong> {bird?.type}
      </Typography>
      <Typography>
        <strong>Color:</strong> {bird?.color}
      </Typography>
      <Typography>
        <strong>Date Created:</strong> {bird?.dateCreate}
      </Typography>
      <Typography>
        <strong>Description:</strong> {bird?.description}
      </Typography>
    </div>
  );
};
