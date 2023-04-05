import { View, Image, ScrollView} from 'react-native'
import React from 'react'

function Gallery() {
  return (
    <ScrollView className="">
        <View className="flex flex-row ml-4 mt-4 mb-4">
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/5B8CC3AD-E1C6-431A-9E5E-8C906E393476.jpg")}
                />
            </View>
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/IMG_8087.jpeg")}
                />
            </View>
        </View>
        <View className="flex flex-row ml-4 mt-4 mb-4">
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/IMG_8121.jpeg")}
                />
            </View>
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/IMG_8278.jpeg")}
                />
            </View>
        </View>
        <View className="flex flex-row ml-4 mt-4 mb-4">
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/IMG_8301.jpeg")}
                />
            </View>
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/IMG_8715.jpeg")}
                />
            </View>
        </View>
        <View className="flex flex-row ml-4 mt-4 mb-4">
            <View className="flex-1">
                <Image
                className="h-48 w-40 rounded-xl"
                source={require("../assets/gallery/IMG_8791.jpeg")}
                />
            </View>
        </View>
    </ScrollView>
  )
}

export default Gallery