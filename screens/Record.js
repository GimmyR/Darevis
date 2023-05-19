import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecordHeader from "../components/RecordHeader";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import EntryNotFound from "../components/EntryNotFound";
import { arrayToObject } from "../utils/helpers";
import EntryItem from "../components/EntryItem";
import ParamChart from "../components/ParamChart";

const Record = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [parameters, setParameters] = useState([]);

    const [entries, setEntries] = useState([]);

    const [record, setRecord] = useState(null);

    const selectParameters = function(recordId) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Parameter WHERE record_id = ?", [recordId],
            (txObj, resultSet) => setParameters(arrayToObject(resultSet.rows._array)),
            (txObj, error) => console.log(error)
        ));
    };

    const selectEntries = function(recordId) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Entry_Data WHERE record_id = ?", [ recordId ],
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
                    {entries.length > 0 && parameters.map(p => <ParamChart key={p.id}/>)}
                    {entries.map(e => <EntryItem key={e.id} entry={e} navigation={navigation}/>)}
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
        paddingHorizontal: 20,
        paddingVertical: 0
    }
});

export default Record;