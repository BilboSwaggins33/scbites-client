import React from "react";
import * as Realm from "realm-web";

const baseUrl = "https://realm.mongodb.com";

function createApp(id) {
  return new Realm.App({ id, baseUrl });
}

const AppContext = React.createContext(null);

export function AppProvider({ appId, children }) {
  const [app, setApp] = React.useState(createApp(appId));

  React.useEffect(() => {
    setApp(createApp(appId));
  }, [appId]);
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);

  const logIn = React.useCallback(
    async (credentials) => {
      await app.logIn(credentials);
      setCurrentUser(app.currentUser);
    },
    [app]
  );
  const logOut = React.useCallback(async () => {
    try {
      const user = app.currentUser;
      await user?.logOut();
      await app.removeUser(user);
    } catch (err) {
      console.error(err);
    }
    // There will only be one logged in user at a time, so
    // the new current user will be null.
    setCurrentUser(app.currentUser);
  }, [app]);

  const deleteAccount = React.useCallback(async () => {
    try {
      const user = app.currentUser;
      const mdb = app.currentUser.mongoClient('mongodb-atlas');
      const userCollection = mdb.db("data").collection("Users");
      await userCollection.deleteOne({ "owner_id": user.id })
      await app.deleteUser(user);
      console.log("deleting")
    } catch (err) {
      console.log(err)
    }
    setCurrentUser(app.currentUser)
  }, [app])

  const appContext = React.useMemo(() => {
    return { ...app, currentUser, logIn, logOut, deleteAccount };
  }, [app, currentUser, logIn, logOut, deleteAccount]);

  return (
    <AppContext.Provider value={appContext}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const app = React.useContext(AppContext);
  if (!app) {
    throw new Error(
      `No App Services App found.`
    );
  }
  return app;
}
