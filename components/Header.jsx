import { View, Text, Image } from 'react-native'
import React from 'react'
import { useAuth } from '../lib/authProvider';
import { images } from '../constants';
import SearchInput from './SearchInput';

const Header = ({ title, search,onSearch }) => {
    const { user } = useAuth(); // Access user from the authentication context

    return (
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

                <SearchInput placeholder={search} onSearch={onSearch} />

                <View className="w-full flex-1 pt-5 pb-2">
                <Text className="text-lg font-pregular text-gray-100 mb-2">
                    {title}
                </Text>
                </View>
        </View>
    )
}

export default Header