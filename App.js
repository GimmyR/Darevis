import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from 'expo-sqlite';
import { schema } from './migrations/schema';
import { useEffect } from 'react';
import NewRecord from './screens/NewRecord';
import Record from './screens/Record';
import NewEntry from './screens/NewEntry';

const Stack = createNativeStackNavigator();

const App = function() {
    const db = SQLite.openDatabase("darevis");

    const createIfNotExists = function() {
        schema.forEach((query) => {
            db.transaction(tx => {
                tx.executeSql(
                    query, null, null, 
                    (txObj, error) => console.log(error)
                );
            });
        });
    };

    const clearDB = function() {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM Parameter");
            tx.executeSql("DELETE FROM Record");
        });
    };

    useEffect(() => {
        createIfNotExists();
        //clearDB();
    }, []);

    return (
        <NavigationContainer>
            <StatusBar animated={true} hidden={false}/>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={Home}/>
                <Stack.Screen name='new record' component={NewRecord}/>
                <Stack.Screen name='record' component={Record}/>
                <Stack.Screen name='new entry' component={NewEntry}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;