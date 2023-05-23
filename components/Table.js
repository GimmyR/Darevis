import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const Row = function({ data, style, cellWidth, borderWidth, pressed, setPressed, identity }) {
    const onPress = function() {
        if(pressed != undefined) {
            for(var i = 0; i < pressed.length; i++) {
                pressed[i] = false;
                setPressed([...pressed]);
            }

            pressed[identity] = true;
            setPressed([...pressed]);
        }
    };

    return (
        <View style={pressed != undefined && pressed[identity] && { backgroundColor: "#cfcfcf" }}>
            <Pressable onPress={() => onPress()}>
                <View style={style}>
                    {data != undefined && data.map((value, index) => <Cell key={index} content={value} cellWidth={cellWidth} borderWidth={borderWidth}/>)}
                </View>
            </Pressable>
        </View>
    );
};

const Cell = function({ content, cellWidth, borderWidth }) {
    return (
        <View style={[styles.cell, { width: cellWidth, borderBottomWidth: borderWidth, borderEndWidth: borderWidth }]}>
            <Text style={styles.text}>{content}</Text>
        </View>
    );
};

const Table = function({ headers, rows, cellWidth, borderWidth }) {
    const [pressed, setPressed] = useState([]);

    const initPressed = function() {
        rows.forEach(row => {
            pressed.push(false)
            setPressed([...pressed]);
        });
    };

    useEffect(() => initPressed(), []);

    return (
        <ScrollView style={styles.scrollView} horizontal={true}>
            <View style={[styles.container, { borderTopWidth: borderWidth, borderStartWidth: borderWidth }]}>
                <Row data={headers} style={styles.header} cellWidth={cellWidth} borderWidth={borderWidth}/>
                {rows != undefined && rows.map((row, index) => 
                    <Row key={index} data={row} style={styles.row} cellWidth={cellWidth} borderWidth={borderWidth} pressed={pressed} setPressed={setPressed} identity={index}/>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {},

    container: {},
    
    header: {
        flexDirection: "row"
    },

    row: {
        flexDirection: "row"
    },

    cell: {
        paddingHorizontal: 10,
        justifyContent: "center"
    },

    text: {}
});

export default Table;