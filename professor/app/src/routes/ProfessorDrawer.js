import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';

import ProfessorEdita from "../pages/Professor/ProfessorEdita";

import Perfil from '../pages/Perfil';

import Disciplina from '../pages/Disciplina';
import DisciplinaDetalhe from '../pages/Disciplina/DisciplinaDetalhe';
import DisciplinaCadastra from "../pages/Disciplina/DisciplinaCadastra";
import DisciplinaEdita from "../pages/Disciplina/DisciplinaEdita";

import Beacon from '../pages/Beacon';
import BeaconDetalhes from '../pages/Beacon/BeaconDetalhe';
import BeaconCadastra from '../pages/Beacon/BeaconCadastra';
import BeaconEdita from '../pages/Beacon/BeaconEdita';

import Teste from '../pages/Teste';

import TesteBanco from '../pages/Test';
import ProfessorTeste from '../pages/Test/professorTeste';
import DisciplinaTeste from '../pages/Test/disciplinaTeste';
import Tabela from '../pages/Test/tabelas';

import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste} />
      </Stack.Navigator>
    );
}

function PerfilStack() {
    return (
      <Stack.Navigator initialRouteName="Perfil">
        <Stack.Screen options={{ headerShown: false }} name="Perfil" component={Perfil} />
      </Stack.Navigator>
    );
}
  
function DisciplinaStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Disciplina" component={Disciplina} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaCadastra" component={DisciplinaCadastra} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaEdita" component={DisciplinaEdita} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaDetalhe" component={DisciplinaDetalhe} />
      </Stack.Navigator>
    );
}

function BeaconStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Beacon" component={Beacon} />
        <Stack.Screen options={{ headerShown: false }} name="BeaconCadastra" component={BeaconCadastra} />
        <Stack.Screen options={{ headerShown: false }} name="BeaconEdita" component={BeaconEdita} />
        <Stack.Screen options={{ headerShown: false }} name="BeaconDetalhes" component={BeaconDetalhes} />
      </Stack.Navigator>
    );
}

function TesteBancoStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Teste" component={TesteBanco} />
        <Stack.Screen options={{ headerShown: false }} name="ProfessorTeste" component={ProfessorTeste} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaTeste" component={DisciplinaTeste} />
        <Stack.Screen options={{ headerShown: false }} name="Tabela" component={Tabela} />
      </Stack.Navigator>
    );
}
  
export default function DrawerRoutes() {
    const { colors } = useTheme();

    return (
      <Drawer.Navigator 
        screenOptions={{ 
            title: '',
            drawerStyle:{
                backgroundColor: colors.primary,
                width: 250
            },
            drawerActiveTintColor: '#fff',
            headerStyle:{ backgroundColor: colors.primary },
            drawerLabelStyle: { color: colors.icone },
            headerTintColor: colors.icone,
            }}>
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            drawerIcon: () => <Icon name="home" color={colors.icone} size={40} />,
            drawerLabel: "Home",
          }}
        />
        <Drawer.Screen
          name="PerfilStack"
          component={PerfilStack}
          options={{
            drawerIcon: () => <Icon name="account-circle" color={colors.icone} size={40} />,
            drawerLabel: "Perfil",
          }}
        />
        <Drawer.Screen
          name="DisciplinaStack"
          component={DisciplinaStack}
          options={{
            drawerIcon: () => <Icon name="book" color={colors.icone} size={40}/>,
            drawerLabel: "Disciplinas",
          }}
        />
        <Drawer.Screen
          name="BeaconStack"
          component={BeaconStack}
          options={{
            drawerIcon: () => <Icon name="lighthouse-on" color={colors.icone} size={40} />,
            drawerLabel: "Beacons",
          }}
        />
        <Drawer.Screen
          name="TesteBancoStack"
          component={TesteBancoStack}
          options={{
            drawerIcon: () => <Icon name="database-search" color={colors.icone} size={40} />,
            drawerLabel: "Beacons",
          }}
        />
      </Drawer.Navigator>
    );
}
  