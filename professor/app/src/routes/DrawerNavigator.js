import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';

import MarcaPresencaP1 from '../pages/MarcaPresenca/selecionaDisciplinaAula';
import MarcaPresencaP2 from '../pages/MarcaPresenca/marcarPresenca';

import Perfil from '../pages/Perfil';

import Aluno from '../pages/Aluno';
import AlunoForm from "../pages/Aluno/AlunoForm";

import Disciplina from '../pages/Disciplina';
import DisciplinaDetalhe from '../pages/Disciplina/DisciplinaDetalhe';
import DisciplinaForm from "../pages/Disciplina/DisciplinaForm";
import DisciplinaAluno from "../pages/Disciplina/DisciplinaAluno";

import AulaForm from "../pages/Disciplina/AulaForm";
import Aulas from "../pages/Disciplina/Aulas";

import PresencaForm from "../pages/Disciplina/PresencaForm";

import Presenca from '../pages/Presenca';

import PresencaAula from '../pages/Disciplina/PresencaAula';

import Sobre from '../pages/Sobre';

import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="MarcaPresencaP1" component={MarcaPresencaP1} />
        <Stack.Screen options={{ headerShown: false }} name="MarcaPresencaP2" component={MarcaPresencaP2} />
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

function AlunoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Aluno" component={Aluno} />
      <Stack.Screen options={{ headerShown: false }} name="AlunoForm" component={AlunoForm} />
    </Stack.Navigator>
  );
}
  
function DisciplinaStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Disciplina" component={Disciplina} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaForm" component={DisciplinaForm} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaAluno" component={DisciplinaAluno} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaDetalhe" component={DisciplinaDetalhe} />
        <Stack.Screen options={{ headerShown: false }} name="AulaForm" component={AulaForm} />
        <Stack.Screen options={{ headerShown: false }} name="Aulas" component={Aulas} />
        <Stack.Screen options={{ headerShown: false }} name="PresencaAula" component={PresencaAula} />
        <Stack.Screen options={{ headerShown: false }} name="PresencaForm" component={PresencaForm} />
      </Stack.Navigator>
    );
}

function PresencaStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Presenca" component={Presenca} />
      </Stack.Navigator>
    );
}

function SobreStack() {
    return (
      <Stack.Navigator initialRouteName="Sobre">
        <Stack.Screen options={{ headerShown: false }} name="Sobre" component={Sobre} />
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
          name="AlunoStack"
          component={AlunoStack}
          options={{
            drawerIcon: () => <Icon name="account-group" color={colors.icone} size={40} />,
            drawerLabel: "Alunos",
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
          name="PresencaStack"
          component={PresencaStack}
          options={{
            drawerIcon: () => <Icon name="clipboard-multiple" color={colors.icone} size={40} />,
            drawerLabel: "Presença",
          }}
        />
        <Drawer.Screen
          name="SobreStack"
          component={SobreStack}
          options={{
            drawerIcon: () => <Icon name="file-search" color={colors.icone} size={40} />,
            drawerLabel: "Sobre o Projeto",
          }}
        />
      </Drawer.Navigator>
    );
}
  