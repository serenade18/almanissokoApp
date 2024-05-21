import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchHomePage } from '../../../services/api';
import Colors from '../../../utils/Colors';

export default function Slider() {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalFarmers, setTotalFarmers] = useState(0);
    const [inhouseTransport, setInhouse] = useState(0);
    const [othersTransport, setOthersTransport] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchHomePage();
            if (response.error === false) {
                setTotalCustomers(response.customer);
                setTotalFarmers(response.farmer);
                setInhouse(response.inhouse_transport);
                setOthersTransport(response.others_transport);
            } else {
                console.error('Failed to fetch data', response.message);
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const sliderData = [
        { title: 'Customers', value: totalCustomers, icon: 'account-group' },
        { title: 'Farmers', value: totalFarmers, icon: 'tractor' },
        { title: 'Inhouse Transport', value: inhouseTransport, icon: 'truck' },
        { title: 'Other Transport', value: othersTransport, icon: 'truck-fast' },
    ];

    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Slider</Text> */}
            <FlatList
                data={sliderData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Icon name={item.icon} size={65} color={Colors.PURPLE} style={styles.icon} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemValue}>{item.value}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Aleo-medium',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginRight: 20,
        width: 270
    },
    icon: {
        marginRight: 10,
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    itemTitle: {
        fontSize: 18,
        fontFamily: 'Aleo-medium',
        flex: 1,
    },
    itemValue: {
        fontSize: 18,
        fontFamily: 'Aleo-bold',
        color: Colors.PRIMARY
    },
});
