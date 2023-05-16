import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Parameter = function({ parameter, values, index, setValues, setIsValid }) {
    const [valid, setValid] = useState(true);

    const validate = function(value) {
        setValid(value);
        setIsValid(value);
    };

    const setVal = function(value) {
        var nb = parseFloat(value);
        if(value == "" || (parameter.min <= nb && nb <= parameter.max)) {
            let val = values;
            val[index].parameter_id = parameter.id;
            val[index].data_value = value;
            setValues(val);
            validate(true);
        } else validate(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>{parameter.title} ({parameter.unit})</Text>
                {!valid && <Text style={styles.invalid}> is invalid</Text>}
            </View>
            <TextInput defaultValue={values[index].value} onChangeText={newValue => setVal(newValue)} style={styles.textInput} inputMode="numeric"/>
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

export default Parameter;