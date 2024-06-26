import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Card = ({ title, value, downloads, change, color }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.change}>{change}</Text>
      <Ionicons name="arrow-forward-circle" size={24} color="#FF9C01" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    width: '48%',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: '#1E1E2D'
  },
  change: {
    fontSize: 12,
    color: 'green',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 18,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  downloads: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 16,
  },
  icon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default Card;