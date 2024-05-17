import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
//navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App';
import Star from '../../components/icons/Star';
import Layout from '../../components/Layout';

import database from '@react-native-firebase/database';


// type safety
type Display = NativeStackScreenProps<RootStackParamList, 'Display'>




const DisplayResult = ({ route, navigation }: Display) => {



  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  function submitReview(stars: number, comment: string) {
    const newReference = database().ref('/testimonails').push();
    newReference
      .set({
        stars:stars,
        comment: comment,
        author: user,
      })
      .then(() => navigation.navigate("Home", {userId: user}));
  }

  const handleStarPress = (id: number) => {
    setRating(id)
    const updatedStars = stars.map((star) => ({
      ...star,
      filled: star.id <= id ? "yellow" : "white",
    }));

    setStars(updatedStars);
  };

  const { uri, result, user } = route.params
  const [stars, setStars] = useState([
    { id: 1, filled: "white" },
    { id: 2, filled: "white" },
    { id: 3, filled: "white" },
    { id: 4, filled: "white" },
    { id: 5, filled: "white" },
  ]);

  return (
    <Layout>

      <View style={[styles.imgCard]}>
        <Image
          style={{ width: "100%", height: "75%", objectFit: "fill" }}
          src={uri} />
        <Text style={styles.title}>{result} grade fruit</Text>

      </View>
      <View style={[{ flexDirection: "row", marginTop: 12, }]}>
        {stars.map((star) => (
          <Star
            key={star.id}
            fill={star.filled}
            onPress={() => handleStarPress(star.id)}
          />
        ))}
      </View>

      <TextInput
        value={comment}
        onChangeText={setComment}
        style={styles.input}
        numberOfLines={4}
        placeholder='comment...'
        placeholderTextColor={"white"}
        textAlignVertical='top'
      />
      <View style={{ alignItems: "flex-end" }}>

        <TouchableOpacity onPress={() => {
          submitReview(rating, comment) 
        }} style={styles.button}>
          <Text style={{ color: "black" }}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default DisplayResult

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "black",
    paddingTop: 10,

  },
  imgCard: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 270,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: 'rgba(200, 223, 239, 0.4)',
  },
  input: {
    marginVertical: 15,
    color: "white",
    paddingHorizontal: 10,
    backgroundColor: 'rgba(200, 223, 239, 0.4)'
  },
  button: {
    width: 140,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#C8DFEF",
    alignItems: "center",
    borderRadius: 8,
    // marginBottom: 15
  }
})