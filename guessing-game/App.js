import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';


export default function App() {
  //defining states for the guess and the text result
 const [text, setText] = useState('');
 const [guessnum, setGuessnum] = useState('');
 const [count, setCount] = useState(1);
 const [rndnum, setRndnum] = useState(0);
  
 useEffect(()=> resetGame(), [])

 const resetGame = () => {
   setRndnum(Math.floor(Math.random() * 100 ) + 1);
   setText('Guess a number between 1-100');
   setCount(1);
   setGuessnum('');
 }

 const makeGuess = () => {
   if(rndnum === parseInt(guessnum)){
     Alert.alert(`You guessed the number in ${count} guesses`);
     resetGame();
   }
   else if (rndnum < parseInt(guessnum)){
     setText(`Your guess ${guessnum} is too high`);
     setGuessnum('');
   }
   else {
     setText(`Your guess ${guessnum} is too low`);
     setGuessnum('');
   }
   
   setCount(prevCount => prevCount+1);
 
  }
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput 
        style={{width:200, borderColor: 'black', borderWidth:1}}
        onChangeText={guessnum =>setGuessnum(guessnum)}
        value={guessnum}
        keyboardType='numeric'
      />
      <Button  onPress={makeGuess}title='Make Guess'/>
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
