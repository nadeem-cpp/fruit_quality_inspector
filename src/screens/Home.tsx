import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import Review from '../../components/Review';
import MainCard from '../../components/MainCard';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

import database from '@react-native-firebase/database';

//navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App';


import Layout from '../../components/Layout';
import Camera from '../../components/icons/Camera';
import Download from '../../components/icons/Download';

// type safety
type Home = NativeStackScreenProps<RootStackParamList, 'Home'>


function Home({ route, navigation }: Home): React.JSX.Element {
  useEffect(() => {
    database()
      .ref('/testimonails')
      .on('value', snapshot => {
        let array: { id: string, stars: number, comment: string, author: string }[] = [];
        let vals = snapshot.val();
        var arrayKeys = Object.keys(vals);
        arrayKeys.forEach(key => {
          array.push({
            id: key,
            stars: vals[key].stars,
            comment: vals[key].comment,
            author: vals[key].author,
          });
        });
        setData(array)
      });
  }, [])


  const [data, setData] = useState<{ id: string, stars: number, comment: string, author: string }[]>([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const dataAvailable = () => { if (data.length > 0) { return true } return false }

  function handleCamera() {
    launchCamera({ mediaType: 'photo' },
      (res) => {
        if (res.assets && res.assets.length > 0) {
          const img = res.assets[0];
          callModel(img.uri, img.type, img.fileName);
          // navigation.navigate("Display", { uri: img.uri, result: "A" })
        }
      }
    )
  }

  function handleGallery() {

    launchImageLibrary({ mediaType: "photo" },
      (res) => {
        if (res.assets && res.assets.length > 0) {
          const img = res.assets[0];
          // callModel(img.uri, img.type, img.fileName);
          navigation.navigate("Display", { uri: img.uri, result: "A", user:userId})
        }
      }
    )

  }

  async function callModel(uri: string | undefined, type: string | undefined, fileName: string | undefined) {
    try {
      const ApiEndpoint: string = 'https://nadeem1001100.pythonanywhere.com/'
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: type,
        name: fileName,
      });
      const response = await fetch(ApiEndpoint + 'process_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      navigation.navigate("Display", { uri: uri, result: data.grade, user:userId })

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const { userId } = route.params

  return (
    <>
      <Layout>
        <MainCard />
        <View>
          <Text style={styles.sectionTitle}>Testimonials:</Text>
          {/* if data is available render flatlist else give empty box */}
          {dataAvailable() ? (
            <FlatList
              horizontal={true}

              data={data}
              renderItem={({ item }) => <Review key={item.id} {...item} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={[styles.center, styles.testimonial]}>
              <Text style={styles.warningText}>No Testimonials Available</Text>
            </View>
          )
          }
        </View>
      </Layout>

      <View>
        {buttonsVisible && (
          <View>
            <TouchableOpacity style={[styles.actionButtonCamera, styles.actionButton]} onPress={handleCamera}>
              <Camera color={"white"} width={30} height={30} />

            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButtonGallery, styles.actionButton]} onPress={handleGallery}>
              <Download color={"white"} width={28} height={28} />

            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.fab} onPress={() => {
          setButtonsVisible(!buttonsVisible)
        }

        }>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 10,
    color: "white",
    fontSize: 24,
    fontWeight: '400',
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  testimonial: {
    height: 200,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 13,
    marginHorizontal: 5,
    backgroundColor: "#C8DFEF"
  },
  warningText: {
    fontSize: 16,
    fontWeight: "500"
  },
  actionButtonCamera: {
    right: 70,
    bottom: 95,
  },
  actionButtonGallery: {
    right: 100,
    bottom: 20,
  },
  actionButton: {
    position: "absolute",
    backgroundColor: '#007bff',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 30,
  },
  fab: {
    position: 'absolute',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    borderRadius: 40,
    elevation: 8,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default Home;
