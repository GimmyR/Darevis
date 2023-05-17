import { ScrollView, StyleSheet, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import RecordItem from "../components/RecordItem";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import RecordNotFound from "../components/RecordNotFound";

const Home = function({ navigation }) {
    const db = SQLite.openDatabase("darevis");
    
    const [records, setRecords] = useState([]);

    const selectRecords = function() {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Record", null,
                (txObj, resultSet) => setRecords(resultSet.rows._array), 
                (txObj, error) => console.log(error)
            );
        });
    };

    const navigateTo = function(record) {
        navigation.push("record", { record: record.id });
    };

    useEffect(() => selectRecords(), []);

    return (
        <View style={styles.container}>
            <HomeHeader navigation={navigation}/>
            <ScrollView>
                {records.length == 0 && <RecordNotFound/>}
                {records.map(
                    record => <RecordItem onPress={() => navigateTo(record)} key={record["id"]} record={record}/>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    }
});

export default Home;