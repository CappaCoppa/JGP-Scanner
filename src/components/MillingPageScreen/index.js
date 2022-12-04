import { useContext } from "react";
import { View, Text, StyleSheet, SectionList, Pressable } from "react-native";
import { FirstLevelContext } from "../../context/FirstLevelContext";

const MillingPageScreen = ({ navigation }) => {
  const { sessionObject } = useContext(FirstLevelContext);

  const milling = sessionObject.milling;

  const sectionHeader = ({ title }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    );
  };

  const sectionListItem = ({ time }, section, index) => {
    const sectionIndex = milling.qr_scan.indexOf(section);
    return (
      <View
        style={{
          margin: 10,
        }}
      >
        <Pressable
          disabled={
            milling.qr_scan[sectionIndex].data[index].is_completed
              ? true
              : false
          }
          onPress={() => {
            navigation.navigate("QrScannerPage", {
              qr_code: section.qr_code,
              index,
              sectionIndex,
              sectionName: "milling",
            });
          }}
          style={
            milling.qr_scan[sectionIndex].data[index].is_completed
              ? styles.finishedSectionItem
              : styles.sectionItem
          }
        >
          <Text style={styles.sectionListItemText}>{time}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <SectionList
          sections={milling.qr_scan}
          keyExtractor={(item, index) => index}
          renderItem={({ item, section, index }) => {
            return sectionListItem(item, section, index);
          }}
          renderSectionHeader={({ section }) => {
            return sectionHeader(section);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  sectionHeader: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    width: "100%",
    padding: 10,
    backgroundColor: "#4caf50",
  },
  sectionHeaderText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5,
    textTransform: "uppercase",
  },
  finishedSectionItem: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
    width: "100%",
    padding: 20,
    backgroundColor: "#6fbf73",
  },
  sectionListItemText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 5,
    textTransform: "uppercase",
  },
  sectionItem: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
    width: "100%",
    padding: 20,
    backgroundColor: "#ffac33",
  },
});

export default MillingPageScreen;
