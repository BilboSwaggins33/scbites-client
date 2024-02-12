import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";
import {
    addValueAtIndex,
    replaceValueAtIndex,
    updateValueAtIndex,
    removeValueAtIndex,
    getKeywordIndex, updateTag,
} from "../utils";
import { LegendConstants } from "../constants/legend"

const {dataSourceName} = atlasConfig;

export function useData() {

    const app = useApp();
    const [userData, setUserData] = React.useState([]);
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true);
    const [tagData, setTagData] = React.useState(Object.keys(LegendConstants).reduce(function (acc, cur, i) {
        return {...acc, [cur]: false};
    }, {}))
    // Get a client object for the todo item collection
    const dbCollection = useCollection({
        cluster: dataSourceName,
        db: "data",
        collection: "Keywords",
    });

    const tagCollection = useCollection({cluster: dataSourceName, db: "data", collection: "Users"})

    // Fetch all todos on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        let shouldUpdate = true;
        const fetchUser = dbCollection.find({owner_id: app.currentUser.id})
        const fetchTags = tagCollection.findOne({owner_id: app.currentUser.id})


        if (shouldUpdate) {
            fetchUser.then((data) => {
                setUserData(data);
                fetchTags.then((data) => {
                    setTagData(data.tags)
                    setUser(data)
                    setLoading(false);
                })
            })

        }


        return () => {
            shouldUpdate = false;
        }

    }, [dbCollection, tagCollection]);

    useWatch(tagCollection, {
        onInsert: (change) => {
           setTagData((oldData) => {
               console.log(oldData, change.fullDocument)
           })
        },
        onUpdate: (change) => {
            setTagData((oldData) => {
                if (loading) {
                    return oldData;
                }
                return updateTag(change.fullDocument);
            });
            setUser((oldData) => {
                if (loading) {
                    return oldData;
                }
                return change.fullDocument;
            });
        },
        onReplace: (change) => {
            setTagData((oldData) => {
                if (loading) {
                    return oldData;
                }
                return updateTag(change.fullDocument);
            });
            setUser((oldData) => {
                if (loading) {
                    return oldData;
                }
                return change.fullDocument;
            });
         },
         onDelete: (change) => {
             setTagData((oldData) => {
                 if (loading) {
                     return oldData;
                 }
                 return Object.keys(LegendConstants).reduce(function (acc, cur, i) {
                     return {...acc, [cur]: false};
                 }, {});
             });
             setUser((oldData) => {
                 if (loading) {
                     return oldData;
                 }
                 return {};
             });
         }
    })

    // Use a MongoDB change stream to reactively update state when operations succeed
    useWatch(dbCollection, {
        onInsert: (change) => {
            setUserData((oldData) => {
                if (loading) {
                    return oldData;
                }
                const idx =
                    getKeywordIndex(oldData, change.fullDocument) ?? oldData.length;
                if (idx === oldData.length) {
                    return addValueAtIndex(oldData, idx, change.fullDocument);
                } else {
                    return oldData;
                }
            });
        },
        onUpdate: (change) => {
            setUserData((oldData) => {
                if (loading) {
                    return oldData;
                }
                const idx = getKeywordIndex(oldData, change.fullDocument);
                return updateValueAtIndex(oldData, idx, () => {
                    return change.fullDocument;
                });
            });
        },
        onReplace: (change) => {
            setUserData((oldData) => {
                if (loading) {
                    return oldData;
                }
                const idx = getKeywordIndex(oldData, change.fullDocument);
                return replaceValueAtIndex(oldData, idx, change.fullDocument);
            });
        },
        onDelete: (change) => {
            setUserData((oldData) => {
                if (loading) {
                    return oldData;
                }
                return [];
            });
        },
    });

    const saveKeyword = async (draftKeyword) => {
        if (draftKeyword.summary) {
            draftKeyword.owner_id = app.currentUser.id;
            try {
                await dbCollection.insertOne(draftKeyword);
            } catch (err) {
                if (err.error.match(/^Duplicate key error/)) {
                    console.warn(
                        `Duplicate keyword`
                    );
                }
                console.error(err);
            }
        }
    };

    const toggleVal = (id) => {
        return tagData[id];
    }

    const saveToggle = async (id, val) => {
        try {
            //setTagData({...tagData, [id]: val})
            let item = `tags.${id}`
            await tagCollection.findOneAndUpdate({owner_id: app.currentUser.id}, {$set: { [item]: val }})
            // console.log(u)
        } catch (err) {
            console.log(err)
        }
    }
    const unsubscribe = async() => {
        try {
            let oldVal = user.isActive;
            await tagCollection.findOneAndUpdate({owner_id: app.currentUser.id}, {$set: {isActive: !oldVal}})
        } catch(err) {
            console.log(err)
        }
    }

    const subscribed = () => {
        return user.isActive;
    }


    const deleteKeyword = async (keyword) => {
        await dbCollection.deleteOne({_id: keyword._id});
    };

    return {
        loading,
        keywords: userData,
        tags: tagData,
        toggleVal: toggleVal,
        saveToggle: saveToggle,
        unsubscribe: unsubscribe,
        subscribed: subscribed,
        saveKeyword: saveKeyword,
        deleteKeyword: deleteKeyword,
    };
}
