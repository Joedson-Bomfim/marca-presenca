import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfessorDrawer from './ProfessorDrawer';

const Stack = createNativeStackNavigator();

const Routes = () => {
     return(
        <NavigationContainer>
            <ProfessorDrawer></ProfessorDrawer>   
        </NavigationContainer>
    )
}

export default Routes;