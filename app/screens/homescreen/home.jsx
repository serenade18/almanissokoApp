import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Header from '../../components/header';
import { useAuth } from '../../services/authProvider';
import Colors from '../../utils/Colors';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { searchCustomer } from '../../services/api';


export default function Home() {
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

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Submit logic here
  };

  // Handle input changes for the form data
  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Debounce setup
  const debounceSearch = useCallback(debounce(async (text) => {
    const results = await searchCustomer(text);
    setCustomerResults(results || []);
  }, 300), []); // Ensure this is correctly set up

  // Event handler that uses debounce
  const handleSearchCustomer = (text) => {
    setSearchText(text); // Update the local state immediately
    debounceSearch(text); // Call the debounced function
  };

  const handleSelectCustomer = (customer) => {
    setFormData({
      ...formData,
      phone: customer.phone,
      customerName: customer.name,
      customerId: customer.id,
    });
    setCustomerResults([]); // Clear results after selection
  };

  return (
    <View style={styles.container}>
      
      <ScrollView >
        <Header pageTitle="New Orders" firstName={user.first_name} lastName={user.last_name} />
        <View style={styles.customer}>
          <TouchableOpacity
            style={styles.clearButton}
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
            {customerResults.length > 0 && (
              <View style={styles.resultsContainer}>
                {customerResults.map(item => (
                  <TouchableOpacity key={item.id} onPress={() => handleSelectCustomer(item)} style={styles.resultItem}>
                    <Text>{item.phone} - {item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
    marginTop: -200, // Give some space from the header
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
    color: '#333', // Darker text for better readability
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
    backgroundColor: Colors.PRIMARY, // A blue color for the button
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resultsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,  // Adjust this value based on the height of the TextInput
    width: '48%',  // Match the width of the phone input
    left: 10,  // Match the left position of the phone input
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1000,  // High z-index to ensure it overlays other content
    maxHeight: 200,  // Set a max-height for scrolling within the container
    overflow: 'visible',  // Hide overflow
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
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
