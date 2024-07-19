import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

// Exemplo de cálculo responsivo
const fontSize = width < 360 ? 14 : 18;

const styles = StyleSheet.create({
    fundoTela: {
        flex: 1,
        padding: 20
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 15,
    },
    tituloCadastro: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },
    marginBottom: {
        marginBottom: 30
    },
    lista:{
        padding: 10
    },
    id: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F4AA61',
    },
    primeiro: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#65D863',
    },
    complemento:{
        fontSize: 20,
    },
    linhaConteudo: {
        flexDirection: 'row'
    },
    botaoApagaTudo: {
        width: 180,
        backgroundColor: '#EE7152',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 10,
    }
})

export default styles;