import { StyleSheet } from "react-native";

const styleSheet = StyleSheet.create({
    //Global view
    container: {
        padding: 20,
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ecf7ed",
        justifyContent: "center",
    }, //
    //Global h1
    headerText: {
        textTransform: "uppercase",
        fontSize: 30,
        color: "#357a38",
        textAlign: "center",
        width: "100%",
    }, //
    //HygieneHandOver
    DataTableTitle: {
        marginTop: 20,
        color: "white",
        padding: 10,
        fontSize: 25,
        textAlign: "center",
        letterSpacing: 3,
        textTransform: "uppercase",
        backgroundColor: "#68b36b",
        width: "100%",
        borderRadius: 5,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: "#357a38",
        width: "100%",
        margin: 5,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textTransform: "uppercase",
    }, //
});

export default styleSheet;
