import { StyleSheet, Text, View } from "react-native";

const EntryNotFound = function() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Data not found</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 10,
        paddingEnd: 25
    },

    text: {
        color: "gray"
    }
});

export default EntryNotFound;