import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

const HomeHeader = function() {
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Darevis</Text>
            </View>
            <View style={styles.buttonsView}>
                <IconButton name={ "plus-circle" } iconStyle={styles.circleIcon}/>
                <IconButton name={ "question-circle" } iconStyle={styles.circleIcon}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        paddingStart: 15,
        paddingEnd: 8,
        paddingVertical: 5
    },

    titleView: {
        flex: 3
    },

    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "blue"
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