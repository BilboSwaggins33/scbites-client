import React from "react";
import {
    Chip,
} from "@mui/material";


export function KeywordItem({ keyword, keywordActions }) {
  return (
      <Chip style={{margin: 5}} label={keyword.summary} onDelete={() => {
          keywordActions.deleteKeyword(keyword);
      }} />
  );
}
