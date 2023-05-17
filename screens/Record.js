import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecordHeader from "../components/RecordHeader";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import EntryNotFound from "../components/EntryNotFound";
import { arrayToObject } from "../utils/helpers";
import EntryItem from "../components/EntryItem";

const Record = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [record, setRecord] = useState(route.params.record);

    const [entries, setEntries] = useState([]);

    const selectEntries = function() {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Entry_Data WHERE record_id = ?", [ record.id ],
            (txObj, resultSet) => setEntries(arrayToObject(resultSet.rows._array)),
            (txObj, error) => console.log(error)
        ));
    };

    useEffect(() => selectEntries(), []);

    return (
        <View style={styles.container}>
            <RecordHeader record={record} navigation={navigation}/>
            <ScrollView style={styles.scrollView}>
                {entries.length == 0 && <EntryNotFound/>}
                {entries.map(e => <EntryItem key={e.id} entry={e} navigation={navigation}/>)}
            </ScrollView>
        </View>
    );
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