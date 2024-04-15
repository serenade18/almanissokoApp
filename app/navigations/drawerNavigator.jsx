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

const Drawer = createDrawerNavigator();

// Custom Drawer Content
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props} style={styles.drawerContent}>
//       <SafeAreaView style={styles.drawerHeader}>
//         <Image
//           source={Logo} // Replace '../assets/logo.png' with the path to your logo image
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </SafeAreaView>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Log out"
//         onPress={() => alert('Loging out will require you to sign back in. Are you sure')}
//         labelStyle={styles.drawerItemLabel}
//       />
//     </DrawerContentScrollView>
//   );
// }

function CustomDrawerContent(props) {
  const { user, setUser } = useAuth(); // Assuming useAuth also provides a setUser method
  const navigation = props.navigation; // Get navigation from props

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
            // Assuming you have a method to remove the token
            AsyncStorage.removeItem('token').then(() => {
              setUser(null); // Update the auth context to reflect logged out state
              navigation.navigate('Start'); // Redirect to Start screen
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
      <DrawerItem
        label="Log out"
        onPress={handleLogout}
        labelStyle={styles.drawerItemLabel}
      />
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
        headerShown: true,
      }}
    >
    {user && user.user_type === 'admin' && (
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    )}
      <Drawer.Screen name="New Orders" component={Home} />
      <Drawer.Screen name="Customers" component={CustomersScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Farmers" component={FarmersScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
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
});
