//dependencies
import { useUser } from "@realm/react";
import { View} from "react-native";

const InfoHeader = () => {
    const user = useUser();
    const userDetails = user.customData;

    return (
        <View
            style={{
                flex: 1,
                padding: 10,
                alignContent: "center",
                alignItems: "center",
            }}
        ></View>
    );
};

export default InfoHeader;
