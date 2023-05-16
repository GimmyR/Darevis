import { StyleSheet, Text, TextInput, View } from "react-native";

const TimeInput = function({ time, setTime, setIsValid }) {
    const hms = time.split(":");

    const setHour = function(value) {
        var nb = parseInt(value);
        if(0 <= nb && nb <= 23) {
            setIsValid(true);
            setTime(0, nb);
        } else setIsValid(false);
    };

    const setMinute = function(value) {
        var nb = parseInt(value);
        if(0 <= nb && nb <= 59) {
            setIsValid(true);
            setTime(1, nb);
        } else setIsValid(false);
    };

    const setSecond = function(value) {
        var nb = parseInt(value);
        if(0 <= nb && nb <= 59) {
            setIsValid(true);
            setTime(2, nb);
        } else setIsValid(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.hourView}>
                <TextInput defaultValue={parseInt(hms[0]) + ""} onChangeText={newValue => setHour(newValue)} style={styles.hourInput} inputMode="numeric"/>
                <Text style={styles.descText}>hour</Text>
            </View>
            <View style={styles.minuteView}>
                <TextInput defaultValue={parseInt(hms[1]) + ""} onChangeText={newValue => setMinute(newValue)} style={styles.minuteInput} inputMode="numeric"/>
                <Text style={styles.descText}>minute</Text>
            </View>
            <View style={styles.secondView}>
                <TextInput defaultValue={parseInt(hms[2]) + ""} onChangeText={newValue => setSecond(newValue)} style={styles.secondInput} inputMode="numeric"/>
                <Text style={styles.descText}>second</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    hourView: {
        flex: 1
    },

    hourInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    minuteView: {
        flex: 1,
        paddingStart: 5
    },

    minuteInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    secondView: {
        flex: 1,
        paddingStart: 5
    },

    secondInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    descText: {
        fontSize: 11,
        color: "gray",
        marginStart: 10
    }
});

export default TimeInput;