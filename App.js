import ParentNavigator from "./src/components/ParentNavigator";
import { AppProvider, UserProvider } from "@realm/react";
import { SYNC_CONFIG } from "./sync.config";
import LoginScreen from "./src/components/LoginScreen";
import { SessionRealmContext } from "./src/model";
import { View, Text } from "react-native";

const { RealmProvider } = SessionRealmContext;

export default function App() {
  return (
    <AppProvider id={SYNC_CONFIG.appId}>
      <UserProvider fallback={LoginScreen}>
        <RealmProvider>
          <ParentNavigator />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
