import React from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/homescreen/home';
import CustomersScreen from '../screens/customerscreen/customersScreen';
import PaymentsScreen from '../screens/paymentscreen/paymentScreen';
import FarmersScreen from '../screens/farmerscreen/farmersScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="New Order" component={Home}/>
        <Drawer.Screen name="Customers" component={CustomersScreen}/>
        <Drawer.Screen name="Payments" component={PaymentsScreen}/>
        <Drawer.Screen name="Farmers" component={FarmersScreen}/>
      </Drawer.Navigator>
    )
  
}
