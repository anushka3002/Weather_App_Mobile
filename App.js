import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,TextInput, View} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-web';
import { Weather } from './components/weather';


const API_KEY="b7bd8afb5b725f099b164281e741a4b0"


export default function App() {
  const [weatherData,setWeatherData]=useState(null)
  const [loaded,setLoaded]=useState(true)
  // const [city,setCity]=useState("")


  const fetchWeatherData=(city)=>{
    // setLoaded(false)
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
    console.log(weatherData)
    console.log("hello")
  },[])

 
  // const handleChange=(e)=>{
  //   setCity(e.target.value)
  // }

  if(!loaded){
    return(
      <View>
        <ActivityIndicator color="gray" size={36}/>
      </View>
    )
  }
  else if(weatherData===null){
    return(
      <View></View>
    )
    
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData}/>
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
});
