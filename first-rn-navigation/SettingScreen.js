import { StyleSheet, View, Text } from "react-native";

export default function SettingScreen () {
    return(
        <View style={styles.container}>
            <Text style={{fontSize:20}}>Settings screen 🛠</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });