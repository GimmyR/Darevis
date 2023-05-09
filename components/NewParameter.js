import { StyleSheet, Text, TextInput, View } from "react-native";
import StdButton from "./StdButton";

const NewParameter = function({ index, parameters, setParameters, removeParam }) {
    const setTitle = function(title) {
        let params = parameters;
        params[index].title = title;
        setParameters(params);
    };

    const setMin = function(min) {
        let params = parameters;
        params[index].min = min;
        setParameters(params);
    };

    const setMax = function(max) {
        let params = parameters;
        params[index].max = max;
        setParameters(params);
    };

    const setUnit = function(unit) {
        let params = parameters;
        params[index].unit = unit;
        setParameters(params);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <TextInput defaultValue={parameters[index].title} onChangeText={newTitle => setTitle(newTitle)} style={styles.textInput} inputMode="text"/>

            <Text style={styles.text}>Minimum</Text>
            <TextInput defaultValue={parameters[index].min} onChangeText={newMin => setMin(newMin)} style={styles.textInput} inputMode="numeric"/>

            <Text style={styles.text}>Maximum</Text>
            <TextInput defaultValue={parameters[index].max} onChangeText={newMax => setMax(newMax)} style={styles.textInput} inputMode="numeric"/>

            <Text style={styles.text}>Unit</Text>
            <TextInput defaultValue={parameters[index].unit} onChangeText={newUnit => setUnit(newUnit)} style={styles.textInput} inputMode="text"/>

            <StdButton onPress={() => removeParam(index)} btnStyle={styles.rpBtnStyle} txtStyle={styles.rpTxtStyle} underlayColor={"#bc0003"}>Remove Parameter</StdButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 15
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
    },

    rpBtnStyle: {
        backgroundColor: "#da0004",
        marginTop: 10
    },

    rpTxtStyle: {
        fontSize: 13,
        color: "#ffffff"
    }
});

export default NewParameter;