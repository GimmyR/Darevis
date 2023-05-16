import { Button, StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Row, Rows, Table } from "react-native-table-component";

const EntriesTable = function({ record }) {
    const db = SQLite.openDatabase("darevis");

    const [parameters, setParameters] = useState([]);

    const setParams = function(table) {
        parameters.splice(0, parameters.length);
        table.forEach(row => parameters.push(row["title"]));
        parameters.unshift("Date");
        //parameters.push("");
        setParameters([...parameters]);
    };

    const [entries, setEntries] = useState([]);

    const setEntry = function(entry, resultSet, resultSet2) {
        resultSet2.rows._array.forEach(p => {
            for(var i = 0, e = resultSet.rows._array; i < e.length; i++) {
                if(p["id"] == e[i]["parameter_id"]) {
                    entry.push(e[i]["data_value"]);
                    break;
                } else if(resultSet2.rows._array.length != e.length) entry.push("");
            }
        }); //entry.push(<Button title="Hello ?"/>);
    };

    const selectDetails = function(tx, row, entry) {
        tx.executeSql(
            "SELECT * FROM Entry_Detail WHERE entry_id = ?", [ row["id"] ],
            (txObj, resultSet) => {
                tx.executeSql(
                    "SELECT * FROM Parameter WHERE record_id = ? ORDER BY id ASC", [ record.id ],
                    (txObj2, resultSet2) => setEntry(entry, resultSet, resultSet2),
                    (txObj2, error) => console.log(error)
                );
            }, (txObj, error) => console.log(error)
        );
    };

    const setEntryData = function(tx, table) {
        entries.splice(0, entries.length);
        table.forEach(row => {
            let entry = [ row["addition_date"] ];
            selectDetails(tx, row, entry);
            entries.push(entry);
        }); setTimeout(() => setEntries([...entries]), 200);
    };

    const selectParameters = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Parameter WHERE record_id = ? ORDER BY id ASC",
                [ record.id ],
                (txObj, resultSet) => setParams(resultSet.rows._array),
                (txObj, error) => console.log(error)
            );
        });
    };

    const selectEntries = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Entry_Data WHERE record_id = ? ORDER BY id ASC",
                [ record.id ],
                (txObj, resultSet) => setEntryData(tx, resultSet.rows._array),
                (txObj, error) => console.log(error)
            );
        });
    };

    useEffect(() => {
        selectParameters();
        selectEntries();
    }, []);

    return (
        <View>
            <Table borderStyle={styles.table}>
                <Row data={parameters} style={styles.headerTable} textStyle={styles.textTable}></Row>
                <Rows data={entries} textStyle={styles.textTable}></Rows>
            </Table>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },

    table: {
        borderWidth: 1,
        borderColor: "black"
    },

    headerTable: {
        height: 50,
        alignContent: "center",
        backgroundColor: "#abb1ff"
    },

    textTable: {
        margin: 10
    }
});

export default EntriesTable;