import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import Table from "./Table";
import IconButton from "./IconButton";

const EntriesTable = function({ parameters, entries, navigation }) {
    const db = SQLite.openDatabase("darevis");

    const [headers, setHeaders] = useState([]);

    const [rows, setRows] = useState([]);

    const fillHeaders = function() {
        headers.splice(0, headers.length);
        headers.push("Addition Date");

        parameters.forEach(p => {
            headers.push(p.title);
            setHeaders([...headers]);
        });

        headers.push("Edit");
        setHeaders([...headers]);
    };

    const fillRows = function(row, result, entryId) {
        if(result.length == 1)
            row.push(result[0]["data_value"]);
        else row.push("");

        if(row.length == parameters.length + 1) {
            row.push(<IconButton onPress={() => navigation.push("edit entry", { entry: entryId })} name={ "edit" } iconStyle={styles.icon}/>);
            rows.push(row);
            setRows([...rows]);
        }
    };

    const selectDetails = function() {
        rows.splice(0, rows.length);
        db.transaction(tx => entries.forEach(e => {
            let row = [ e.addition_date ];
            parameters.forEach(p => tx.executeSql(
                "SELECT * FROM Entry_Detail WHERE entry_id = ? AND parameter_id = ?", [e.id, p.id],
                (txObj, resultSet) => fillRows(row, resultSet.rows._array, e.id),
                (txObj, error) => console.log(error)
            ));
        }));
    };

    useEffect(() => { 
        fillHeaders(); 
        selectDetails();
    }, []);

    return (
        <View style={styles.container}>
            {
                rows.length > 0 ? <Table headers={headers} rows={rows} cellWidth={100} borderWidth={1}/>
                                : <ActivityIndicator size="large" color="#686868"/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: "center"
    },

    icon: {
        flex: 1,
        fontSize: 15
    }
});

export default EntriesTable;