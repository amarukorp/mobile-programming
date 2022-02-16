import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import {useState} from "react"

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const fetchData= ()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response=> response.json())
    .then(responseData => setMeals(responseData.meals))
    .catch(err=>console.error(err))
  }
const listSeparator= ()=>{
  return(
    <View
      style={{
        height:1,
        width:"90%",
        backgroundColor:'black'
      }}
    />
  );
}

  return (
    <View style={styles.container}>
    <FlatList
      data={meals}
      keyExtractor={item=>item.idMeal}
      ItemSeparatorComponent={listSeparator}
      renderItem={({item})=>
      <View>
        <Text style={{fontSize:18, fontWeight:"bold"}}>{item.strMeal}</Text>
        <Image 
        style={{ width:100, height:100}}
        source={{uri: item.strMealThumb}}
        />
      </View>
      }
    />

      <TextInput
        style={{width:200, borderColor:'black', borderWidth:1}}
        placeholder="Ingridient"
        onChangeText={text=>setKeyword(text)}
      />
      <Button title="Search by ingridient" onPress={fetchData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    marginBottom:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
