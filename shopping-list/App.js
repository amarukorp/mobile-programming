import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

export default function App() {
  const [shopItem, setShopItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addingItem= () => {
    const item = shopItem;
    setShoppingList([...shoppingList, {key:`${item}`}])
    setShopItem('');
  }
  const clear = () => {
    setShoppingList([]);
    setShopItem('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
      <Text style={{fontSize:16, color:'green', fontWeight:'bold'}}>💸Shopping List App💸</Text>
      <TextInput style={styles.input}
        onChangeText={shopItem=>setShopItem(shopItem)}
        value={shopItem}
        ></TextInput>
      </View>
        <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'space-evenly'}}>
        <Button onPress={addingItem} title='Add'/>
        <Button onPress={clear} title ='Clear'/>
        </View>
        <View style={styles.listContainer}>
          <Text style={{fontSize:16, color:'blue', fontWeight:'bold'}}>Shopping List:</Text>
          <FlatList
            data={shoppingList}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:200, 
    borderColor: 'black',
     borderWidth:1
  },
  listContainer:{
    flex:1,
    alignItems:'center'

  },
  container1: {
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom:10

  },
});
