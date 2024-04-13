import React from 'react';
import { View, StyleSheet } from 'react-native';

const Skeleton = () => {
  return (
    <View style={styles.skeleton} />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: 200,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default Skeleton;
