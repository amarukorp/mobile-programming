import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
//simple calc app that add and substract numbers
export default function App() {
  const [num1, setNum1]= useState('');
  const [num2, setNum2]= useState('');
  const [result, setResult]= useState(0);
  const [history, setHistory] = useState([]);

const addition= ()=>{
  const sum = parseInt(num1)+parseInt(num2)
  setResult(sum);
  setHistory([...history, {key: `${num1} + ${num2} = ${sum}`}])
}
const subtraction= ()=>{
  const sub = parseInt(num1)-parseInt(num2)
  setResult(sub);
  setHistory([...history, {key: `${num1} - ${num2} = ${sub}`}])
}

  return (
    <View style={styles.container}>
    <View style={styles.container1}>
      <Text>Simple Arithmetic Calculator</Text>
      <Text>Calculation Result: {result}</Text>
      <TextInput style={styles.input} keyboardType='numeric'
        onChangeText={num1=>setNum1(num1)}
        value={num1}
      />
      <TextInput style={styles.input} keyboardType='numeric'
        onChangeText={num2=>setNum2(num2)}
        value={num2}
      />
    </View>
    <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', justifyContent:'space-evenly'}}>
      <Button onPress={addition}title='    +    '/>
      <Button onPress={subtraction} title='     -    '/>
    </View>
    <View style={styles.listContainer}>
      <Text>History</Text>
      <FlatList
        data={history}
        renderItem={({item}) => <Text style= {{fontSize: 17}}>{item.key}</Text>}
        keyExtractor={((item, index)=>index.toString())}
      />

    </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    
  },
  container1: {
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom:10

  },
  input:{
    width:200, 
    borderColor: 'black',
     borderWidth:1
  },

  listContainer:{
    flex:1,
    alignItems:'center'

  }
});
