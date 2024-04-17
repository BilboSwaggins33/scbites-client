import React from "react";
import {
    Chip,
} from "@mui/material";


export function KeywordItem({ keyword, keywordActions }) {
    return (
        <Chip style={{ margin: 5, padding: 10 }} label={keyword.summary} onDelete={() => {
            keywordActions.deleteKeyword(keyword);
        }} />
    );
}
