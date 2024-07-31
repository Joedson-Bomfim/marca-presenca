import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderBottomColor: 'white'
    },
    containerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tituloModal: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 10,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    icon: {
        marginLeft: 10,
    },
    conteudoAlunoPresenca: {
        marginBottom: 20,
        padding: 5,
        alignItems: 'flex-start',
    },
    containerInputSetas: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoSeta: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      padding: 10,
      marginHorizontal: 8,
    },
    buttonTextSeta: {
      color: '#FFFFFF', 
      fontSize: 24,
    },
    ConteudoBotaoSeta: {
      fontWeight: 'bold',
      marginHorizontal: 10,
      color: '#FFFFFF', 
    },
})

export default styles;