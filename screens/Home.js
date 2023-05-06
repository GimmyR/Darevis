import { ScrollView, StyleSheet, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import RecordItem from "../components/RecordItem";

const records = [
    { id: 1,    title: "Record n*1",    creationDate: "12/01/2023" },
    { id: 2,    title: "Record n*2",    creationDate: "11/03/2023" },
    { id: 3,    title: "Record n*3",    creationDate: "10/05/2023" },
    { id: 4,    title: "Record n*4",    creationDate: "09/07/2023" },
    { id: 5,    title: "Record n*5",    creationDate: "08/09/2023" },
    { id: 6,    title: "Record n*6",    creationDate: "07/11/2023" },
    { id: 7,    title: "Record n*7",    creationDate: "06/02/2023" },
    { id: 8,    title: "Record n*8",    creationDate: "05/04/2023" },
    { id: 9,    title: "Record n*9",    creationDate: "04/06/2023" },
    { id: 10,   title: "Record n*10",   creationDate: "03/08/2023" },
    { id: 11,   title: "Record n*11",   creationDate: "02/10/2023" },
    { id: 12,   title: "Record n*12",   creationDate: "01/12/2023" },
    { id: 13,   title: "Record n*13",   creationDate: "13/01/2023" },
    { id: 14,   title: "Record n*14",   creationDate: "14/02/2023" },
    { id: 15,   title: "Record n*15",   creationDate: "15/03/2023" },
];

const Home = function() {
    return (
        <View style={styles.container}>
            <HomeHeader/>
            <ScrollView style={styles.scrollView}>
                {records.map(record => <RecordItem key={record.id} record={record}/>)}
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
        
    }
});

export default Home;