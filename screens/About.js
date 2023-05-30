import { StyleSheet, Text, View } from "react-native";
import AboutHeader from "../components/AboutHeader";

const About = function({ navigation }) {
    return (
        <View style={styles.container}>
            <AboutHeader navigation={navigation}/>
            <View style={styles.infoView}>
                <View style={styles.descView}>
                    <Text style={styles.desc}>Data Record &</Text>
                    <Text style={styles.desc}>Visualization</Text>
                </View>
                <View style={styles.logoView}>

                </View>
                <View style={styles.developedByView}>
                    <Text style={styles.developedBy}>Developed by</Text>
                    <Text style={styles.developer}>Gimmy Razafimbelo</Text>
                </View>
                <View style={styles.versionView}>
                    <Text style={styles.version}>Version </Text>
                    <Text style={styles.vNumber}>0.1.0</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#ffffff"
    },

    infoView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },

    descView: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },

    desc: {
        fontWeight: "bold",
        color: "#818181"
    },

    logoView: {
        width: 150,
        height: 150,
        backgroundColor: "#efefef"
    },

    developedByView: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20
    },

    developedBy: {
        color: "#5e5e5e"
    },

    developer: {
        fontWeight: "bold",
        color: "#585858"
    },

    versionView: {
        position: "absolute",
        bottom: 15,
        flexDirection: "row",
        alignItems: "center"
    },

    version: {
        color: "#5e5e5e"
    },

    vNumber: {
        fontWeight: "bold"
    }
});

export default About;