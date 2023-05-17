import { StyleSheet, Text, TextInput, View } from "react-native";

const DateInput = function({ date, setDate, setIsValid }) {
    const dmy = date.split("/");

    const setDay = function(day) {
        var nb = parseInt(day);
        if(nb >= 1 && nb <= 31) {
            setIsValid(true);
            setDate(0, nb);
        } else setIsValid(false);
    };

    const setMonth = function(month) {
        var nb = parseInt(month);
        if(nb >= 1 && nb <= 12) {
            setIsValid(true);
            setDate(1, nb);
        } else setIsValid(false);
    };

    const setYear = function(year) {
        var nb = parseInt(year);
        if(nb >= 0) {
            setIsValid(true);
            setDate(2, nb);
        } else setIsValid(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dayView}>
                <TextInput defaultValue={parseInt(dmy[0]) + ""} onChangeText={day => setDay(day)} style={styles.dayInput} inputMode="numeric"/>
                <Text style={styles.descText}>day</Text>
            </View>
            <View style={styles.monthView}>
                <TextInput defaultValue={parseInt(dmy[1]) + ""} onChangeText={month => setMonth(month)} style={styles.monthInput} inputMode="numeric"/>
                <Text style={styles.descText}>month</Text>
            </View>
            <View style={styles.yearView}>
                <TextInput defaultValue={parseInt(dmy[2]) + ""} onChangeText={year => setYear(year)} style={styles.yearInput} inputMode="numeric"/>
                <Text style={styles.descText}>year</Text>
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

    dayView: {
        flex: 1
    },

    dayInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    monthView: {
        flex: 1,
        paddingStart: 5
    },

    monthInput: {
        borderRadius: 3,
        backgroundColor: "#e2e2e2",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    yearView: {
        flex: 1,
        paddingStart: 5
    },

    yearInput: {
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

export default DateInput;