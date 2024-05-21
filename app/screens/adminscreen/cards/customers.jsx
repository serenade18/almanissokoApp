import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../utils/Colors';
import { fetchCustomerRegion } from '../../../services/api';

export default function Customers() {
    const [nairobiCount, setNairobiCount] = useState(0);
    const [centralCount, setCentralCount] = useState(0);
    const [nyanzaCount, setNyanzaCount] = useState(0);
    const [westernCount, setWesternCount] = useState(0);
    const [coastCount, setCoastCount] = useState(0);
    const [easternCount, setEasternCount] = useState(0);
    const [northEasternCount, setNorthEasternCount] = useState(0);
    const [riftValleyCount, setRiftValleyCount] = useState(0);

    useEffect(() => {
        fetchData();
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
        { province: 'Nairobi', value: nairobiCount },
        { province: 'Central', value: centralCount },
        { province: 'Eastern', value: easternCount },
        { province: 'Rift Valley', value: riftValleyCount },
        { province: 'Coast', value: coastCount },
        { province: 'Nyanza', value: nyanzaCount },
        { province: 'Western', value: westernCount },
        { province: 'North Eastern', value: northEasternCount },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Customers Per Region</Text>
                {locationData.map((item, index) => (
                    <View key={index} style={styles.provinceContainer}>
                        <Text style={styles.provinceTitle}>{item.province}</Text>
                        <Text style={[
                            styles.provinceValue,
                            { color: item.value < 10 ? Colors.RED : Colors.SUCCESS }
                        ]}>
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
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
        elevation: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.BLACK,
        marginBottom: 15,
        fontFamily: 'Aleo-bold'
    },
    provinceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.GREY,
        paddingVertical: 5,
    },
    provinceTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.BLACK,
        marginBottom: 15,
    },
    provinceValue: {
        fontSize: 18,
        fontFamily: 'Aleo-medium',
        marginBottom: 15,
    },
});
