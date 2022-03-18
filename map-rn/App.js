import { Button, StyleSheet, TextInput, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useEffect, useState} from 'react';
import * as Location from 'expo-location';

export default function App() {
const [address, setAddress] = useState('');
const [coordinates, setCoordinates] = useState({lat:60.200692, lng:24.934302})
const [location, setLocation] = useState({
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221,
});
const APIkey= // INSERT YOUR OWN API KEY

useEffect(()=>{
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); 
    if (status !== 'granted') { 
      Alert.alert('No permission to get location')
      return; 
    }
    // Get location 
    let location = await Location.getCurrentPositionAsync({});    
    
    setLocation(location); 
    // console.log(location)
  })();
},[])

const requestData= ()=>{
 fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${APIkey}&location=${address}`)
 .then(response => response.json())
 .then(responseData => setLocation({...location, latitude: responseData.results[0].locations[0].latLng.lat, longitude:responseData.results[0].locations[0].latLng.lng})) 
 .catch(err=> console.log(err))
 console.log(location)
}

  return (
    <View style={{flex:1}}>
     <MapView
     style={{flex:1}}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }}
     >
       <Marker
         coordinate={{
          latitude: location.latitude, longitude:location.longitude}}
          title='Your destination'/>
      
     </MapView>
       <TextInput style={{width:200, height:50}} 
       placeholder='Insert an address'
       onChangeText={text=>setAddress(text)}
       />
       <Button title='Find' onPress={requestData}/>
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
