import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import NewEntryHeader from "../components/NewEntryHeader";
import StdButton from "../components/StdButton";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import Parameter from "../components/Parameter";
import { arrayToObject } from "../utils/helpers";

const NewEntry = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [record, setRecord] = useState(route.params.record);

    const [parameters, setParameters] = useState([]);

    const [values, setValues] = useState([]);

    const [isValid, setIsValid] = useState(true);

    const initValues = function(length) {
        let val = [];
        for(var i = 0; i < length; i++)
            val.push({ parameter_id: null, data_value: null });
        setValues(val);
    };

    const selectParameters = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Parameter WHERE record_id = ?", [ record.id ],
                (txObj, resultSet) => {
                    initValues(resultSet.rows._array.length);
                    setParameters(arrayToObject(resultSet.rows._array));
                }, (txObj, error) => console.log(error)
            );
        });
    };

    const onPressSaveEntry = function() {
        if(isValid) {
            Alert.alert("Confirmation", "Are you sure you want to continue ?", [
                { text: "No" },
                { text: "Yes", onPress: () => onPressYes() }
            ]);
        } else Alert.alert("Caution", "A data is invalid.", [{ text: "Ok" }]);
    };

    const onPressYes = function() {
        let date = new Date();
        let entry = { 
            record_id: record.id, 
            addition_date:  date.toLocaleDateString() + " " + date.toLocaleTimeString()
        }; saveEntry(entry);
    };

    const saveEntry = function(entry) {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Entry_Data (record_id, addition_date) VALUES (?, ?)",
                [ entry.record_id, entry.addition_date ],
                (txObj, resultSet) => saveDetails(tx, resultSet.insertId), 
                (txObj, error) => console.log(error)
            );
        });
    };

    const saveDetails = function(tx, entry_id) {
        values.forEach(v => tx.executeSql(
            "INSERT INTO Entry_Detail (entry_id, parameter_id, data_value) VALUES(?, ?, ?)",
            [ entry_id, v.parameter_id, v.data_value ], null,
            (txObj, error) => console.log(error)
        )); navigation.push("record", { record: record.id });
    };

    useEffect(() => selectParameters(), []);

    return (
        <View style={styles.container}>
            <NewEntryHeader record={record} navigation={navigation}/>
            <ScrollView style={styles.scrollView}>
                {parameters.map((p, index) => <Parameter key={p.id} parameter={p} values={values} index={index} setValues={setValues} setIsValid={setIsValid}/>)}
            </ScrollView>
            <View style={styles.btnView}>
                <StdButton onPress={() => onPressSaveEntry()} btnStyle={styles.btnStyle} txtStyle={styles.txtStyle} underlayColor={"#d1d14d"}>Save Entry</StdButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    },

    scrollView: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },

    btnView: {
        position: "relative",
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#dddddd"
    },

    btnStyle: {
        backgroundColor: "#e3e554"
    },

    txtStyle: {
        fontWeight: "bold",
        color: "#000000"
    }
});

export default NewEntry;