import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../utils/Colors'
import { fetchCustomerRegion, fetchHomePage } from '../../../services/api';
import { PieChart } from "react-native-gifted-charts";

// Get the screen's height
const screenHeight = Dimensions.get('window').height;



export default function CustomerLocation() {
    const [nairobiCount, setNairobiCount] = useState(0);
    const [centralCount, setCentralCount] = useState(0);
    const [nyanzaCount, setNyanzaCount] = useState(0);
    const [westernCount, setWesternCount] = useState(0);
    const [coastCount, setCoastCount] = useState(0);
    const [easternCount, setEasternCount] = useState(0);
    const [northEasternCount, setNorthEasternCount] = useState(0);
    const [riftValleyCount, setRiftValleyCount] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        fetchData();
        fetchHomePage().then((response) => {
            setTotalCustomers(response.customer);
        });
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchCustomerRegion();
            if (response.error === false) {
                console.log("fetched data", response);
                setNairobiCount(response.nairobi);
                setCentralCount(response.central);
                setNyanzaCount(response.nyanza);
                setCoastCount(response.coast);
                setWesternCount(response.western);
                setEasternCount(response.eastern);
                setNorthEasternCount(response.north_eastern);
                setRiftValleyCount(response.rift_valley);
            } else {
                console.error('Failed to fetch data', response.message);
            }
        } catch (error) {
            console.error("Something went wrong", error);
        }
    };

    const locationData = [
        { province: 'Nairobi', value: nairobiCount, color: '#009FFF', gradientCenterColor: '#006DFF'},
        { province: 'Central', value: centralCount, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { province: 'Eastern', value: easternCount, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { province: 'Rift Valley', value: riftValleyCount, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
        { province: 'Coast', value: coastCount, color: '#D8BFD8', gradientCenterColor: '#006DFF' },
        { province: 'Nyanza', value: nyanzaCount, color: '#BC8F8F', gradientCenterColor: '#FFD700' },
        { province: 'Western', value: westernCount, color: '#9ACD32', gradientCenterColor: '#8F80F3' },
        { province: 'North Eastern', value: northEasternCount, color: '#FFD700',gradientCenterColor: '#8F80F3' },
    ];

    const renderLegendComponent = () => {
        return (
            <View style={styles.legendContainer}>
                {locationData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.province} : {item.value}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const colors = ['#D8BFD8', '#BC8F8F', '#9ACD32', '#FFD700', '#ADD8E6'];

    const renderDot = color => {
        return (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: color,
              marginRight: 10,
            }}
          />
        );
    };

    const tableRows = [];
    for (let i = 0; i < locationData.length; i += 2) {
        tableRows.push(
            <View key={i} style={styles.row}>
                <View style={styles.cell}>
                    <Text style={styles.text}>{locationData[i].province}: {locationData[i].value}</Text>
                </View>
                {locationData[i + 1] && (
                    <View style={styles.cell}>
                        <Text style={styles.text}>{locationData[i + 1].province}: {locationData[i + 1].value}</Text>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Customer Per region</Text>
                </View>
                <View style={styles.chartContainer}>
                <PieChart
                    data={locationData}
                    donut
                    radius={170}
                    isAnimated
                    sectionAutoFocus
                    innerRadius={110}
                    showValuesAsLabels={true}
                    showText
                    textSize={14}
                    showTextBackground={false}
                    centerLabelComponent={() => (
                        <View style={styles.centerLabelContainer}>
                            <Text style={styles.centerLabelText}>{totalCustomers}</Text>
                            <Text style={styles.centerLabelSubtext}>Total Customers</Text>
                        </View>
                    )}
                />
                {renderLegendComponent()}
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
      marginTop: 0,
      marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 23,
        fontWeight: '900',
        color: Colors.BLACK,
        marginBottom: 10,
    },
    chartContainer: {
        flex: 1, // Make the chart container flexible to take up remaining space
        justifyContent: 'center', // Center the chart vertically
        alignItems: 'center',
        marginTop: 10
    },
    tableContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cell: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 2,
        alignItems: 'start',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    centerLabelContainer: {
        alignItems: 'center',
    },
    centerLabelText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    centerLabelSubtext: {
        fontSize: 14,
        color: Colors.GRAY,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendText: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: 'Aleo-bold'
    }
})