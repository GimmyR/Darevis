import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const App = function() {
    return (
        <NavigationContainer>
            <StatusBar animated={true} hidden={false} backgroundColor='#ffffff'/>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;