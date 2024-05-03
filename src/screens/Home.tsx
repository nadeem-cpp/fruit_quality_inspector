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
import { launchImageLibrary } from 'react-native-image-picker'

import database from '@react-native-firebase/database';

//navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App';


import Layout from '../../components/Layout';

// type safety
type Home = NativeStackScreenProps<RootStackParamList, 'Home'>


const DATA = [
  {
    id: "1234",
    stars: 2,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, ipsum nec consequat porta, felis mauris commodo lorem, id aliquet felis nunc id purus. Duis vestibulum, justo nec vehicula euismod",
    author: "nadeem"
  },
  {
    id: "123",
    stars: 5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, ipsum nec consequat porta, felis mauris commodo lorem, id aliquet felis nunc id purus. Duis vestibulum, justo nec vehicula euismod",
    author: "nadeem"
  },
  {
    id: "1235",
    stars: 4,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, ipsum nec consequat porta, felis mauris commodo lorem, id aliquet felis nunc id purus. Duis vestibulum, justo nec vehicula euismod",
    author: "nadeem"
  },
  {
    id: "1236",
    stars: 3,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "nadeem"
  },
  {
    id: "1237",
    stars: 3,
    comment: "Lorem ipsum dolor sit amet",
    author: "nadeem"
  },
]


const dataAvailable = () => { if (DATA.length > 0) { return true } return false }


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


  async function callModel(uri: string | undefined, type: string | undefined, fileName: string | undefined) {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: type,
        name: fileName,
      });
      const response = await fetch('http://10.0.2.2:5000/process_image', {
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
      navigation.navigate("Display", { uri: uri, result: data.grade })

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
        <TouchableOpacity style={styles.fab} onPress={() => {
          launchImageLibrary({ mediaType: "photo" },
            (res) => {
              if (res.assets && res.assets.length > 0) {
                // const uri =  res.assets[0].uri
                const img = res.assets[0];
                // callModel(img.uri, img.type, img.fileName);
                navigation.navigate("Display", { uri: img.uri, result: "A" })
              }
            }
          )
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
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    elevation: 8,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default Home;
