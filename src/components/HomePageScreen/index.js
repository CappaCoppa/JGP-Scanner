//Dependencies
import { View, Text, StyleSheet, Pressable} from "react-native";
import { useUser } from "@realm/react";

//Components

const HomePageScreen = () => {
    const user = useUser();
    const userDetails = user.customData;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Welcome operator
                {` ${userDetails.first_name} ${userDetails.last_name}`}
            </Text>
            <Pressable
                onPress={() => {
                    user.logOut();
                }}
                style={styles.logOutButton}
            >
                <Text style={styles.logOut}>Log out</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    logOutButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        elevation: 3,
        width: "50%",
        padding: 10,
        backgroundColor: "#aa2e25",
    },
    halfScreenButton: {
        flex: 0.49,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: 60,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "#357a38",
    },
    text: {
        textAlign: "center",
        width: 450,
        textTransform: "uppercase",
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#357a38",
    },
    logOut: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "white",
    },
});

export default HomePageScreen;
