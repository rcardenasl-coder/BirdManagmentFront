import React from "react";
import { CircularProgress } from "@mui/material";

export const LoadingSpinner: React.FC = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
    <CircularProgress />
  </div>
);
