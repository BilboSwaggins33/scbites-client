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
    const { loading, keywords, tags, toggleVal, saveToggle, unsubscribe, subscribed, ...keywordActions } = useData();
    const { draftKeywords, ...draftKeywordActions } = useDraftKeyword();
    const showLoader = useShowLoader(loading, 500);

    return (
        <div className="main-container">
            {loading ? (
                showLoader ? (
                    <LinearProgress />
                ) : null
            ) : (
                <div className="main" style={{ height: '100%', background: 'white'}}>
                    <div className="sub-container">

                        <div className="keyword-items-container">
                            <div style={{ margin: 0 }}>
                                <Typography color="#888" component="p" variant="h4">
                                    What's your favorite dish?
                                </Typography>
                            </div>

                            <div style={{ width: "100%" }}>
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

                            </div>
                        </div>

                    </div>

                    <div className="footer">
                        <FormControlLabel style={{ marginLeft: 5 }} control={<Checkbox />} label="Enable emails." checked={subscribed()} onChange={unsubscribe} sx={{ color: '#666', '.MuiFormControlLabel-label': { fontSize: 'max(15px, 1vw)', lineHeight: 'max(13px, 1vw)' } }} />
                        <div className="siteDesc">
                            <Typography color="#888" sx={{ minWidth: '150px', fontSize: 'max(10px, 1vw)' }} variant="subtitle2">
                                <b>How does this site work?</b> Simply enter your favorite foods (for example, salmon!), and you will get a daily email notifying you if your favorite food has made an appearance at a dining hall!
                            </Typography>
                        </div>
                        <div></div>
                    </div>
                </div>
            )
            }
        </div >

    );
}
