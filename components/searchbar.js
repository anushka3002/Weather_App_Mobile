import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { View,Keyboard,StyleSheet,TextInput,Dimensions } from 'react-native'

export const SearchBar=({fetchWeatherData}) =>{
  const [cityName,setCityName]=useState("")
  return (
    
    <View style={styles.SearchBar}>
        <TextInput
        style={styles.SearchBartwo}
        placeholder='Enter city name'
        value={cityName}
        autoFocus={false}
        onChangeText={(text)=>setCityName(text)}
        onSubmitEditing={()=>fetchWeatherData(cityName)}
        />
        <AntDesign name="search1" size={24} style={styles.left} color="black" onPress={()=>fetchWeatherData(cityName)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  SearchBar:{
    marginTop:35,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:Dimensions.get("screen").width-20,
    borderWidth:1.5,
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:25,
    marginHorizontal:10,
    backgroundColor:"lightgray",
    borderColor:"lightgray"
  },
  SearchBartwo:{
    width:Dimensions.get("screen").width-20,
    borderColor:"lightgray"
  },
  left:{
    marginLeft:2
  }
  // SearchBarfocus:{
  //   borderColor:"transparent"
  // }
})