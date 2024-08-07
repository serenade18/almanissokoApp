import { StatusBar } from 'expo-status-bar';
import { Image, Text, Platform, View, ScrollView } from 'react-native';
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants";
import ContinueButton from '../components/CustomButton';

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="w-full flex justify-center items-center h-full px-4">

                <Image
                    source={images.cards}
                    className="max-w-[380px] w-full h-[298px]"
                    resizeMode="contain"
                />

                <View className="relative mt-5">
                    <Text className="text-3xl text-white font-bold text-center">
                    Almanis 
                    {" "}
                    <Text className="text-secondary-200">Soko</Text>
                    </Text>

                    <Image
                    source={images.path}
                    className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                    resizeMode="contain"
                    />
                </View>

                <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                    Manage all your sales in one place
                </Text>

                <ContinueButton
                    title="Continue"
                    handlePress={() => router.push("/login")}
                    containerStyles="w-full mt-7"
                />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}