import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

const NewEntryHeader = function({ record, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonView}>
                <IconButton onPress={() => navigation.push("record", { record: record.id })} name={ "arrow-left" } iconStyle={styles.icon}/>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>New Entry</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    },

    titleView: {
        flex: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingEnd: 50
    },

    title: {
        fontWeight: "bold",
        fontSize: 20
    },

    buttonView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    icon: {
        fontSize: 18
    }
});

export default NewEntryHeader;