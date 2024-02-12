import React from "react";
import { createObjectId } from "../utils";

export function useDraftKeyword() {
  const [drafts, setDrafts] = React.useState([{  _id: createObjectId(),
    summary: "",
   }]);

  const createDraftKeyword = () => {
    const draftKeyword = {
      _id: createObjectId(),
      summary: "",
    };
    setDrafts((d) => [...d, draftKeyword]);
  };


  const setDraftKeywordSummary = (draft, summary) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [
        ...oldDrafts.slice(0, idx),
        { ...oldDrafts[idx], summary },
        ...oldDrafts.slice(idx + 1),
      ];
    });
  };

  const deleteDraftKeyword = (draft) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [...oldDrafts.slice(0, idx), ...oldDrafts.slice(idx + 1)];
    });
  };

  return {
    draftKeywords: drafts,
    createDraftKeyword: createDraftKeyword,
    setDraftKeywordSummary: setDraftKeywordSummary,
    deleteDraftKeyword: deleteDraftKeyword,
  };
}
