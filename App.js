import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from 'expo-sqlite';
import { schema } from './migrations/schema';
import { useEffect } from 'react';
import NewRecord from './screens/NewRecord';

const Stack = createNativeStackNavigator();

const App = function() {
    const db = SQLite.openDatabase("darevis");

    useEffect(() => {
        schema.forEach((query) => {
            db.transaction(tx => {
                tx.executeSql(
                    query, null, null, 
                    (txObj, error) => console.log(error)
                );
            });
        });
    }, []);

    return (
        <NavigationContainer>
            <StatusBar animated={true} hidden={false}/>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={Home}/>
                <Stack.Screen name='new record' component={NewRecord}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;