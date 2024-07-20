import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { loadUser, login } from '../../lib/actions';
import { useAuth } from '../../lib/authProvider';

export default function Resetpassword() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const result = await login(form.email, form.password);
      const userDetails = await loadUser(result.token); // Ensure you pass the correct value here
      console.log("User details:", userDetails); // Debug userDetails
      setUser(userDetails);

      Alert.alert('Success', 'Signed in successfully');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', "Username and passwords do not match");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full flex justify-center min-h-[95vh] px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[130px] h-[134px]"
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Reset your password
            </Text>

            <FormField
              title="Email"
              otherStyles="mt-7"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
            />

            <CustomButton
              title="Submit"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Back to
              </Text>
              <Link
                href="/login"
                className="text-lg font-psemibold text-secondary"
              >
                login
              </Link>
            </View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </>
  );
}
