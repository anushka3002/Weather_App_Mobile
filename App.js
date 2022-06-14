// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text,TextInput, View} from 'react-native';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ActivityIndicator } from 'react-native';
// import { Weather } from './components/weather';
// import { SearchBar } from './components/searchbar';


// const API_KEY="b7bd8afb5b725f099b164281e741a4b0"


// export default function App() {
//   const [weatherData,setWeatherData]=useState(null)
//   const [loaded,setLoaded]=useState(true)


//   const fetchWeatherData=(city)=>{
//     setLoaded(false)
//       const API=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     axios.get(API).then((res)=>{
//       if(res.status===200){
//         console.log(res.data)
//       setWeatherData(res.data)
//       }
//       else{
//         setWeatherData(null)
//       }  
//       setLoaded(true)
//     }).catch((err)=>{
//       console.log(err)
//     })
//   }

//   useEffect(()=>{
//     fetchWeatherData("Mumbai")
//   },[])


//   if(!loaded){
//     return(
//       <View style={styles.container}>
//         <ActivityIndicator style={styles.load} color="gray" size={36}/>
//       <Text style={styles.loading}>Loading...</Text>
//       </View>
//     )
//   }
//   else if(weatherData===null){
//     return(
//       <View style={styles.container}>
//         <SearchBar fetchWeatherData={fetchWeatherData}/>
//         <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
//       </View>
//     )
    
//   }

//   return (
//     <View style={styles.container}>
//       <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   primaryText: {
//     margin: 20,
//     fontSize: 28
// },

// loading:{
//   textAlign:"center",
//   fontSize:26,
//   color:"gray"
// }
// });



import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {Weather} from './components/weather';
import {SearchBar} from './components/searchbar';

const API_KEY="b7bd8afb5b725f099b164281e741a4b0"


export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Mumbai');
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={styles.load} color="gray" size={36}/>
         <Text style={styles.loading}>Loading...</Text>
            </View>

        )
    }

    else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  primaryText: {
      margin: 20,
      fontSize: 20,
      color:"gray",
  },
  load:{
      marginTop:270
  },
  loading:{
      textAlign:"center",
      fontSize:26,
      color:"gray"
    }
});