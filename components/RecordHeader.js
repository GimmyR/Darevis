import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

const RecordHeader = function({ record, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsViewLeft}>
                <IconButton onPress={() => navigation.push("home")} name={ "arrow-left" } iconStyle={styles.icon}/>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>{record.title}</Text>
            </View>
            <View style={styles.buttonsViewRight}>
                <IconButton onPress={() => navigation.push("new entry", { record: record })} name={ "plus-circle" } iconStyle={styles.circleIcon}/>
                <IconButton name={ "cog" } iconStyle={styles.circleIcon}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingStart: 15,
        paddingEnd: 8,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    },

    titleView: {
        flex: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    title: {
        fontWeight: "bold",
        fontSize: 20
    },

    buttonsViewLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    buttonsViewRight: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center"
    },

    circleIcon: {
        fontSize: 25
    },

    icon: {
        fontSize: 18
    }
});

export default RecordHeader;