import React from "react";
import {
    TextField,
    Button,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material";
import { withStyles } from "tss-react/mui";

const ListItemWithTwoSecondaryActions = withStyles(ListItem, {
    secondaryAction: {
        paddingRight: "120px",
    },
});


export function DraftKeywordItem({keyword, keywordActions, draftKeywordActions}) {

    return (
        <ListItemWithTwoSecondaryActions>
            <ListItemText>
                <TextField
                    style={{width: "100%"}}
                    placeholder="Enter a keyword..."
                    size="small"
                    value={keyword.summary}
                    onChange={(e) => {
                        draftKeywordActions.setDraftKeywordSummary(keyword, e.target.value);
                    }}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={async () => {
                        await keywordActions.saveKeyword(keyword);
                        draftKeywordActions.deleteDraftKeyword(keyword);
                        draftKeywordActions.createDraftKeyword();
                    }}
                >
                    Add
                </Button>

            </ListItemSecondaryAction>
        </ListItemWithTwoSecondaryActions>
    );
}
