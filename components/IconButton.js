import { Pressable, StyleSheet, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

const IconButton = function({ name, onPress, iconStyle }) {
    const [pressed, setPressed] = useState(false);

    return (
        <Pressable onPress={onPress} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} style={styles.pressable}>
            <FontAwesome5 name={name} style={pressed ? [iconStyle, {color: "blue"}] : iconStyle} solid/>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        alignItems: "center"
    }
});

export default IconButton;