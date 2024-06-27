import { View, Text, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Alert } from 'react-native';
import { Tabs, Redirect, useRouter } from 'expo-router'
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons } from "../../constants";
import { useAuth } from '../../lib/authProvider';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};


const TabsLayout = () => {
  const { setUser } = useAuth();
  const router = useRouter();

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
              router.replace('/');;
            });
          } 
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen 
          name='home'
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault(); // Prevent default behavior of switching tabs
              handleLogout(); // Call your logout function instead
            },
          })}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.logout}
                color={color}
                name="Exit"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="order/orders"
          options={{
            title: 'Orders',
            headerShown: false,
            tabBarButton: () => null, 
          }}
        />
        <Tabs.Screen
          name="payment/payments"
          options={{
            title: 'Payments',
            headerShown: false,
            tabBarButton: () => null, 
          }}
        />
        <Tabs.Screen
          name="customer/customers"
          options={{
            title: 'Customers',
            headerShown: false,
            tabBarButton: () => null, 
          }}
        />
        <Tabs.Screen
          name="farmer/farmers"
          options={{
            title: 'Farmers',
            headerShown: false,
            tabBarButton: () => null, 
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout;