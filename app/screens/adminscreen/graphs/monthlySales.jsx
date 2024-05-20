import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { BarChart } from "react-native-gifted-charts";
import { fetchMonthlyData } from '../../../services/api';

// Get the screen's height
const screenHeight = Dimensions.get('window').height;

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
                const currentYearData = response.month_chart.filter(item => {
                    const year = new Date(item.date).getFullYear();
                    return year === currentDate.getFullYear();
                });
                setMonthChart(currentYearData);
            } else {
                console.error('Failed to fetch data:', response.message)
            }
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
    }

    const colors = ['#D8BFD8', '#BC8F8F', '#9ACD32', '#FFD700', '#ADD8E6'];
    
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
                <View style={styles.chartContainer}>
                    {Array.isArray(chartData) && chartData.length > 0 && (
                        <BarChart
                            barWidth={22}
                            noOfSections={3}
                            barBorderRadius={4}
                            data={chartData.map((item, index) => ({ value: item.amt, label: formatMonth(item.date),  frontColor: colors[index % colors.length] }))}
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
      height: screenHeight * 0.425,
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
    chartContainer: {
        flex: 1, // Make the chart container flexible to take up remaining space
        justifyContent: 'center', // Center the chart vertically
    }
});
