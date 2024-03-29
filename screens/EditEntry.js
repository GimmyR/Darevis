import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import EditEntryHeader from "../components/EditEntryHeader";
import { useEffect, useState } from "react";
import StdButton from "../components/StdButton";
import * as SQLite from "expo-sqlite";
import { addZeroBefore, arrayToObject } from "../utils/helpers";
import Detail from "../components/Detail";
import DateInput from "../components/DateInput";
import TimeInput from "../components/TimeInput";

const EditEntry = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [entry, setEntry] = useState(null);

    const [record, setRecord] = useState(null);

    const [date, setDate] = useState(null);

    const [time, setTime] = useState(null);

    const [parameters, setParameters] = useState([]);

    const [values, setValues] = useState([]);

    const [isValid, setIsValid] = useState(true);

    const [datetimeValid, setDatetimeValid] = useState(true);

    const modifyDate = function(index, value) {
        let dmy = date.split("/");
        var strValue = value + "";
        if(index != 2)
            strValue = addZeroBefore(strValue);
        dmy[index] = strValue;
        setDate(dmy[0] + "/" + dmy[1] + "/" + dmy[2]);
    };

    const modifyTime = function(index, value) {
        let hms = time.split(":");
        var strValue = addZeroBefore(value + "");
        hms[index] = strValue;
        setTime(hms[0] + ":" + hms[1] + ":" + hms[2]);
    };

    const initValues = function(table, entryId) {
        values.splice(0, values.length);
        table.forEach(row => {
            values.push({ entry_id: entryId, parameter_id: row.id, data_value: null });
            setValues([...values]);
        });
    };

    const setValue = function(index, value) {
        values[index].data_value = value;
        setValues([...values]);
    };

    const selectEntry = function() {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Entry_Data WHERE id = ?", [ route.params.entry ],
            (txObj, resultSet) => {
                setDate(resultSet.rows._array[0]["addition_date"].split(" ")[0]);
                setTime(resultSet.rows._array[0]["addition_date"].split(" ")[1]);
                setEntry(arrayToObject(resultSet.rows._array[0]));
                selectParameters(resultSet.rows._array[0]["record_id"], resultSet.rows._array[0]["id"]);
                selectRecord(resultSet.rows._array[0]["record_id"]);
            }, (txObj, error) => console.log(error)
        ));
    };

    const selectParameters = function(recordId, entryId) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Parameter WHERE record_id = ?", [ recordId ],
            (txObj, resultSet) => {
                initValues(arrayToObject(resultSet.rows._array), entryId);
                setParameters(arrayToObject(resultSet.rows._array));
            }, (txObj, error) => console.log(error)
        ));
    };

    const selectRecord = function(recordId) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Record WHERE id = ?", [ recordId ],
            (txObj, resultSet) => {
                if(resultSet.rows._array.length == 1)
                    setRecord(arrayToObject(resultSet.rows._array[0]));
            }, (txObj, error) => console.log(error)
        ));
    };

    const onPressSaveEntry = function() {
        if(isValid && datetimeValid) {
            Alert.alert("Confirmation", "Are you sure you want to continue ?", [
                { text: "No" },
                { text: "Yes", onPress: () => onPressYes() }
            ]);
        } else Alert.alert("Caution", "A data is invalid.", [ { text: "Ok" } ]);
    };

    const onPressYes = function() {
        db.transaction(tx => tx.executeSql(
            "UPDATE Entry_Data SET addition_date = ? WHERE id = ?", [ date + " " + time, entry.id ],
            (txObj, resultSet) => tx.executeSql(
                "DELETE FROM Entry_Detail WHERE entry_id = ?", [ entry.id ],
                (txObj2, resultSet2) => {
                    values.forEach(v => tx.executeSql(
                        "INSERT INTO Entry_Detail(entry_id, parameter_id, data_value) VALUES(?, ?, ?)",
                        [ v.entry_id, v.parameter_id, v.data_value ],
                        (txObj3, resultSet3) => null,
                        (txObj3, error) => console.log(error)
                    )); navigation.push("record", { record: record.id })
                }, (txObj2, error) => console.log(error)
            ), (txObj, error) => console.log(error)
        ));
    };

    useEffect(() => selectEntry(), []);

    if(entry != null) {
        return (
            <View style={styles.container}>
                <EditEntryHeader entry={entry} navigation={navigation}/>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.datetimeView}>
                        <Text style={styles.datetimeText}>Date & Time</Text>
                        {!datetimeValid && <Text style={styles.invalid}>  are invalid</Text>}
                    </View>
                    <View style={styles.dateView}>
                        <DateInput date={date} setDate={modifyDate} setIsValid={setDatetimeValid}/>
                    </View>
                    <View style={styles.timeView}>
                        <TimeInput time={time} setTime={modifyTime} setIsValid={setDatetimeValid}/>
                    </View>
                    <View style={styles.parametersView}>
                        {parameters.map((p, index) => <Detail key={p.id} parameter={p} entry={entry} index={index} setValue={setValue} setIsValid={setIsValid}/>)}
                    </View>
                </ScrollView>
                <View style={styles.btnView}>
                    <StdButton onPress={() => onPressSaveEntry()} btnStyle={styles.btnStyle} txtStyle={styles.txtStyle} underlayColor={"#d1d14d"}>Save Entry</StdButton>
                </View>
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
        paddingVertical: 20
    },

    datetimeView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },

    datetimeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000"
    },

    invalid: {
        color: "red"
    },

    dateView: {
        marginBottom: 5
    },

    timeView: {
        marginBottom: 10
    },

    parametersView: { 
        marginBottom: 25 
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

export default EditEntry;