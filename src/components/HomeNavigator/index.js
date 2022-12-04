//Dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, StyleSheet } from "react-native";

//Componenets
import HomePageScreen from "../HomePageScreen";
import TomraPageScreen from "../TomraPageScreen";
import MillingPageScreen from "../MillingPageScreen";

const HomeNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomePageScreen"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: "#357a38",
          alignItems: "center",
          alignContent: "center",
        },
        headerStyle: {
          backgroundColor: "#357a38",
          height: 60,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          color: "white",
          letterSpacing: 10,
          textTransform: "uppercase",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => {
            return (
              <Text
                style={
                  focused
                    ? styles.navigationButtonTextActive
                    : styles.navigationButtonText
                }
              >
                Tomra
              </Text>
            );
          },
        }}
        name="tomra"
        component={TomraPageScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => {
            return (
              <Text
                style={
                  focused
                    ? styles.navigationButtonTextActive
                    : styles.navigationButtonText
                }
              >
                Home
              </Text>
            );
          },
        }}
        name="HomePageScreen"
        component={HomePageScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => {
            return (
              <Text
                style={
                  focused
                    ? styles.navigationButtonTextActive
                    : styles.navigationButtonText
                }
              >
                Milling
              </Text>
            );
          },
        }}
        name="milling"
        component={MillingPageScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigationButtonText: {
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  navigationButtonTextActive: {
    fontWeight: "bold",
    color: "#ffac33",
    textTransform: "uppercase",
  },
});

export default HomeNavigator;
