import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from'expo-sqlite';


export default function App() {

  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  const db = SQLite.openDatabase('coursedb.db');
  
  useEffect(() => {  
    db.transaction(tx => {    
      tx.executeSql('create table if not exists course (id integer primary key not null, credits int, title text);');
    }, null, updateList);
  }, []);
  
  const saveItem = () => {  
    db.transaction(tx => {    
      tx.executeSql('insert into course (credits, title) values (?, ?);',  
      [parseInt(credit), title]);
    }, null, updateList)
    setCredit('')
    setTitle('')
  }
  
  const updateList = () => {  
    db.transaction(tx => {    
      tx.executeSql('select * from course;', [], (_, { rows }) =>
            setCourses(rows._array)
                );
      }, null, null);
    }
  
    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from course where id = ?;`, [id]);
        }, null, updateList
      )    
    }
  
  return (
    <View style={styles.container}>
    <View style={{flex:1, marginTop:100}}>
     <TextInput
       style={{borderWidth:1, borderColor:'black', borderStyle:'solid', width:100, height:40}}
       placeholder='Title'
       onChangeText={title=>setTitle(title)}
       value={title}
     />
     <TextInput
        style={{borderWidth:1, borderColor:'black', borderStyle:'solid', width:100}}
        placeholder='Credits'
        keyboardType='numeric'
        onChangeText={credit=>setCredit(credit)}
        value={credit}
     />
    <Button onPress={saveItem} title="Save"/>
    </View>
    <FlatList   
    style={{marginLeft : "5%"}}  
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) =>
        <View style={styles.listcontainer}>
        <Text>{item.title},{item.credits} </Text>
        <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>done</Text>
        </View>}
            data={courses} /> 
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
  listcontainer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
