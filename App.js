import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,TextInput, View} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { Weather } from './components/weather';
import { SearchBar } from './components/searchbar';


const API_KEY="b7bd8afb5b725f099b164281e741a4b0"


export default function App() {
  const [weatherData,setWeatherData]=useState(null)
  const [loaded,setLoaded]=useState(true)
  // const [city,setCity]=useState("")


  const fetchWeatherData=(city)=>{
    setLoaded(false)
      const API=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    axios.get(API).then((res)=>{
      if(res.status===200){
        console.log(res.data)
      setWeatherData(res.data)
      }
      else{
        setWeatherData(null)
      }  
      setLoaded(true)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchWeatherData("Mumbai")
  },[])


  if(!loaded){
    return(
      <View>
        <ActivityIndicator style={styles.load} color="gray" size={36}/>
      <Text style={styles.loading}>Loading...</Text>
      </View>
    )
  }
  else if(weatherData===null){
    return(
      <View>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
      </View>
    )
    
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28
},
load:{
  marginTop:1000
},
loading:{
  textAlign:"center",
  fontSize:36
}
});
