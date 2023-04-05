import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadImage from "../components/ImageUpload.jsx";
import ChallengeData from "../data/ChallengeData";
import { StyleSheet } from "react-native";

function Profile() {
  /// set value for loading from local storage
  /// idk why we pass null as a parameter
  const [name, setName] = useState("");

  const [progress, setProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [challengePercentage, updateChallenge] = useState(0);

  //Pull down on profile page for refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      updateChallenge(() => {
        console.log("updating challenge");
        let count = 0; //Check for active challenge
        for (let index = 0; index < ChallengeData.length; index++) {
          const element = ChallengeData[index];
          if (element.completed === true) {
            count++;
          }
        }
        return (count / ChallengeData.length) * 100; //Get percentage of challenge completion
      });
    }, 2000);
  }, []);

  const loadUser = async () => {
    try {
      // Loading the username
      const value = await AsyncStorage.getItem("name");
      if (value !== null) {
        setName(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Loading user
    loadUser();
    // Loading the number of completed challenges
  }, []);
  // Button for resetting data - 3 way alert button
  const wipeData = () => {
    Alert.alert("Reset data?", "Do you wish to clear your data/statistics?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Reset challenges only",
        onPress: async () => {
          // Place holder
          console.log("Wipe data");
        },
      },
      {
        text: "Reset all data (Stats included)",
        onPress: async () => {
          // Place holder
          console.log("Wipe data");
        },
      },
    ]);
  };

  return (
    <ScrollView
      className=""
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex items-center flex-1 h-screen mb-16">
        <View className="bg-indigo-700 w-full border-b-2">
          <View className="items-center w-full pt-4 pb-1">
            <View className="">
              <UploadImage />
            </View>
          </View>
        </View>

        <Text className="text-center text-xl mt-5">{name}</Text>
        <Text className="text-center italic text-l ">
          Glasgow, United Kingdom
        </Text>

        {/* Horizontal Bar Code */}
        <View className="h-0.2 border w-80 mt-6  border-slate-200 "></View>
        <View className="flex bg-slate-100 w-80 h-80 rounded-t-3xl rounded-b-3xl items-center mt-4">
          <View className="mt-5 h-80 w-80">
            <Text className="text-xl text-center pt-2">
              Personal Statistics
            </Text>
            <View className="flex flex-row pt-8 items-center justify-center text-center space-x-16">
              <View className="flex flex-col items-center justify-center text-center space-y-8 ">
                <Text className="text-xl">Challenges</Text>
                {/* To */}
                <Text className="">{Math.round(challengePercentage)}% </Text>
                <Text className="text-xl">Locations</Text>
                <Text>15</Text>
              </View>
              <View className="flex flex-col  items-center justify-center text-center space-y-8">
                <Text className="text-xl">Active</Text>
                <Text>10</Text>
                <Text className="text-xl">Daily Streak</Text>
                <Text>3🔥 </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="bg-indigo-700 px-4 py-2 mx-auto rounded-md mt-4 items-center w-40 justify-center "
            onPress={wipeData}
          >
            <Text className="flex justify-center text-white text-lg">
              Reset Data
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
