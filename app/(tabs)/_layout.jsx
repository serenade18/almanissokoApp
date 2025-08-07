
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from "../../constants";
import { useAuth } from '../../lib/authProvider';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color }}
      />
      <Text
        style={{
          color,
          fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Logging out will require you to sign back in. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK", onPress: () => {
            AsyncStorage.removeItem('token').then(() => {
              setUser(null);
              router.replace('/');
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        if (route.name !== "home" && route.name !== "profile") return null;

        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === "profile") {
            handleLogout();
            return;
          }
          navigation.navigate(route.name);
        };

        const color = isFocused ? "#FFA001" : "#CDCDE0";
        const icon = route.name === "home" ? icons.home : icons.logout;
        const alignStyle = route.name === "home" ? styles.leftTab : styles.rightTab;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabItem, alignStyle]}
          >
            <TabIcon icon={icon} color={color} name={label} focused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Exit" }} />
      <Tabs.Screen name="order/orders" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="order/orderdetails" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="payment/payments" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="payment/paymentdetails" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="customer/customers" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="customer/customerdetails" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="farmer/farmers" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="farmer/farmerdetails" options={{ tabBarButton: () => null }} />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: "#161622",
    borderTopWidth: 1,
    borderTopColor: "#232533",
    height: 64,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  leftTab: {
    alignSelf: 'flex-start',
  },
  rightTab: {
    alignSelf: 'flex-end',
  },
});
