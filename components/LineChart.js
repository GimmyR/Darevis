import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Circle, Line, Svg } from "react-native-svg";

const LineChart = function({ data, min, max, style }) {
    const scale = 50;
    const calculateY = function(index) {
        if(min == undefined) {

            let tab = [];
            data.forEach(d => tab.push(d.y));
            min = Math.floor(Math.min(...tab));

        } if(max == undefined) {

            let tab = [];
            data.forEach(d => tab.push(d.y));
            max = Math.ceil(Math.max(...tab));

        } var nb = (style.height * (data[index].y - min)) / (max - min);

        return style.height - nb;
    };

    return (
        <ScrollView style={[ styles.container, style ]} horizontal={true}>
            <Svg width={(data.length - 1) * scale + 10} height={style.height}>
                {data.map((point, index) => index + 1 < data.length && <Line key={index} x1={index * scale} y1={calculateY(index)} x2={(index + 1) * scale} y2={calculateY(index + 1)} stroke={"red"} strokeWidth={3}/>)}
                {data.map((point, index) => <Circle key={index} cx={index * scale} cy={calculateY(index)} r={5} fill={"red"}/>)}
            </Svg>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1
    }
});

export default LineChart;