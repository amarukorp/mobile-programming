import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default function CalcScreen({navigation}){
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const calcSum = () => {
        const sum = parseInt(num1)+parseInt(num2);
        setResult(sum);
        setHistory([...history, {key: `${num1} + ${num2} = ${sum}`}]);
        setNum1('');
        setNum2('');
    }
    const calcSub = () => {
        const sub = parseInt(num1)-parseInt(num2);
        setResult(sub);
        setHistory([...history, {key: `${num1} - ${num2} = ${sub}`}]);
        setNum1('');
        setNum2('');
    }    

    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text>Simple Arithmetic Calculator</Text>
                <Text>Calculation Result: {result}</Text>
                <TextInput style={styles.input} keyboardType='numeric'
                    onChangeText={num1 => setNum1(num1)}
                    value={num1}
                />
                <TextInput style={styles.input} keyboardType='numeric'
                    onChangeText={num2 => setNum2(num2)}
                    value={num2}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                <Button onPress={addition} title='    +    ' />
                <Button onPress={subtraction} title='     -    ' />
                <Button onPress={() => navigation.navigate('History', { history: history })}
                    title="History" />
            </View>

        </View>
    );
}
function HistoryScreen(props){
    navigationOptions= {
        title: 'History',
    };
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
  