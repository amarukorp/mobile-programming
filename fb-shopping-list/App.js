import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

export default function App() {

  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);
// Your web app's Firebase configuration
const firebaseConfig = {//USE YOUR OWN CONFIG FROM FIREBASE};
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  ref(database,'items/')

  useEffect(() => {
    const itemsRef = ref(database, 'items/');  
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Object.values(data));
      })
  }, []);

  const saveItem = () => {
    push(
      ref(database, 'items/'),
      {'product': item, 'amount': amount});
  }


  return (
    <View style={styles.container}>
      <Text style={{fontSize:24, marginTop:50}}>Shopping List App 🛒</Text>
      <View style={{flex:1, marginTop:50}}>
      <TextInput
      style={{borderStyle:'solid', borderColor:'black', borderWidth:1, width:200, height:40, marginBottom:10}}
        placeholder='   Item'
        onChangeText={item=>setItem(item)}
        value={item}
      />
      <TextInput
        style={{borderStyle:'solid', borderColor:'black', borderWidth:1, width:200, height:40, marginBottom:10}}
        placeholder='   Amount'
        onChangeText={amount=>setAmount(amount)}
        value={amount}
      />
      <Button
        onPress={saveItem}
        title='Save'
      />
      </View>
      <View style={{flex:1, width:200}}>
        <FlatList
          style={{marginLeft:'5%'}}
          keyExtractor={item=> item.id.toString()}
          renderItem={({item})=>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginRight:10}}>{item.item}, {item.amount}</Text>  
          </View>
          }
          data={items}
        />
      </View>
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
