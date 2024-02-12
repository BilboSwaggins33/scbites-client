import React from "react";
import { useApp } from "../components/RealmApp";


export function useCollection({ cluster = "mongodb-atlas", db, collection }) {
  const app = useApp();
  return React.useMemo( () => {
    const mdb = app.currentUser.mongoClient(cluster);
    return mdb.db(db).collection(collection);
  }, [app.currentUser, cluster, db, collection]);
}
