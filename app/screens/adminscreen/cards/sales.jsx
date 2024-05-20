import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../../utils/Colors';
import { useAuth } from '../../../services/authProvider';
import { fetchDashboard, fetchDiscount, fetchTotalPayments, fetchTotalKilos, fetchDebtors } from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Sales() {
    const [grossSales, setGrossSales] = useState(0);
    const [grossProfit, setGrossProfits] = useState(0);
    const [paidFarmers, setPaidFarmers] = useState(0);
    const [totalOverhead, setTotalOverhead] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalKilos, setTotalKilos] = useState(0);
    const [totalUnderPaid, setTotalUnderPaid] = useState(0);

    useEffect(() => {
        fetchData();
        fetchDiscount().then((response) => {
            setTotalDiscount(response.total_discount);
        });

        fetchTotalPayments().then((response) => {
            setTotalPayment(response.total_payments);
        });

        fetchTotalKilos().then((response) => {
            setTotalKilos(response.total_kgs);
        });

        fetchDebtors().then((response) => {
            setTotalUnderPaid(response.total_balance);
        });
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchDashboard();
            if (response.error === false) {
                // console.log('data fetched:', response);
                setGrossSales(response.buy_total);
                setGrossProfits(response.profit);
                setPaidFarmers(response.rice);
                setTotalOverhead(response.overhead);
            } else {
                console.error('Failed to fetch data:', response.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatCurrency = (amount) => {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    const salesData = [
        { title: 'Gross Sales', value: `Ksh ${formatCurrency(grossSales)}`, change: '+12.33%', icon: 'currency-usd' },
        { title: 'Gross Profit', value: `Ksh ${formatCurrency(grossProfit)}`, change: '+10.6%', icon: 'finance' },
        { title: 'Paid To Farmers', value: `Ksh ${formatCurrency(paidFarmers)}`, change: '+3%', icon: 'account-cash' },
        { title: 'Total Overheads', value: `Ksh ${formatCurrency(totalOverhead)}`, change: '+8%', icon: 'chart-bar' },
        { title: 'Total Discount', value: `Ksh ${formatCurrency(totalDiscount)}`, change: '+8%', icon: 'sale' },
        { title: 'Total Paid', value: `Ksh ${formatCurrency(totalPayment)}`, change: '+8%', icon: 'bank' },
        { title: 'Total Kilos', value: `${totalKilos} Kgs`, change: '+8%', icon: 'weight-kilogram' },
        { title: 'Balance', value: `Ksh ${formatCurrency(totalUnderPaid)}`, change: '-8%', icon: 'scale-balance' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cardsContainer}>
                {salesData.map((item, index) => (
                    <View key={index} style={styles.metricContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.iconBackground}>
                                <Icon name={item.icon} size={18} color={Colors.PURPLE} />
                            </View>
                            <Icon name="dots-horizontal" size={24} color={Colors.BLACK} style={styles.dotsIcon} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.metricTitle}>{item.title}</Text>
                            <Text style={styles.metricValue}>{item.value}</Text>
                            <Text style={[styles.metricChange, item.change.startsWith('+') ? styles.positive : styles.negative]}>
                                {item.change}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.GREY,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    metricContainer: {
        width: '48%',
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconBackground: {
        backgroundColor: Colors.GREEN,
        borderRadius: 10,
        padding: 5,
    },
    dotsIcon: {
        marginLeft: 'auto',
    },
    textContainer: {
        flex: 1,
    },
    metricTitle: {
        fontSize: 23,
        fontWeight: '900',
        color: Colors.BLACK,
        marginBottom: 5,
    },
    metricValue: {
        fontSize: 20,
        color: Colors.PRIMARY,
        marginBottom: 5,
        fontFamily: 'Aleo-bold'
    },
    metricChange: {
        fontSize: 16,
        marginTop: 4,
    },
    positive: {
        color: 'green',
    },
    negative: {
        color: 'red',
    },
});
