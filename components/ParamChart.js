import { StyleSheet, Text, View } from "react-native";
import LineChart from "./LineChart";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const ParamChart = function({ parameter, entries }) {
    const db = SQLite.openDatabase("darevis");

    const [data, setData] = useState([]);

    const selectDetails = function() {
        data.splice(0, data.length);
        db.transaction(tx => entries.forEach(e => tx.executeSql(
            "SELECT * FROM Entry_Detail WHERE entry_id = ? AND parameter_id = ?", [e.id, parameter.id],
            (txObj, resultSet) => {
                data.push({ x: e.addition_date, y: resultSet.rows._array[0]["data_value"] });
                setData([...data]);
            }, (txObj, error) => console.log(error)
        )));
    };

    useEffect(() => selectDetails(), []);

    return (
        <View style={styles.container}>
            <Text>{parameter.title}</Text>
            <LineChart data={data} style={styles.lineChart}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 5
    },

    lineChart: {
        height: 200
    }
});

export default ParamChart;