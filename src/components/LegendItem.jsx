import React from "react";
import {
    FormControlLabel, Switch,
} from "@mui/material";

import { LegendConstants } from "../constants/legend";
export function LegendItem({tag, toggleVal, saveToggle}) {

    const handleChange = (event) => {
        saveToggle(tag, event.target.checked);
    };
    return (
        <div>
            <FormControlLabel control={<Switch />} label={LegendConstants[tag]} checked={toggleVal(tag)} onChange={handleChange} />
        </div>
    );
}
