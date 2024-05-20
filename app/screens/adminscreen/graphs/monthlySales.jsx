import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
// import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";


const data = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
]

export default function MonthlySales() {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Monthly Sales</Text>
                    <Text style={styles.date}>
                    <AntDesign name="calendar" size={24} color="black" /> {currentDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </Text>
                </View>
                <View>
                    <BarChart 
                        barWidth={22}
                        noOfSections={4}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data = {data} 
                        yAxisThickness={0}
                        xAxisThickness={0}
                        isAnimated
                        showFractionalValue
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.GREY,
    },
    formContainer: {
      width: '92%',
      backgroundColor: Colors.WHITE,
      alignSelf: 'center',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Shadow for Android
      marginTop: 5,
      marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        fontWeight: '900',
        color: Colors.BLACK,
        marginBottom: 5,
    },
    date: {
        fontSize: 20,
        fontWeight: '900',
    },
});