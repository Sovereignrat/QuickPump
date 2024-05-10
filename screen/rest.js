import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Rest = () => {
  const navigation = useNavigation();
  let timer = 0;
  const [timeLeft, setTimeLeft] = useState(2);

  const startTime = () => {
    setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };
  useEffect(() => {
    startTime();
    
    return () => clearTimeout(timer);
  });
  return (
    <SafeAreaView>
      <Image
        source={{
          uri: "https://media0.giphy.com/media/7PK51oAq6EcUnrQYmW/200w.gif?cid=6c09b952r887h9u282ijqp66fuim3hhs0phgqynmdgqt2asj&ep=v1_gifs_search&rid=200w.gif&ct=g",
        }}
        style={{ width: "100%", height: 420 }}
      />

      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          marginTop: 50,
          textAlign: "center",
        }}
      >
        Rest Time!
      </Text>

      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          marginTop: 50,
          textAlign: "center",
        }}
      >
        {timeLeft}
      </Text>
    </SafeAreaView>
  );
};

export default Rest;

const styles = StyleSheet.create({});