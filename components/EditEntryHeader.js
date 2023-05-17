import { Alert, StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { arrayToObject } from "../utils/helpers";

const EditEntryHeader = function({ entry, navigation }) {
    const db = SQLite.openDatabase("darevis");

    const [record, setRecord] = useState(null);

    const selectRecord = function() {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Record WHERE id = ?", [ entry.record_id ],
            (txObj, resultSet) => {
                if(resultSet.rows._array.length == 1)
                    setRecord(arrayToObject(resultSet.rows._array[0]));
            }, (txObj, error) => console.log(error)
        ));
    };

    const removeEntry = function() {
        db.transaction(tx => tx.executeSql(
            "DELETE FROM Entry_Data WHERE id = ?", [ entry.id ],
            (txObj, resultSet) => navigation.push("record", { record: record }),
            (txObj, error) => console.log(error)
        ));
    };

    const onPressTrash = function() {
        Alert.alert("Confirmation", "Are you sure you want to continue ?", [
            { text: "No" },
            { text: "Yes", onPress: () => removeEntry() }
        ]);
    };

    useEffect(() => selectRecord(), []);

    return (
        <View style={styles.container}>
            <View style={styles.buttonView}>
                <IconButton onPress={() => navigation.push("record", { record: record })} name={ "arrow-left" } iconStyle={styles.icon}/>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Edit Entry</Text>
            </View>
            <View style={styles.buttonView}>
                <IconButton onPress={() => onPressTrash()} name={ "trash" } iconStyle={styles.icon}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    },

    titleView: {
        flex: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    title: {
        fontWeight: "bold",
        fontSize: 20
    },

    buttonView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    icon: {
        fontSize: 18
    }
});

export default EditEntryHeader;