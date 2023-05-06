import { ScrollView, StyleSheet, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import RecordItem from "../components/RecordItem";

const records = [
    { title: "Record n*1", creationDate: "12/01/2023" },
    { title: "Record n*2", creationDate: "11/03/2023" },
    { title: "Record n*3", creationDate: "10/05/2023" },
    { title: "Record n*4", creationDate: "09/07/2023" },
    { title: "Record n*5", creationDate: "08/09/2023" },
    { title: "Record n*6", creationDate: "07/11/2023" },
    { title: "Record n*7", creationDate: "06/02/2023" },
    { title: "Record n*8", creationDate: "05/04/2023" },
    { title: "Record n*9", creationDate: "04/06/2023" },
    { title: "Record n*10", creationDate: "03/08/2023" },
];

const Home = function() {
    return (
        <View style={styles.container}>
            <HomeHeader/>
            <ScrollView style={styles.scrollView}>
                {records.map(record => <RecordItem record={record}/>)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#bababa",
        flex: 1,
        paddingTop: 32
    },

    scrollView: {
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

export default Home;