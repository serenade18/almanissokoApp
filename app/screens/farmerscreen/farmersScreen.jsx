import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/mainheader/header'
import { useAuth } from '../../services/authProvider';
import { useNavigation } from '@react-navigation/native';
import { fetchAllFarmers } from '../../services/api';
import Colors from '../../utils/Colors';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function FarmersScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleNewFarmer = () => {
    navigation.navigate('AddFarmer');
  }

  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await fetchAllFarmers();
      if (response.error === false) {  // Assuming the API sends this in response
        // console.log('Farmers fetched:', response.data); // Log to check the structure
        setFarmers(response.data.results); // Make sure this matches the actual path to the data array
      } else {
        console.error('Failed to fetch Farmers:', response.message);
      }
    } catch (error) {
      console.error('Error fetching farmer data:', error);
    }
  };  

  const renderItem = ({ item }) => {
  
    return (
      <View style={styles.tableRow}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Text style={styles.tableCellNarrow}>#{item.id.toString()}</Text>
          <Text style={styles.tableCellName}>{item.name}</Text>
          <Text style={styles.tableCellPhone}>{item.phone}</Text>
          <Text style={styles.tableCellDate}>
            {new Date(item.added_on).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}, at {new Date(item.added_on).toLocaleTimeString()}
          </Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header pageTitle="Farmers" firstName={user.first_name} lastName={user.last_name} />
        <View style={styles.farmer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleNewFarmer}
          >
            <Entypo name="add-user" size={38} color={Colors.PRIMARY} />
            <Text style={styles.text}>New farmer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>farmers List</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <FlatList
              data={farmers}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={<Text>No farmers found</Text>}
            />
          </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  farmer: {
    marginTop: -200,
    marginBottom: 20,
    paddingLeft: 5,
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
  listContainer: {
    width: '91%',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
    marginTop: -8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  listTitle: {
    fontSize: 27,
    color: Colors.BLACK,
    paddingBottom: 20,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
    paddingVertical: 5,
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensures that the container fills the space for smaller content
    alignItems: 'center', // Align items for better control in the horizontal layout
  },
  tableCellName: {
    width: 170, // Ensure minimum width for readability
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold', 
  },
  tableCellPhone: {
    width: 120, // Ensure minimum width for readability
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold', 
  },
  tableCellTown: {
    width: 120, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    padding: 6,
    fontWeight: 'bold', 
  },
  tableCellRegion: {
    width: 100, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold', 
  },
  tableCellDate: {
    minWidth: 160, // Ensure minimum width for readability
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 16,
    fontWeight: 'bold', 
  },
  tableCellNarrow: {
    minWidth: 40, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold', 
    padding: 6,
  },
  renderText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 6,
    alignItems: 'center',
    marginTop: -2
  }
});

