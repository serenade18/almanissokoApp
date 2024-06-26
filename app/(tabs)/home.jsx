import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import { useAuth } from '../../lib/authProvider';
import { useRouter } from 'expo-router';
import Card from '../../components/Card'; // Make sure to import the Card component

export default function Home() {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();

  const data = [
    { title: 'New Orders', value: '0', change: '' },
    { title: 'Orders', value: '0', change: '' },
    { title: 'New Payments', value: '0', change: '' },
    { title: 'Payments', value: '0', change: '' },
    { title: 'New Customers', value: '0', change: '' },
    { title: 'Customers', value: '0', change: '' },
    { title: 'New Farmer', value: '0', change: '' },
    { title: 'Farmers', value: '0', change: '' },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.last_name || 'Guest'}
                </Text>
              </View>

              <View className="mt-1">
                <Image source={images.logoSmall} className="w-15 h-15" resizeMode="contain" />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-2">
            <Text className="text-lg font-pregular text-gray-100 mb-2">
                        Select Action
                    </Text>
            </View>
          </View>
        )}
        data={data}
        renderItem={({ item }) => <Card title={item.title} value={item.value} change={item.change} />}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}
