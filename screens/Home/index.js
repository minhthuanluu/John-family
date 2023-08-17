import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, Image, View, FlatList, TouchableOpacity } from 'react-native'
import { PROFILE } from '../../utils/screens';
import app, { database } from '../../config';
import { child, get, getDatabase, ref } from 'firebase/database';
import { O2A } from 'object-to-array-convert';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const { navigate } = useNavigation();
  const [data,setData] = useState([]);

  useEffect(()=>{
    const initial=async()=>{
      const status = await Network.getNetworkStateAsync();
      console.log(status);
      const {isConnected,isInternetReachable,type} = status;
      if(isConnected==true){
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `/`)).then(async (snapshot) => {
          setData(O2A(snapshot));
          await AsyncStorage.setItem("data",JSON.stringify(O2A(snapshot)));
        }).catch((error) => {
          // setLoading(false);
        });
      }else{
        const data = await AsyncStorage.getItem("data");
        if(data){
          setData(JSON.parse(data))
        }else{
          console.log('No Internet connected');
        }
      }
      
    }

    initial();
  },[navigate])
  
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%', paddingVertical: '7%' }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigate(PROFILE, { data: item })} style={{ flexDirection: "row", justifyContent: "space-between", margin: '5%', width: '50%' }}>
            <View>
              <View style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <Image source={{ uri: "https://drive.google.com/thumbnail?id=" + item.avatar }} style={{ resizeMode: "cover", width: 120, height: 120, borderRadius: 60 }} />
              </View>
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15, marginTop: 5 }}>{item.usualName}</Text>
            </View>
          </TouchableOpacity>
        )}

      />
    </View>
  )
}

export default Home