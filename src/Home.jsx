import React from "react";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ChallengeData from "../data/ChallengeData";
import { useState } from "react";
import * as Progress from "react-native-progress";
import LocationData from "../data/LocationData";

function Home() {
  
  const [challengeData, setChallengeData] = useState(ChallengeData);
  const [ChallengeData3items, setChallengeData3items] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  // generateChal is called when the user clicks the "Generate Challenges" button
  // it generates 3 random challenges from the challengeData array

  const generateChal = () => {
    let randomLocationIndex = Math.floor(Math.random() * LocationData.length);
    let randomLocation = LocationData[randomLocationIndex].place;

    // if the challenges have not been generated, generate them

    let totalChallengesRemaining = 0;
    let numCompleted = 0;
    let totalNumChallenges = 0;
    setSelected(false);
    const randomIds = [];

    // calculating total challenges completed

    for (let i = 0; i < challengeData.length; i++) {
      totalNumChallenges++;
      if (challengeData.at(i).completed == true) numCompleted++;
    }
    totalChallengesRemaining = totalNumChallenges - numCompleted;

    // if there are 3 challenges remaining, display all remaining challenges

    if (totalChallengesRemaining <=3) {
      setSelected(false);
      const finalChallenges = challengeData
        .filter((challenge) => challenge.completed == false)
        .map((challenge) => ({
          ...challenge,
          value:
            "bg-indigo-700 text-white mt-4 w-80 pr-6 pl-6 pt-4 pb-6 rounded-xl border border-black",
          completed: false,
        }));
      setChallengeData3items(finalChallenges);
    } else {
      if (totalChallengesRemaining > 3) {

        // if there are more than 3 challenges remaining, generate 3 random challenges

        while (randomIds.length < 3) {
          let randomId = Math.floor(Math.random() * challengeData.length);
          
          // placeholder challenge at ID 11, if randomId == 11, replace with a random location

          if (randomId == 11) {
            challengeData.at(randomId).name = "";
            challengeData.at(randomId).description = "";

            challengeData.at(randomId).name = "Visit " + randomLocation;
            challengeData.at(randomId).description =
              "Take a trip to " + randomLocation + " today";
          }
          if (
            !randomIds.includes(randomId) &&
            challengeData.at(randomId).completed === false &&
            randomId != 0
          ) {
            randomIds.push(randomId);
          }
        }
      } else {

        // push randomId to randomIds array if it is not already in the array and completed == false

        while (randomIds.length < totalChallengesRemaining) {
          const randomId = Math.floor(Math.random() * challengeData.length) + 1;
          if (
            !randomIds.includes(randomId) &&
            challengeData.at(randomId).completed == false
          ) {
            randomIds.push(randomId);
          }
        }
      }

      // filter challengeData array to only include challenges with ids in randomIds array

      const randomChallenges = challengeData
        .filter(
          (challenge) =>
            randomIds.includes(challenge.id) && challenge.completed == false
        )
        .map((challenge) => ({
          ...challenge,
          value:
            "bg-indigo-700 text-white mt-4 w-80 pr-6 pl-6 pt-4 pb-6 rounded-xl border border-black",
          completed: false,
        }));

      // update ChallengeData3items state to include the 3 random challenges

      setChallengeData3items(randomChallenges);
    }
  };

  // completeClick is called when the user clicks the "Complete" button
  // it updates the value of the challenge to be completed

  const completeClick = (index) => {
    const updatedChallengeData3items = ChallengeData3items.map(
      (challenge, i) => {
        if (i === index) {

          // if the challenge is not completed, update the value to be completed

          if (challenge.completed === false) {
            return {
              ...challenge,
              value:
                "bg-green-700 text-white mt-4 w-80 pr-6 pl-6 pt-4 pb-6 rounded-xl border border-black",
              completed: true,
            };
          } else {

            // if the challenge is completed, update the value to be incomplete

            return {
              ...challenge,
              value:
                "bg-indigo-700 text-white mt-4 w-80 pr-6 pl-6 pt-4 pb-6 rounded-xl border border-black",
              completed: false,
            };
          }
        } else {
          return challenge;
        }
      }
    );

    // default selected to false, if any challenge's status is changed , set selected to true
    // this allows us to display the "Submit Completed" button
    // else if the user has not changed any challenge's status, display the "Generate Challenges" button

    setSelected(false);
    updatedChallengeData3items.forEach((challenge) => {
      if (challenge.completed === true) {
        setSelected(true);
      }
    });

    // update ChallengeData3items state to include the updated challenges

    setChallengeData3items(updatedChallengeData3items);
  };

  // submitCompleted is called when the user clicks the "Submit Completed" button
  // it updates the challengeData array to include the completed challenges

  const submitCompleted = () => {
    setSelected(false);
    const updatedIncompleteChallenges = [];
    const updatedCompletedChallenges = [];
    for (let i = 0; i < ChallengeData3items.length; i++) {

      // if the challenge is not completed, add it to the updatedIncompleteChallenges array

      if (ChallengeData3items[i].completed === false) {
        updatedIncompleteChallenges.push(ChallengeData3items[i]);
      } else {
        challengeData[ChallengeData3items[i].id].completed = true;
        updatedCompletedChallenges.push(ChallengeData3items[i]);
      }
    }
    setProgress(progress + updatedCompletedChallenges.length);

    // if all challenges have been completed, set allCompleted to true
    
    if (progress + updatedCompletedChallenges.length == challengeData.length) {
      setAllCompleted(true);
    }
    setChallengeData3items(updatedIncompleteChallenges);
  };

  return (
    <ScrollView className="bg-gray-100">
      <View className="pt-10 items-center  justify-center bg-gray-100">
        {/* Thrivia png created in figma, font originally from https://www.dafont.com/theme.php?cat=304 */}
        <Image
          style={{
            resizeMode: "contain",
            height: 80,
            width: 250,
          }}
          source={require("../assets/Thrivia.png")}
        />
        <View className="flex flex-col items-center justify-top  ">
          
          <View className="text-9xl ">
          </View>
          {/* Used to live update statistics of players completion of challenges, displayed in challenge bar */}
          <View className="pt-3 pb-3 items-center">
            <Text>
              Completion {progress}/{challengeData.length} 
            </Text>

            {/* https://www.npmjs.com/package/react-native-progress */}
            <Progress.Bar className="mt-2"
              progress={progress / challengeData.length}
              width={250}
              height={25}
              color="green"
              borderColor="black"
              borderRadius={15}
            />
          </View>
        </View>

        {/* This sections displays the challenges from the 3DataItems */}

        <View>
          <Text className="text-2xl items-center text-center pt-3">
            Challenges
          </Text>
          {ChallengeData3items.map((challenge, index) => (
            <Pressable
              key={challenge.id}
              onPress={() => completeClick(index)}
              className={challenge.value}
            >
              <Text className="text-xl text-white text-center">
                {challenge.name}
              </Text>
              <Text className="text-m text-white text-center">
                {challenge.description}
              </Text>
            </Pressable>
          ))}

          {/* This section checks if selected status is true, if so it will display a submit completed button */}

          {selected === true && (
            <TouchableOpacity
              className="bg-indigo-700 px-4 py-2 rounded-md mt-4 items-center mb-8"
              onPress={submitCompleted}
            >
              <Text className="flex justify-center text-white text-lg bg-indigo-700">
                Submit all Completed Challenges
              </Text>
            </TouchableOpacity>
          )}

          {/* This section checks if selected is false and all completed is false, then dispalys generate challenges */}

          {!selected && allCompleted === false && (
            <TouchableOpacity
              className="bg-indigo-700 px-4 py-2 rounded-md mt-4 items-center mb-8"
              onPress={generateChal}
            >
              <Text className="flex justify-center text-white text-lg bg-indigo-700">
                Generate 3 Daily Challenges
              </Text>
            </TouchableOpacity>
          )}

          {/* if allCompleted == true then just display this section */}

          {allCompleted && (
            <View className="bg-green-500 px-4 py-2 rounded-md mt-4 mb-8 w-[300] mt-5">
              <Text className="text-white text-lg text-center">
                Congratulations! You have completed all challenges. Well done!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
export default Home;
