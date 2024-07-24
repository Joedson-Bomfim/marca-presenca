import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';

import MarcaPresencaP1 from '../pages/MarcaPresenca/selecionaDisciplinaAula';
import MarcaPresencaP2 from '../pages/MarcaPresenca/marcarPresenca';

import ProfessorEdita from "../pages/Professor/ProfessorEdita";

import Perfil from '../pages/Perfil';

import Aluno from '../pages/Aluno';
import AlunoDetalhe from '../pages/Aluno/AlunoDetalhe';
import AlunoForm from "../pages/Aluno/AlunoForm";

import Disciplina from '../pages/Disciplina';
import DisciplinaDetalhe from '../pages/Disciplina/DisciplinaDetalhe';
import DisciplinaCadastra from "../pages/Disciplina/DisciplinaCadastra";
import DisciplinaEdita from "../pages/Disciplina/DisciplinaEdita";

import Presenca from '../pages/Presenca';
import PresencaDetalhe from '../pages/Presenca/PresencaDetalhe';
//import DisciplinaEdita from "../pages/Presenca/DisciplinaEdita";

import Teste from '../pages/Teste';
import TesteMelhorado from '../pages/Teste/testeMelhorado';

import TesteBanco from '../pages/Test';
import ProfessorTeste from '../pages/Test/professorTeste';
import DisciplinaTeste from '../pages/Test/disciplinaTeste';
import AlunoTeste from '../pages/Test/alunoTeste';
import AlunoDisciplinaTeste from '../pages/Test/alunoDisciplinaTeste';
import AulaTeste from '../pages/Test/aulaTeste';
import PresencaTeste from '../pages/Test/presencaTeste';
import Tabela from '../pages/Test/tabelas';

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
        <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste} />
        <Stack.Screen options={{ headerShown: false }} name="TesteMelhorado" component={TesteMelhorado} />
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
      <Stack.Screen options={{ headerShown: false }} name="AlunoDetalhe" component={AlunoDetalhe} />
      <Stack.Screen options={{ headerShown: false }} name="AlunoForm" component={AlunoForm} />
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

function PresencaStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Presenca" component={Presenca} />
      </Stack.Navigator>
    );
}

function TesteBancoStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Teste" component={TesteBanco} />
        <Stack.Screen options={{ headerShown: false }} name="ProfessorTeste" component={ProfessorTeste} />
        <Stack.Screen options={{ headerShown: false }} name="DisciplinaTeste" component={DisciplinaTeste} />
        <Stack.Screen options={{ headerShown: false }} name="AlunoTeste" component={AlunoTeste} />
        <Stack.Screen options={{ headerShown: false }} name="AlunoDisciplinaTeste" component={AlunoDisciplinaTeste} />
        <Stack.Screen options={{ headerShown: false }} name="AulaTeste" component={AulaTeste} />
        <Stack.Screen options={{ headerShown: false }} name="PresencaTeste" component={PresencaTeste} />
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
          name="TesteBancoStack"
          component={TesteBancoStack}
          options={{
            drawerIcon: () => <Icon name="database-search" color={colors.icone} size={40} />,
            drawerLabel: "BD Teste",
          }}
        />
      </Drawer.Navigator>
    );
}
  