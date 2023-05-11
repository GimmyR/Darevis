import { StyleSheet, Text, TextInput, View } from "react-native";

const Parameter = function({ parameter, values, index, setValues }) {
    const setVal = function(value) {
        let val = values;
        val[index].parameter_id = parameter.id;
        val[index].data_value = value;
        setValues(val);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{parameter.title} ({parameter.unit})</Text>
            <TextInput defaultValue={values[index].value} onChangeText={newValue => setVal(newValue)} style={styles.textInput} inputMode="numeric"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5
    },

    text: {
        fontWeight: "bold",
        marginBottom: 5
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