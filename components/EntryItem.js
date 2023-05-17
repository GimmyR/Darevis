import { useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { Row, Rows, Table } from "react-native-table-component";
import { arrayToObject } from "../utils/helpers";
import IconButton from "./IconButton";

const EntryItem = function({ entry, navigation }) {
    const db = SQLite.openDatabase("darevis");

    const [details, setDetails] = useState([]);

    const setDet = function(table) {
        details.splice(0, details.length);
        table.forEach(row => details.push([ row.title, row.data_value ]));
        setDetails([...details]);
    };

    const selectDetails = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT p.title, ed.data_value FROM Entry_Detail ed JOIN Parameter p ON ed.parameter_id = p.id WHERE entry_id = ?", [ entry.id ],
                (txObj, resultSet) => setDet(arrayToObject(resultSet.rows._array)),
                (txObj, error) => console.log(error)
            );
        });
    };

    useEffect(() => {
        selectDetails();
        LogBox.ignoreLogs(["Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`"]);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.additionDateView}>
                <Text style={styles.additionDateText}>{entry.addition_date}</Text>
                <IconButton onPress={() => navigation.push("edit entry", { entry: entry.id })} name={ "edit" } iconStyle={styles.icon}/>
            </View>
            <View style={styles.tableView}>
                <Table borderStyle={styles.table}>
                    <Rows data={details} textStyle={styles.tableText}></Rows>
                </Table>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },

    additionDateView: {
        flexDirection: "row",
        backgroundColor: "gray",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderBottomWidth: 0
    },

    additionDateText: {
        flex: 7,
        color: "#ffffff",
        fontSize: 15
    },

    icon: {
        flex: 1,
        fontSize: 18,
        color: "white"
    },

    tableView: {

    },

    table: {
        borderWidth: 1,
        borderColor: "black"
    },

    tableText: {
        marginHorizontal: 20,
        marginVertical: 5
    }
});

export default EntryItem;