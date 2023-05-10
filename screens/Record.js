import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecordHeader from "../components/RecordHeader";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import EntryNotFound from "../components/EntryNotFound";

const Record = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [record, setRecord] = useState(route.params.record);

    const [parameters, setParameters] = useState([]);

    const [entries, setEntries] = useState([]);

    const setParams = function(params) {
        setParameters(JSON.parse(JSON.stringify(params)));
    };

    const setData = function(data) {
        setEntries(JSON.parse(JSON.stringify(data)));
    };

    const selectParameters = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Parameter WHERE record_id = ?",
                [ record.id ],
                (txObj, resultSet) => setParams(resultSet.rows._array),
                (txObj, error) => console.log(error)
            );
        });
    };

    const selectEntries = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Entry_Data WHERE record_id = ?",
                [ record.id ],
                (txObj, resultSet) => setData(resultSet.rows._array),
                (txObj, error) => console.log(error)
            );
        });
    };

    useEffect(() => {
        selectParameters();
        selectEntries();
    }, []);

    return (
        <View style={styles.container}>
            <RecordHeader record={record} navigation={navigation}/>
            <ScrollView>
                {entries.length == 0 && <EntryNotFound/>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    }
});

export default Record;