import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import NewRecordHeader from "../components/NewRecordHeader";
import StdButton from "../components/StdButton";
import { useState } from "react";
import NewParameter from "../components/NewParameter";

const NewRecord = function({ navigation }) {
    const [title, setTitle] = useState(null);

    const [parameters, setParameters] = useState([]);

    const [parametersView, setParametersView] = useState(null);

    const refreshParametersView = function() {
        setParametersView(parameters.map(
            (parameter, index) => <NewParameter key={index} index={index} parameters={parameters} setParameters={setParameters} removeParam={removeParam}/>
        ));
    };

    const removeParam = function(index) {
        let params = parameters;
        params.splice(index, 1);
        setParameters(params);
        refreshParametersView();
    };

    const onPressNP = function() {
        let params = parameters;
        params.push({ title: null, min: null, max: null, unit: null });
        setParameters(params);
        refreshParametersView();
    };

    const onPressCR = function() {
        let record = { title: title, creation_date: new Date().toLocaleDateString() };
        
        console.log("---------------------");
        console.log("RECORD:");
        console.log(record);
        console.log("PARAMETERS:");
        console.log(parameters);
        console.log("---------------------");
    };

    return (
        <View style={styles.container}>
            <NewRecordHeader navigation={navigation}/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Title</Text>
                    <TextInput defaultValue={title} onChangeText={newTitle => setTitle(newTitle)} style={styles.titleTextInput}/>
                </View>
                <View style={styles.parametersView}>
                    {parametersView}
                    <StdButton onPress={onPressNP} btnStyle={styles.npBtnStyle} txtStyle={styles.npTxtStyle} underlayColor={"#4062a7"}>New Parameter</StdButton>
                </View>
            </ScrollView>
            <View style={styles.crView}>
                <StdButton onPress={onPressCR} btnStyle={styles.crBtnStyle} txtStyle={styles.crTxtStyle} underlayColor={"#d1d14d"}>Create Record</StdButton>
            </View>
        </View>
    );
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

    titleView: {
        marginBottom: 10
    },

    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#000000"
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

    crView: {
        position: "relative",
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#dddddd"
    },

    crBtnStyle: {
        backgroundColor: "#e3e554"
    },

    crTxtStyle: {
        fontWeight: "bold",
        color: "#000000"
    }
});

export default NewRecord;