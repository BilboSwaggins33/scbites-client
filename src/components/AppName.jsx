import React from "react";
import { Typography } from "@mui/material";

export const API_TYPE_NAME = "USC Bites"

export function AppName() {
  return (
    <Typography className="app-bar-title" component="h1" variant="h5">
      {API_TYPE_NAME}
    </Typography>
  );
}
