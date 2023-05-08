import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RecordItem = function({ record }) {
    const [pressed, setPressed] = useState(false);

    const onPress = function() {
        setPressed(true);
    };

    return (
        <Pressable onPressIn={onPress} onPressOut={() => setPressed(false)}>
            <View style={pressed ? [styles.container, styles.containerPressed] : styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{record["title"]}</Text>
                </View>
                <View style={styles.dateView}>
                    <Text style={styles.dateText}>{record["creation_date"]}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: "#c5c5c5",
        flex: 1,
        flexDirection: "row",
        paddingVertical: 17
    },

    containerPressed: {
        backgroundColor: "#dfdfdf"
    },

    titleView: {
        flex: 3,
        paddingHorizontal: 18
    },

    titleText: {
        fontWeight: "bold",
        fontSize: 15
    },

    dateView: {
        flex: 1,
        alignItems: "flex-end",
        paddingHorizontal: 18
    },

    dateText: {
        color: "gray"
    }
});

export default RecordItem;