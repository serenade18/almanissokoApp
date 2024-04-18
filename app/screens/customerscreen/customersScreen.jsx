import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/mainheader/header'
import { useAuth } from '../../services/authProvider';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';

export default function CustomersScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleNewCustomer = () => {
    navigation.navigate('AddCustomer'); // Navigate to the login screen
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header pageTitle="Customers" firstName={user.first_name} lastName={user.last_name} />
        <View style={styles.customer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleNewCustomer}
          >
            <Entypo name="add-user" size={38} color={Colors.PRIMARY} />
            <Text style={styles.text}>
              New Customer
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  customer: {
    marginTop: -200, 
    marginBottom: 20,
    paddingLeft: 20,
  },
  clearButton: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.TRANSPARENT,
    borderRadius: 99,
    marginTop: 10,
    borderColor: Colors.WHITE,
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    padding: 15
  },
});
