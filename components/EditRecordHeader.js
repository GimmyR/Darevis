import { Alert, StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import * as SQLite from "expo-sqlite";

const EditRecordHeader = function({ record, navigation }) {
    const db = SQLite.openDatabase("darevis");

    const removeRecord = function() {
        db.transaction(tx => tx.executeSql(
            "DELETE FROM Record WHERE id = ?", [ record.id ],
            (txObj, resultSet) => navigation.push("home"),
            (txObj, error) => console.log(error)
        ));
    };

    const onPressTrash = function() {
        Alert.alert("Confirmation", "Are you sure you want to continue ?", [
            { text: "No" },
            { text: "Yes", onPress: () => removeRecord() }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonView}>
                <IconButton onPress={() => navigation.push("record", { record: record.id })} name={ "arrow-left" } iconStyle={styles.icon}/>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Edit Record</Text>
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

export default EditRecordHeader;