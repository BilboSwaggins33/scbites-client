import React from "react";
import {
    Typography,
    List,
    LinearProgress, FormControlLabel, Checkbox,
} from "@mui/material";
import { useData } from "../hooks/useData";
import { KeywordItem } from "./KeywordItem";
import { useDraftKeyword } from "../hooks/useDraftKeyword";
import { DraftKeywordItem } from "./DraftKeywordItem";
import { useShowLoader } from "../hooks/util-hooks";
import { getKeywordId } from "../utils";
import { LegendItem } from "./LegendItem";

export function HomePage() {
    const {loading, keywords, tags, toggleVal, saveToggle, unsubscribe, subscribed, ...keywordActions} = useData();
    const {draftKeywords, ...draftKeywordActions} = useDraftKeyword();
    const showLoader = useShowLoader(loading, 500);

    return (
        <div className="main-container">
            {loading ? (
                showLoader ? (
                    <LinearProgress/>
                ) : null
            ) : (
                <div className="sub-container">
                    <div className="keyword-items-container">
                        <Typography component="p" variant="h5">
                            {`${keywords.length} Keyword${
                                keywords.length === 1 ? "" : "s"
                            }`}
                        </Typography>
                        <List style={{width: "100%"}}>
                            {draftKeywords.map((draft) => (
                                <DraftKeywordItem
                                    key={getKeywordId(draft)}
                                    keyword={draft}
                                    keywordActions={keywordActions}
                                    draftKeywordActions={draftKeywordActions}
                                />
                            ))}
                            {keywords.map((keyword) => (
                                <KeywordItem
                                    key={getKeywordId(keyword)}
                                    keyword={keyword}
                                    keywordActions={keywordActions}
                                />
                            ))}

                        </List>
                    </div>
                    <div className="legend-items-container">
                        <div className="legend-items-container">
                            <FormControlLabel control={<Checkbox/>} label="Subscribe to the email notification service."
                                              checked={subscribed()} onChange={unsubscribe}/>
                        </div>
                        <div style={{marginTop: 20}}>
                            {Object.keys(tags).map((tag, idx) => (
                                <LegendItem
                                    key={idx}
                                    tag={tag}
                                    toggleVal={toggleVal}
                                    saveToggle={saveToggle}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </div>

    );
}
