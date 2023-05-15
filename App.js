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
import EditRecord from './screens/EditRecord';

const Stack = createNativeStackNavigator();

const App = function() {
    const db = SQLite.openDatabase("darevis");

    // PRIMORDIAL FOR ENABLING FOREIGN KEYS
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => {});

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

    const dropTables = function() {
        db.transaction(tx => {
            tx.executeSql("DROP TABLE Entry_Detail");
            tx.executeSql("DROP TABLE Entry_Data");
            tx.executeSql("DROP TABLE Parameter");
            tx.executeSql("DROP TABLE Record");
        });
    };

    const clearDB = function() {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM Entry_Detail");
            tx.executeSql("DELETE FROM Entry_Data");
            tx.executeSql("DELETE FROM Parameter");
            tx.executeSql("DELETE FROM Record");
        });
    };

    const selectFrom = function(table) {
        db.transaction(tx => tx.executeSql(
            `SELECT * FROM ${table}`, null,
            (txObj, resultSet) => console.log(resultSet.rows._array),
            (txObj, error) => console.log(error)
        ));
    };

    useEffect(() => {
        //dropTables();
        createIfNotExists();
        //clearDB();
        //selectFrom("Entry_Detail");
    }, []);

    return (
        <NavigationContainer>
            <StatusBar animated={true} hidden={false}/>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={Home}/>
                <Stack.Screen name='new record' component={NewRecord}/>
                <Stack.Screen name='record' component={Record}/>
                <Stack.Screen name='new entry' component={NewEntry}/>
                <Stack.Screen name='edit record' component={EditRecord}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;