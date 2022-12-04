import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { FirstLevelContext } from "../../context/FirstLevelContext";
import { useUser } from "@realm/react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const QrScannerPage = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, setPermission] = useState(null);

  const { sessionObject, setSessionObject, setUpdateState } =
    useContext(FirstLevelContext);
  const { qr_code, index, sectionIndex, sectionName } = route.params;

  const user = useUser();
  const userDetails = user.customData;

  const fulldate = new Date();

  const currentTime = () =>
    `${fulldate.getHours().toString().padStart(2, 0)}:${fulldate
      .getMinutes()
      .toString()
      .padStart(2, 0)}:${fulldate.getSeconds().toString().padStart(2, 0)}`;

  useEffect(() => {
    cammeraPermision();
  }, []);

  const cammeraPermision = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const barCodeScanner = () => {
    return (
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          style={styles.barCodeScanner}
          onBarCodeScanned={({ data }) => {
            if (data === qr_code) {
              setSessionObject((prevState) => {
                const newState = { ...prevState };
                newState[sectionName].qr_scan[sectionIndex].data[
                  index
                ].completed_by = `${userDetails.first_name} ${userDetails.last_name}`;
                newState[sectionName].qr_scan[sectionIndex].data[
                  index
                ].clock_number = `${userDetails.clock_number}`;
                newState[sectionName].qr_scan[sectionIndex].data[
                  index
                ].time_completed = currentTime();
                newState[sectionName].qr_scan[sectionIndex].data[
                  index
                ].is_completed = true;
                return newState;
              });
              setUpdateState((prevState) => !prevState);
              navigation.navigate(sectionName);
            } else setPermission(false);
          }}
        >
          <View style={styles.barCodeSquere}></View>
        </BarCodeScanner>
      </View>
    );
  };

  const infoCard = () => {
    return (
      <View style={styles.card}>
        <FontAwesome name="camera" size={44} color="#357a38" />
        <Text style={styles.text}>
          Please move your camera over the QR code
        </Text>
        <MaterialCommunityIcons name="qrcode-scan" size={200} color="black" />
        {permission === false ? (
          <Text>***wrong code was scanned please try again***</Text>
        ) : null}
        <Pressable
          onPress={() =>
            hasPermission ? setPermission(true) : cammeraPermision()
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Scan Qr code</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {permission ? barCodeScanner() : infoCard()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#357a38",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  card: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 500,
    height: 500,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#357a38",
    width: 300,
    textAlign: "center",
  },
  button: {
    width: 300,
    padding: 20,
    backgroundColor: "#357a38",
  },
  buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  barcodeContainer: {
    backgroundColor: "#357a38",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  barCodeScanner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: "50%",
    paddingHorizontal: "10%",
  },
  barCodeSquere: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#357a38",
    width: "100%",
    height: "100%",
  },
});

export default QrScannerPage;
