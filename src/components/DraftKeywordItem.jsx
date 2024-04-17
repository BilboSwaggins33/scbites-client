import React from "react";
import {
    TextField,
    Button,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material";
import { withStyles } from "tss-react/mui";
import IconButton from '@mui/material/IconButton'
import { ArrowForward } from "@mui/icons-material";
import Icon from '@mui/material/Icon'
export function DraftKeywordItem({ keyword, keywordActions, draftKeywordActions }) {

    return (
        <div className='keyword-input-container'>
            <input
                className="keyword-input"
                placeholder="Enter keywords..."
                style={{ width: "100%" }}
                value={keyword.summary}
                onKeyDown={async (e) => {
                    if (e.key == 'Enter') {

                        await keywordActions.saveKeyword(keyword);
                        draftKeywordActions.deleteDraftKeyword(keyword);
                        draftKeywordActions.createDraftKeyword();
                    }

                }}
                onChange={(e) => {
                    draftKeywordActions.setDraftKeywordSummary(keyword, e.target.value);
                }}
            />
            <IconButton style={{ width: 52 }} onClick={async () => {

                await keywordActions.saveKeyword(keyword);
                draftKeywordActions.deleteDraftKeyword(keyword);
                draftKeywordActions.createDraftKeyword();

            }}>
                <ArrowForward />
            </IconButton>
        </div >



    );
}
