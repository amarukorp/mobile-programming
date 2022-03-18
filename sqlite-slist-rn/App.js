import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

export default function App() {

  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  const db = SQLite.openDatabase('coursedb.db');

  useEffect(()=>{
    db.transaction(tx => {
      tx.executeSql('create table if not exists items (id integer primary key not null, amount text, item text);');
    }, null, updateList);
  },[]);

  const saveItem = ()=> {
    db.transaction(tx=>{
      tx.executeSql('insert into items (item, amount) values (?, ?);',
        [item, amount]);
    }, null, updateList)
    setItem('')
    setAmount('')
  }

  const updateList = ()=>{
    db.transaction(tx=>{
      tx.executeSql('select * from items;', [], (_, {rows}) => setItems(rows._array));
    }, null, null);
  }

  const deleteItem = (id) => {  
    db.transaction(tx => {tx.executeSql('delete from items where id = ?;', [id]);}, null, updateList) 
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
            <Text style={{color:'#FF0000'}}
                  onPress={()=>deleteItem(item.id)}>
              Bought🧨
            </Text>
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
