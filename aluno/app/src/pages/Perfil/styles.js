import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fundoTela: {
        flex: 1,
        padding: 20
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    tituloDadosPessoais: {
        fontSize: 30,
        fontWeight: "bold"
    },
    tituloDisciplinas: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30
    },
    conteudo: {
        fontSize: 25
    },
    linhaConteudo: {
        flexDirection: 'row'
    },
    botaoSair: {     
        marginTop: 20,
        backgroundColor: '#EE7152',
        alignSelf: 'center',
        width: '40%'
    }
})

export default styles;