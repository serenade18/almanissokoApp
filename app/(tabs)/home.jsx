import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import { useAuth } from '../../lib/authProvider';
import { useRouter } from 'expo-router';
import Card from '../../components/Card'; // Make sure to import the Card component
import NewOdersModal from '../../components/NewOdersModal';
import NewPaymentsModal from '../../components/NewPaymentModal';
import NewCustomersModal from '../../components/NewCustomerModal';
import NewFarmerModal from '../../components/NewFarmerModal';

export default function Home() {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();
  const [showOrderModal, setShowOrderModal] = useState(false); // State for modal visibility
  const [showPaymentModal, setShowPaymentModal] = useState(false); 
  const [showFarmerModal, setShowFarmerModal] = useState(false); 
  const [showCustomerModal, setShowCustomerModal] = useState(false); 

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

//   const handleCardPress = (title) => {
//     if (title === 'New Orders') {
//       setShowOrderModal(true); // Show modal when "New Orders" is pressed
//     }
//     if (title === 'New Payments') {
//         setShowPaymentModal(true); // Show modal when "New Orders" is pressed
//     }
//     if (title === 'New Customers') {
//         setShowCustomerModal(true); // Show modal when "New Orders" is pressed
//     }
//     if (title === 'New Farmer') {
//         setShowFarmerModal(true); // Show modal when "New Orders" is pressed
//     }
//   };

    const handleCardPress = (title) => {
        switch (title) {
            case 'New Orders':
                setShowOrderModal(true);
                break;
            case 'New Payments':
                setShowPaymentModal(true);
                break;
            case 'New Customers':
                setShowCustomerModal(true);
                break;
            case 'New Farmer':
                setShowFarmerModal(true);
                break;
            default:
                break;
            }
    };

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
        renderItem={({ item }) => (
          <Card
            title={item.title}
            value={item.value}
            change={item.change}
            onPress={() => handleCardPress(item.title)} // Pass onPress function to Card component
          />
        )}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Modal for New Orders */}
      <Modal
        visible={showOrderModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOrderModal(false)}
      >
        <NewOdersModal hideModal={() => setShowOrderModal(false)} />
      </Modal>
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <NewPaymentsModal hideModal={() => setShowPaymentModal(false)} />
      </Modal>

      <Modal
        visible={showCustomerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomerModal(false)}
      >
        <NewCustomersModal hideModal={() => setShowCustomerModal(false)} />
      </Modal>

      <Modal
        visible={showFarmerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFarmerModal(false)}
      >
        <NewFarmerModal hideModal={() => setShowFarmerModal(false)} />
      </Modal>
    </SafeAreaView>
  );
}
