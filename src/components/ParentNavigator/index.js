//Dependencies
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import * as Network from "expo-network";
import {
    currentShiftDate,
    currentTime,
    currentShift,
    currentDay,
} from "../../functions/globalFuntions";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Componenets
import HomeNavigator from "../HomeNavigator";
import { useUser } from "@realm/react";
import { FirstLevelContext } from "../../context/FirstLevelContext";

import QrScannerPage from "../QrScannerPage";

const ParentNavigator = () => {
    const user = useUser();
    const dbConnection = user.mongoClient("mongodb-atlas");
    const sessionInstance = dbConnection.db("taskAppDb").collection("Session");
    const [sessionObject, setSessionObject] = useState(null);
    const [updateState, setUpdateState] = useState(false);

    const date = currentShiftDate();
    const time = currentTime();
    const shift = currentShift();
    currentDay;

    useEffect(() => {
        const checkNet = async () => {
            const res = await Network.getNetworkStateAsync();
            const keys = await AsyncStorage.getAllKeys();

            if (res.isInternetReachable) {
                if (keys.length === 0) {
                    const dbDocument = await sessionInstance.findOne();
                    const stringifyDoc = JSON.stringify(dbDocument);
                    await AsyncStorage.setItem("session", stringifyDoc);
                    const storageObject = await AsyncStorage.getItem("session");
                    setSessionObject(JSON.parse(storageObject));
                } else if (keys.length !== 0) {
                    if (sessionObject) {
                        const stringifySessionObject =
                            JSON.stringify(sessionObject);
                        await AsyncStorage.setItem(
                            "session",
                            stringifySessionObject
                        );
                        const storageObject = await AsyncStorage.getItem(
                            "session"
                        );
                        await sessionInstance.deleteOne();
                        await sessionInstance.insertOne(
                            JSON.parse(storageObject)
                        );
                        const dbDocument = await sessionInstance.findOne();
                        setSessionObject(dbDocument);
                    } else {
                        const dbDocument = await sessionInstance.findOne();
                        setSessionObject(dbDocument);
                    }
                }
            } else {
                if (sessionObject) {
                    const stringifySessionObject =
                        JSON.stringify(sessionObject);
                    await AsyncStorage.setItem(
                        "session",
                        stringifySessionObject
                    );
                    const storageObject = await AsyncStorage.getItem("session");
                    setSessionObject(JSON.parse(storageObject));
                } else {
                    const storageObject = await AsyncStorage.getItem("session");
                    setSessionObject(JSON.parse(storageObject));
                }
            }
        };
        checkNet();
    }, [updateState]);

    const Stack = createNativeStackNavigator();
    
    if (sessionObject) {
        return (
            <FirstLevelContext.Provider
                value={{
                    sessionObject,
                    setSessionObject,
                    setUpdateState,
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: "#27632a",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                        }}
                    >
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="HomeNavigator"
                            component={HomeNavigator}
                        />

                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="QrScannerPage"
                            component={QrScannerPage}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </FirstLevelContext.Provider>
        );
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#357a38" />
            </View>
        );
    }
};

export default ParentNavigator;
