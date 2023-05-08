import { StyleSheet, Text, View } from "react-native";

const RecordNotFound = function() {
    return (
        <View style={styles.container}>
            <Text>Record not found</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 10
    }
});

export default RecordNotFound;