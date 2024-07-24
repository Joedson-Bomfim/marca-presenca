import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const Routes = () => {
     return(
        <NavigationContainer>
            <DrawerNavigator></DrawerNavigator>   
        </NavigationContainer>
    )
}

export default Routes;