import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';



export default function App() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState({});
  const [result, setResult] = useState(0);
  const [selectedRate, setSelectedRate] = useState();


  useEffect(()=>{
    fetch('http://api.exchangeratesapi.io/latest?access_key=a03c00584cd70377bc1b837507f77cd2')
    .then(response=> response.json())
    .then(responseData=> setCurrency(responseData.rates))
    .catch(err=>console.error(err))
  },[])
  
  const convert= ()=>{
  const exchange = currency[selectedRate];
  setResult((amount/exchange).toFixed(2))
  }


  return (
    <View style={styles.container}>
      <Text>💶 Euro convertor 💶</Text>
      <Text>{result}€</Text>
      <TextInput 
        style={{width:150, borderColor:'black', borderWidth:1}}
        placeholder="amount"
        onChangeText={text=>setAmount(parseFloat(text))}
      />
      <Picker
      style={{width:100}}
      
        selectedValue={selectedRate}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedRate(itemValue)
        }>
        {Object.keys(currency).map((item, index)=>
          <Picker.Item  key={index} label={item} value={item} />)
          }
        
       
      </Picker>
      <Button title='Convert' onPress={convert}/>
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
