import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../lib/authProvider';
import { useRouter } from 'expo-router';
import Card from '../../components/Card'; // Make sure to import the Card component
import NewOdersModal from '../../components/NewOdersModal';
import NewPaymentsModal from '../../components/NewPaymentModal';
import NewCustomerModal from '../../components/NewCustomerModal';
import NewFarmerModal from '../../components/NewFarmerModal';
import { fetchHomePage } from '../../lib/actions';

export default function Home() {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();
  const [showOrderModal, setShowOrderModal] = useState(false); // State for modal visibility
  const [showPaymentModal, setShowPaymentModal] = useState(false); 
  const [showFarmerModal, setShowFarmerModal] = useState(false); 
  const [showCustomerModal, setShowCustomerModal] = useState(false); 
  
  const [farmers, setFarmer] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData(); // Fetch every 15 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchHomePage();
      // console.log("home api", response)
      if (response.error === false) {
        setCustomers(response.customer);
        setFarmer(response.farmer);
      } else {
        console.error('Failed to fetch homepage:', response.message);
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    }
  };
  

  // console.log('customer', customers)

  const data = [
    { title: 'New Orders', value: '0', change: '' },
    { title: 'Orders', value: '0', change: '' },
    // { title: 'New Payments', value: '0', change: '' },
    // { title: 'Payments', value: '0', change: '-0' },
    { title: 'New Customers', value: '0', change: '' },
    { title: 'Customers', value: customers, change: '' },
    { title: 'New Farmer', value: '0', change: '' },
    { title: 'Farmers', value: farmers, change: '' },
  ];

    const handleCardPress = (title) => {
        switch (title) {
            case 'New Orders':
                setShowOrderModal(true);
                break;
            case 'Orders':
                router.push('/(tabs)/order/orders'); // Navigate to the orders screen
                break;
            case 'New Payments':
                setShowPaymentModal(true);
                break;
            case 'Payments':
                router.push('/(tabs)/payment/payments'); // Navigate to the payments screen
                break;
            case 'New Customers':
                setShowCustomerModal(true);
                break;
            case 'Customers':
                router.push('/(tabs)/customer/customers'); // Navigate to the customers screen
                break;
            case 'New Farmer':
                setShowFarmerModal(true);
                break;
            case 'Farmers':
                router.push('/(tabs)/farmer/farmers'); // Navigate to the farmer screen
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
        <NewCustomerModal hideModal={() => setShowCustomerModal(false)} />
      </Modal>

      <Modal
        visible={showFarmerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFarmerModal(false)}
      >
        <NewFarmerModal hideModal={() => setShowFarmerModal(false)} />
      </Modal>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
