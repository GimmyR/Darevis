import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import EditRecordHeader from "../components/EditRecordHeader";
import StdButton from "../components/StdButton";
import { useEffect, useState } from "react";
import NewParameter from "../components/NewParameter";
import * as SQLite from "expo-sqlite";
import DateInput from "../components/DateInput";
import { addZeroBefore, arrayToObject } from "../utils/helpers";

const EditRecord = function({ navigation, route }) {
    const db = SQLite.openDatabase("darevis");

    const [record, setRecord] = useState(null);

    const [dateIsValid, setDateIsValid] = useState(true);

    const modifyTitle = function(newTitle) {
        let rec = record;
        rec.title = newTitle;
        setRecord(rec);
    };

    const modifyDate = function(index, value) {
        let date = record.creation_date.split("/");
        var strValue = value + "";
        if(index != 2)
            strValue = addZeroBefore(strValue);
        date[index] = strValue;
        record.creation_date = date[0] + "/" + date[1] + "/" + date[2];
        setRecord({...record});
    };

    const [parameters, setParameters] = useState([]);

    const removeParam = function(index) {
        parameters[index].comment = "remove";
        setParameters([...parameters]);
    };

    const onPressNewParameter = function() {
        parameters.push({ title: null, min: null, max: null, unit: null, comment: "add" });
        setParameters([...parameters]);
    };

    const onPressSaveRecord = function() {
        if(dateIsValid) {
            Alert.alert("Confirmation", "Are you sure you want to continue ?", [
                { text: "No" },
                { text: "Yes", onPress: () => onPressYes() }
            ]);
        } else {
            Alert.alert("Caution", "Date is invalid.", [ { text: "Ok" } ]);
        }
    };

    const updateParameters = function(tx, recordId) {
        parameters.forEach(p => {
            if(p.comment != undefined && p.comment == "add")
                tx.executeSql(
                    "INSERT INTO Parameter(record_id, title, min, max, unit) VALUES(?, ?, ?, ?, ?)",
                    [ recordId, p.title, p.min, p.max, p.unit ],
                    (txObj, resultSet) => console.log("INSERTED : ", resultSet.insertId),
                    (txObj, error) => console.log(error)
                );
            else if(p.comment != undefined && p.comment == "remove")
                tx.executeSql(
                    "DELETE FROM Parameter WHERE id = ?", [ p.id ],
                    (txObj, resultSet) => console.log("DELETED : ", p.id),
                    (txObj, error) => console.log(error)
                );
            else tx.executeSql(
                "UPDATE Parameter SET title = ?, min = ?, max = ?, unit = ? WHERE id = ?",
                [ p.title, p.min, p.max, p.unit, p.id ],
                (txObj, resultSet) => console.log("UPDATED : ", p.id),
                (txObj, error) => console.log(error)
            );
        });
    };

    const onPressYes = function() {
        db.transaction(tx => tx.executeSql(
            "UPDATE Record SET creation_date = ?, title = ? WHERE id = ?",
            [ record.creation_date, record.title, record.id ],
            (txObj, resultSet) => {
                updateParameters(tx, record.id);
                navigation.push("record", { record: record.id });
            }, (txObj, error) => console.log(error)
        ));
    };

    const selectRecord = function() {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Record WHERE id = ?",
            [ route.params.record.id ],
            (txObj, resultSet) => {
                setRecord(arrayToObject(resultSet.rows._array[0]));
                selectParameters(resultSet.rows._array[0]["id"]);
            }, (txObj, error) => console.log(error)
        ));
    };

    const selectParameters = function(id) {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Parameter WHERE record_id = ?", [ id ],
            (txObj, resultSet) => setParameters(arrayToObject(resultSet.rows._array)),
            (txObj, error) => console.log(error)
        ));
    };

    const parametersView = parameters.map(
        (parameter, index) => 
            <NewParameter key={index} index={index} parameters={parameters} setParameters={setParameters} removeParam={removeParam}/>
    );

    useEffect(() => {
        selectRecord();
    }, []);

    if(record != null) return (
        <View style={styles.container}>
            <EditRecordHeader record={record} navigation={navigation}/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.titleView}>
                    <View style={styles.dateView}>
                        <Text style={styles.dateText}>Date</Text>
                        {!dateIsValid && <Text style={styles.invalidText}> is invalid</Text>}
                    </View>
                    <DateInput date={record.creation_date} setDate={modifyDate} setIsValid={setDateIsValid}/>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Title</Text>
                    <TextInput defaultValue={record.title} onChangeText={newTitle => modifyTitle(newTitle)} style={styles.titleTextInput}/>
                </View>
                <View style={styles.parametersView}>
                    {parametersView}
                    <StdButton onPress={onPressNewParameter} btnStyle={styles.npBtnStyle} txtStyle={styles.npTxtStyle} underlayColor={"#4062a7"}>New Parameter</StdButton>
                </View>
            </ScrollView>
            <View style={styles.srView}>
                <StdButton onPress={onPressSaveRecord} btnStyle={styles.srBtnStyle} txtStyle={styles.srTxtStyle} underlayColor={"#d1d14d"}>Save Record</StdButton>
            </View>
        </View>
    ); else return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    },

    scrollView: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    dateView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },

    dateText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000"
    },

    invalidText: {
        color: "red",
        fontWeight: "bold"
    },

    titleView: {
        marginBottom: 10
    },

    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 5
    },

    titleTextInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    parametersView: {
        
    },

    npBtnStyle: {
        backgroundColor: "#4e76cb",
        marginTop: 5,
        marginBottom: 35
    },

    npTxtStyle: {
        fontSize: 13,
        color: "#ffffff"
    },

    srView: {
        position: "relative",
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#dddddd"
    },

    srBtnStyle: {
        backgroundColor: "#e3e554"
    },

    srTxtStyle: {
        fontWeight: "bold",
        color: "#000000"
    }
});

export default EditRecord;