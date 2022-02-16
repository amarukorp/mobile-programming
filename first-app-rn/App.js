import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

export default function App() {

const [text, setText]= useState('');
const [data, setData]= useState([]);
 
const addItem = ()=>{
  setData([text, ...data]);
  setText('');
}

  return (
    <View style={styles.container}>
      <Text>Let's do it!</Text>
      <TextInput
       style={{width:200, borderColor: 'black', borderWidth:1}}
       onChangeText={text => setText(text)} 
       value={text}
       />
      
      <View>
      <Button onPress={addItem} title='press me baby'/>
      <FlatList
        data={data}
        renderItem={({item})=><Text>{item}</Text>}

      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
