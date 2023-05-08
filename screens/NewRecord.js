import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import NewRecordHeader from "../components/NewRecordHeader";

const NewRecord = function({ navigation }) {
    return (
        <View style={styles.container}>
            <NewRecordHeader navigation={navigation}/>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.titleText}>Title</Text>
                    <TextInput style={styles.titleTextInput}/>
                </View>
            </ScrollView>
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
        paddingVertical: 20
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
    }
});

export default NewRecord;