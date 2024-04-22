import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Header from '../../components/mainheader/header';
import { useAuth } from '../../services/authProvider';
import Colors from '../../utils/Colors';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { searchCustomer } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { token } = useAuth();
  const navigation = useNavigation();

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    customerName: '',
    customerId: '',
    town: '',
    kilos: '',
    packaging: '',
    discount: '',
    transport: '',
    transporters: '',
    rider: '',
    comment: '',
    farmer: '',
    vat: '',
    riceType: '',
    farmerPrice: '',
    almanisPrice: '',
    amount: '',
  });
  const [searchText, setSearchText] = useState('');
  const [customerResults, setCustomerResults] = useState([])

  const [vat, setVat] = useState("");
  const [rice, setRice] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleNewCustomer = () => {
    navigation.navigate('AddCustomer'); // Navigate to the login screen
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Submit logic here
  };

   // Create a debounced function that only invokes searchCustomer after 300ms
   const debouncedSearch = useCallback(
    debounce(async (text) => {
      setIsSearching(true);  // Start loading
      const results = await searchCustomer(text, token);
      setCustomerResults(results || []);
      setIsSearching(false);  // Stop loading
    }, 300),
    [token]
  );

  useEffect(() => {
    if (searchText) {
      debouncedSearch(searchText);
    } else {
      setCustomerResults([]);
    }
    // Cleanup debounced calls on component unmount
    return () => debouncedSearch.cancel();
  }, [searchText, debouncedSearch]);

  const handleSearchCustomer = async (text) => {
    setSearchText(text);  // Update the searchText state immediately with each keystroke
    setFormData(prevState => ({
      ...prevState,
      phone: text
    }));
  
    if (text) {
      setIsSearching(true);  // Start loading
      try {
        const results = await searchCustomer(text, token);  // Attempt to fetch customer data
        console.log(results)
        setCustomerResults(results.results || []);  // Update state with results or empty array if undefined
      } catch (error) {
        console.error('Failed to fetch customer data:', error);  // Log error to console
        setCustomerResults([]);  // Optionally handle the error in the UI, e.g., show an error message
      } finally {
        setIsSearching(false);  // Stop loading indicator regardless of success or failure
      }
    } else {
      setCustomerResults([]);  // Clear results if no text is present
    }
  };

  const handleChange = (name, value) => {
    // Convert numeric values to string if necessary before setting them in formData
    const newValue = typeof value === 'number' ? value.toString() : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSelectCustomer = (customer) => {
    console.log("Selected Customer:", customer);
    
    // Update the formData directly
    setFormData({
      ...formData,
      phone: customer.phone,
      customerName: customer.name,
      customerId: customer.id.toString()
    });
    
    setCustomerResults([]); // Clear results after selection
  };
  
  return (
    <View  style={styles.container}>
      
      <ScrollView >
        <Header pageTitle="New Orders" firstName={user.first_name} lastName={user.last_name} />
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

        <View style={styles.formContainer}>
          <Text style={{ fontSize: 27, color: Colors.BLACK, paddingTop: 15, paddingBottom: 20 }}>
            Place Order
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={Colors.BLACK}
              onChangeText={handleSearchCustomer}
              value={formData.phone || ''}
              onBlur={() => setCustomerResults([])}
              required
            />
            {isSearching ? (
              <Text style={styles.loadingText}>Searching. Please Wait..</Text>
            ) : customerResults.length > 0 ? (
              <View style={styles.resultsContainer}>
                {customerResults.map(item => (
                  <TouchableOpacity key={item.id} onPress={() => handleSelectCustomer(item)} style={styles.resultItem}>
                    <Text>{item.phone} - {item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              placeholderTextColor={Colors.BLACK}
              onChangeText={(text) => handleChange('customerName', text)}
              value={formData.customerName || ''}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Customer No"
              placeholderTextColor={Colors.BLACK}
              onChangeText={(text) => handleChange('customerId', text)}
              value={formData.customerId || ''}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Town"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Kilos"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Packaging"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Discount"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Transport"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Transporters"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Rider"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Comment"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Farmer"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
          </View>
          <View style={styles.inputRow}>
            <View style={styles.input}>
              <Picker
                selectedValue={rice}
                onValueChange={(itemValue, itemIndex) => setRice(itemValue)}
                style={{ flex: 1, color: Colors.BLACK }}
              >
                <Picker.Item label="Rice Type" value="" />
                <Picker.Item label="Pishori" value="1" />
                <Picker.Item label="Komboka" value="2" />
              </Picker>
            </View>
            <View style={styles.input}>
              <Picker
                selectedValue={vat}
                onValueChange={(itemValue, itemIndex) => setVat(itemValue)}
                style={{ flex: 1, color: Colors.BLACK }}
              >
                <Picker.Item label="V.A.T" value="" />
                <Picker.Item label="0%" value="0" />
                <Picker.Item label="14%" value="14" />
                <Picker.Item label="16%" value="16" />
              </Picker>
            </View>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Farmer Price"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Almanis Price"
              placeholderTextColor={Colors.BLACK}
              // value={email}
              // onChangeText={setEmail}
              required
            />
          </View>
          <TextInput
            style={styles.amountInput}
            placeholder="Amount"
            placeholderTextColor={Colors.BLACK}
            // value={email}
            // onChangeText={setEmail}
            required
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    padding: 15
  },
  customer: {
    marginTop: -200, 
    marginBottom: 20,
    paddingLeft: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
    marginTop: -8, // Give some space from the header
    marginBottom: 20, // Give some space at the bottom
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
    alignSelf: 'center', // Ensures the form aligns itself to the center horizontally
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will ensure space between your two items
    width: '100%', // Full width to contain both inputs
  },
  inputGroup: {
    backgroundColor: '#ffffff', // White background for input fields
    marginBottom: 15,
    borderRadius: 5, // Rounded corners for the inputs
    borderWidth: 1, // Optional: if you want borders on the inputs
    borderColor: '#e1e1e1', // Light grey border for the inputs
    padding: 10, // Padding inside the inputs
  },
  label: {
    fontSize: 16,
    color: '#333', 
    marginBottom: 5,
  },
  input: {
    width: '48%',
    backgroundColor: Colors.GREY,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  amountInput: {
    width: '100%',
    backgroundColor: Colors.GREY,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resultsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,  
    width: '48%',  
    left: 10,  
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1000,  
    maxHeight: 200,  // Set a max-height for scrolling within the container
    overflow: 'scroll',  
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  loadingText: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,  
    width: '48%',  
    padding: 10,
    left: 10,  
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1000,  
    height: 40,  // Set a max-height for scrolling within the container
    overflow: 'scroll', 
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
  buttonText: {
    color: '#ffffff', // White color text for the button
    fontSize: 16,
    fontWeight: 'bold', // Optional: if you want bold text on the button
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
