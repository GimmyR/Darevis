import { ScrollView, StyleSheet, Text, View } from "react-native";
import NewEntryHeader from "../components/NewEntryHeader";
import { useState } from "react";

const NewEntry = function({ navigation, route }) {
    const [record, setRecord] = useState(route.params.record);

    return (
        <View style={styles.container}>
            <NewEntryHeader record={record} navigation={navigation}/>
            <ScrollView>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    }
});

export default NewEntry;