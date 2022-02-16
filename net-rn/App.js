import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import { useState } from 'react';


export default function App() {
  const [repositories, setRepositories ] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchData=()=>{
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => response.json())
    .then(responseData => setRepositories(responseData.items))
    .catch(err=>Alert.alert('Something went wrong', "error"))
  }

  const listSeparator = ()=>{
    return(
      <View
      style={{
        height:1,
        width:"90%",
        backgroundColor:"black",
        marginLeft:"5%",
      }}>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={listSeparator}
        keyExtractor={item=>item.id}
        renderItem={({item})=>
        <View>
          <Text style={{fontSize:18, fontWeight:'bold'}}>{item.full_name}</Text>
          <Text style={{fontSize:14, fontWeight:'normal', fontStyle:'italic'}}>{item.description}</Text>

        </View>
        }
      />
      <TextInput
        style={{width: 200, borderColor: 'gray', borderWidth:1 }}
        placeholder='Search by keyword'
        onChangeText={text=>setKeyword(text)}
      />
      <Button title='Search'onPress={fetchData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 50,
    marginLeft:10,
    marginRight:10,
    
  },
});
