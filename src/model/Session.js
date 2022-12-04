import { Realm } from "@realm/react";
export class Session extends Realm.Object {
    // To use a class as a Realm object type, define the object schema on the static property "schema".
    static schema = {
        name: "Session",
        primaryKey: "_id",
        properties: {
            _id: "string",
            date_created: "string",
            time_created: "string",
            shift: "string",
            week_day: "string",
        },
    };
}
