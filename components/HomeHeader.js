import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

const HomeHeader = function({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Darevis</Text>
            </View>
            <View style={styles.buttonsView}>
                <IconButton onPress={() => navigation.push("new record")} name={ "plus-circle" } iconStyle={styles.circleIcon}/>
                <IconButton onPress={() => navigation.push("about")} name={ "question-circle" } iconStyle={styles.circleIcon}/>
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
        flex: 3
    },

    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#00ffff"
    },

    buttonsView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    circleIcon: {
        fontSize: 25
    }
});

export default HomeHeader;