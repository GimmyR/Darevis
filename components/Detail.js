import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as SQLite from "expo-sqlite";
import arrayToObject from "../utils/functions";

const Detail = function({ parameter, entry, index, setValue, setIsValid }) {
    const db = SQLite.openDatabase("darevis");

    const [detail, setDetail] = useState(null);

    const [valid, setValid] = useState(true);

    const validate = function(value) {
        setValid(value);
        setIsValid(value);
    };

    const setDataValue = function(value) {
        var nb = parseFloat(value);
        if(value == "" || (parameter.min <= nb && nb <= parameter.max)) {
            validate(true);
            setValue(index, value);
        } else validate(false);
    };

    const selectDetail = function() {
        db.transaction(tx => tx.executeSql(
            "SELECT * FROM Entry_Detail WHERE parameter_id = ? AND entry_id = ?",
            [ parameter.id, entry.id ],
            (txObj, resultSet) => {
                if(resultSet.rows._array.length == 1) {
                    setValue(index, resultSet.rows._array[0]["data_value"]);
                    setDetail(arrayToObject(resultSet.rows._array[0]));
                }
            }, (txObj, error) => console.log(error)
        ));
    };

    const castToString = function(item) {
        if(item == null)
            return "";
        else return item + "";
    };

    useEffect(() => selectDetail(), []);

    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>{parameter.title} ({parameter.unit})</Text>
                {!valid && <Text style={styles.invalid}> is invalid</Text>}
            </View>
            <TextInput onChangeText={newValue => setDataValue(newValue)} defaultValue={detail != null ? castToString(detail.data_value) : ""} style={styles.textInput} inputMode="numeric"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5
    },

    textView: {
        flexDirection: "row",
        marginBottom: 5
    },

    text: {
        fontWeight: "bold"
    },

    invalid: {
        color: "red"
    },

    textInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        color: "#383838",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5
    }
});

export default Detail;