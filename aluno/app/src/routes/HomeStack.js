import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import AlunoEdita from '../pages/Aluno/AlunoEdita';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>
            <Stack.Screen options={{ headerShown: false }} name="AlunoEdita" component={AlunoEdita}/>
        </Stack.Navigator>
    )
}

export default Routes;