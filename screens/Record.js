import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecordHeader from "../components/RecordHeader";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import EntryNotFound from "../components/EntryNotFound";
import { arrayToObject } from "../utils/helpers";
import EntryItem from "../components/EntryItem";
import LineChart from "../components/LineChart";
import ParamChart from "../components/ParamChart";
import Table from "../components/Table";
import EntriesTable from "../components/EntriesTable";

const Record = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [parameters, setParameters] = useState([]);

    const [entries, setEntries] = useState([]);

    const [record, setRecord] = useState(null);

    const selectParameters = function(recordId) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Parameter WHERE record_id = ? ORDER BY id ASC", [recordId],
            (txObj, resultSet) => setParameters(arrayToObject(resultSet.rows._array)),
            (txObj, error) => console.log(error)
        ));
    };

    const selectEntries = function(recordId) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Entry_Data WHERE record_id = ? ORDER BY id ASC", [ recordId ],
            (txObj, resultSet) => setEntries(arrayToObject(resultSet.rows._array)),
            (txObj, error) => console.log(error)
        ));
    };

    const selectRecord = function() {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Record WHERE id = ?", [ route.params.record ],
            (txObj, resultSet) => {
                setRecord(arrayToObject(resultSet.rows._array[0]));
                selectParameters(resultSet.rows._array[0]["id"]);
                selectEntries(resultSet.rows._array[0]["id"]);
            }, (txObj, error) => console.log(error)
        ));
    };

    useEffect(() => selectRecord(), []);

    if(record != null) {
        return (
            <View style={styles.container}>
                <RecordHeader record={record} navigation={navigation}/>
                <ScrollView style={styles.scrollView}>
                    {entries.length == 0 && <EntryNotFound/>}
                    {entries.length > 1 && parameters.map(p => <ParamChart key={p.id} parameter={p} entries={entries}/>)}
                    {entries.length > 0 && <EntriesTable parameters={parameters} entries={entries} navigation={navigation}/>}
                </ScrollView>
            </View>
        );
    } else return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    },

    scrollView: {
        paddingHorizontal: 20
    }
});

export default Record;