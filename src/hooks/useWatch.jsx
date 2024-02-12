import React from "react";

const noop = () => {};
const defaultChangeHandlers = {
  onInsert: noop,
  onUpdate: noop,
  onReplace: noop,
  onDelete: noop,
};


export function useWatch(collection, changeHandlers) {
  const filter = React.useMemo(() => ({}), []);
  const handlers = { ...defaultChangeHandlers, ...changeHandlers };


  const handlersRef = React.useRef(handlers);
  React.useEffect(() => {
    handlersRef.current = {
      onInsert: handlers.onInsert,
      onUpdate: handlers.onUpdate,
      onReplace: handlers.onReplace,
      onDelete: handlers.onDelete,
    };
  }, [
    handlers.onInsert,
    handlers.onUpdate,
    handlers.onReplace,
    handlers.onDelete,
  ]);
  // Set up a MongoDB change stream that calls the provided change handler callbacks.
  React.useEffect(() => {
    let stream;
    const watchKeywords = async () => {
      stream = collection.watch({ filter });
      for await (const change of stream) {
        switch (change.operationType) {
          case "insert": {
            handlersRef.current.onInsert(change);
            break;
          }
          case "update": {
            handlersRef.current.onUpdate(change);
            break;
          }
          case "replace": {
            handlersRef.current.onReplace(change);
            break;
          }
          case "delete": {
            handlersRef.current.onDelete(change);
            break;
          }
          default: {
            // change.operationType will always be one of the specified cases
            throw new Error(
              `Invalid change operation type: ${change.operationType}`
            );
          }
        }
      }
    };
    watchKeywords().catch((err) => console.log(err));
    return () => {
      // Close the change stream in the effect cleanup
      stream?.return()
    }
  }, [collection, filter]);
}
