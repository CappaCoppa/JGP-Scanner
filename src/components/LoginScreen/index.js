//Dependencies
import { useState } from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import { Realm, useApp } from "@realm/react";
import { TextInput, Button } from "react-native-paper";

const LoginScreen = () => {
    const app = useApp();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const credentials = Realm.Credentials.emailPassword(username, password);

    const handleLogIn = async () => {
        setLoading(true);
        try {
            await app.logIn(credentials);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <ImageBackground
            source={require("../../../assets/Pictures/NewarkFactory.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require("../../../assets/Pictures/LogoJGP.png")}
                />
                <TextInput
                    label="Username"
                    style={styles.input}
                    onChangeText={setUsername}
                    mode="outlined"
                    outlineColor="#4caf50"
                    activeOutlineColor="#357a38"
                />
                <TextInput
                    label="Password"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    mode="outlined"
                    outlineColor="#4caf50"
                    activeOutlineColor="#357a38"
                />
                <Button
                    mode="contained"
                    color="#4caf50"
                    loading={loading}
                    style={styles.button}
                    onPress={handleLogIn}
                    contentStyle={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 10,
                    }}
                    dark={true}
                >
                    LOGIN
                </Button>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        padding: 20,
        width: "100%",
        height: 450,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "100%",
        margin: 17,
        fontSize: 15,
        color: "#4caf50",
    },
    background: {
        alignItems: "center",
        padding: 20,
        flex: 1,
        justifyContent: "center",
    },
    image: {
        margin: 20,
    },
    text: {
        fontWeight: "bold",
        letterSpacing: 5,
        color: "white",
    },
    button: {
        margin: 20,
    },
});

export default LoginScreen;
