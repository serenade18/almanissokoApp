import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// Utility function to format numbers
const formatNumber = (num) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

const Banner = ({ kgs }) => {
    const formattedKgs = formatNumber(kgs);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Today Kilos</Text>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Kgs {formattedKgs}</Text>
                <TouchableOpacity style={styles.iconContainer}>
                <Image
                    className="w-6 h-6"
                    resizeMode="contain"
                />
                </TouchableOpacity>
            </View>
            <Text style={styles.footerText}>Today Sold: KGS {formattedKgs}</Text>
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2D',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 8,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    marginLeft: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
  },
});
