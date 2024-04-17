import React from "react";
import { Typography } from "@mui/material";

export const API_TYPE_NAME = "SC Bites"

export function AppName() {
  return (
    <Typography className="app-bar-title" variant="h5" fontWeight={600}>
      {API_TYPE_NAME}
    </Typography>
  );
}
