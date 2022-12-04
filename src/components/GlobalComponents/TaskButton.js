import { Pressable, Text, StyleSheet } from "react-native";

const TaskButton = ({ location, navigation, title }) => {
    const handleNavigation = () => {
        navigation.navigate(location);
    };

    return (
        <>
            <Pressable onPress={handleNavigation} style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 22,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        width: 300,
        backgroundColor: "#357a38",
        margin: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

export default TaskButton;
