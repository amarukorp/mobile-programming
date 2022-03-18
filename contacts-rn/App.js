import { StatusBar } from 'expo-status-bar';
import * as Contacts from 'expo-contacts';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers] })
      // console.log(data);
      if (data.length > 0) {
        setContact(data);
      }
    }
    console.log(contact);
  }

  return (
    <View style={styles.container}>
      <Text style={{ flex:1, fontSize: 24, marginTop:100, color:'green' }}>Contacts🤳🏽</Text>
      <FlatList
        style={{flex:3, marginTop:-450, width:'80%', height:'50%'}}
        data={contact}
        keyExtractor={item=>item.id}
        renderItem={({item})=>
        <View>
          <Text style={{fontSize:20, marginTop:10}}>{item.name}</Text>
          {
            item.phoneNumbers? <Text>{item.phoneNumbers[0].number}</Text>:
            <Text>No number available</Text>
          }
        </View>
        }
      />
      <View style={{marginBottom:30, marginTop:30}}>
      <Button title='Get contacts' onPress={getContacts} />
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
});
