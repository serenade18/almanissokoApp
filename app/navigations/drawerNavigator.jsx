import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, Alert, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Home from '../screens/homescreen/home';
import CustomersScreen from '../screens/customerscreen/customersScreen';
import PaymentsScreen from '../screens/paymentscreen/paymentScreen';
import FarmersScreen from '../screens/farmerscreen/farmersScreen';
import Dashboard from '../screens/adminscreen/dashboard';
import { useAuth } from '../services/authProvider';
import Colors from '../utils/Colors';
import Logo from '../../assets/images/logo/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import InvoicesScreen from '../screens/homescreen/invoicescreen/invoicesScreen';
import DeliveryNoteScreen from '../screens/homescreen/deliveryscreen/deliveryNoteScreen';
import OrdersScreen from '../screens/homescreen/ordersScreen/ordersScreen'
import { Ionicons, MaterialIcons, Entypo, FontAwesome, FontAwesome5, FontAwesome6, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { setUser } = useAuth();
  const { user } = useAuth();

   // Conditionally set marginTop based on user type
   const bottomDrawerMarginTop = user && user.user_type === 'admin' ? 270 : 370;

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Logging out will require you to sign back in. Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            AsyncStorage.removeItem('token').then(() => {
              setUser(null);
            });
          } 
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <SafeAreaView style={styles.drawerHeader}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </SafeAreaView>
      <DrawerItemList {...props} />
      <View style={[styles.bottomDrawerSection, { marginTop: bottomDrawerMarginTop }]}>
        <DrawerItem
          label="Log out"
          onPress={handleLogout}
          icon={({ color, size }) => (
            <FontAwesome name="sign-out" size={size} color='white' />
          )}
          labelStyle={styles.drawerItemLabel}
        /> 
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <FontAwesome5 name="users-cog" size={18} color='white' />
          )}
          labelStyle={styles.drawerItemLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
}


export default function DrawerNavigator() {
  const { user } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.PRIMARY, // Primary color
          width: 240,
        },
        drawerActiveTintColor: Colors.GREY,
        drawerInactiveTintColor: '#dddddd',
        drawerActiveBackgroundColor: Colors.SIDEBARACTIVE,
        overlayColor: 'rgba(0, 0, 0, 0.5)', // Darken the outside of the drawer
        headerShown: false,
      }}
    >
    {user && user.user_type === 'admin' && (
      <Drawer.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="space-dashboard" size={size} color={color} />
          ),
        }}
      />
    )}
      <Drawer.Screen 
        name="New Orders" 
        component={Home} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="cart-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="opencart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Customers" 
        component={CustomersScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="users" size={size} color={color} />
          ),
        }}
      />
    {user && user.user_type === 'admin' && (
      <Drawer.Screen 
        name="Payments" 
        component={PaymentsScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hand-coin" size={size} color={color} />
          ),
        }}
      />
    )}
      <Drawer.Screen 
        name="Farmers" 
        component={FarmersScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="tractor" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Invoice" 
        component={InvoicesScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Delivery Note" 
        component={DeliveryNoteScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="delivery-dining" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginLeft: 10
  },
  drawerHeader: {
    height: 100,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'start',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
  },
  logo: {
    width: 150,
    height: 250, 
  },
  drawerItemLabel: {
    fontSize: 16,
    color: Colors.GREY
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: Colors.GRAY,
    borderTopWidth: 1,
  },
});
