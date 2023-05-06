import { StyleSheet, Text, View } from "react-native";

const RecordItem = function({ record }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text>{record.title}</Text>
            </View>
            <View style={styles.dateView}>
                <Text style={styles.dateText}>{record.creationDate}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },

    titleView: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        paddingTop: 7
    },

    dateView: {
        paddingVertical: 10
    },

    dateText: {
        color: "gray"
    }
});

export default RecordItem;