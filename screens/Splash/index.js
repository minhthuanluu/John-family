import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { HOME } from '../../utils/screens';

const Splash = () => {
    const {navigate} = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigate(HOME)
        }, 3000);
    }, [])
    
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>Splash</Text>
    </View>
  )
}

export default Splash