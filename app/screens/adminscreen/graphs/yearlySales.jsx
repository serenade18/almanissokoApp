import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
// import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { fetchMonthlyData } from '../../../services/api';

export default function MonthlySales() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [chartData, setMonthChart] = useState(null);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetchMonthlyData();
            if (response.error === false) {
                const currentYearData = response.month_chart;
                setMonthChart(currentYearData);
            } else {
                console.error('Failed to fetch data:', response.message)
            }
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
    }

    const randomColor = () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    const formatMonth = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${monthNames[monthIndex]} ${year}`;
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Monthly Sales</Text>
                    <Text style={styles.date}>
                        <AntDesign name="calendar" size={24} color="black" /> {currentDate.toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                        })}
                    </Text>
                </View>
                <View>
                    {Array.isArray(chartData) && chartData.length > 0 && (
                        <BarChart
                            barWidth={22}
                            noOfSections={3}
                            barBorderRadius={4}
                            frontColor="lightgray"
                            data={chartData.map(item => ({ value: item.amt, label: formatMonth(item.date),  frontColor: randomColor() }))}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            isAnimated
                            showFractionalValue
                            valueRender={(value) => `${value} KSH`}
                        />
                    )}
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