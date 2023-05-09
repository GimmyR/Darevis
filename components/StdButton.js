import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const StdButton = function({ onPress, btnStyle, txtStyle, underlayColor, children }) {
    return (
        <TouchableHighlight onPress={onPress} style={[styles.container, btnStyle]} underlayColor={underlayColor}>
            <View style={styles.button}>
                <Text style={txtStyle}>{children}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        paddingVertical: 10
    },

    button: {
        alignItems: "center"
    }
});

export default StdButton;