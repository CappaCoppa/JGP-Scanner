import { createRealmContext } from "@realm/react";
import { Session } from "./Session";

export const SessionRealmContext = createRealmContext({
    schema: [Session],
});
