import { FlatList, Text, View } from "react-native";

export default function HistoryScreen({route}){
    const navigationOptions={
        title:"History",
    };
    const {History}= route.params;

    return(
        <View>
            <Text>History</Text>
            <FlatList
                data={history}
                renderItem={({item})=> <Text style={{fontSize:18}}>{item.key}</Text>}
            />
        </View>
    );
}