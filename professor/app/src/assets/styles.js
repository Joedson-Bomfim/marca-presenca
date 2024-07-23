import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    botaoPrincipal: {
        padding: 4,
    },
    inputPadrao: {
        padding: 4,
    },
    buttonCadastraEdita: {
        marginBottom: 40
    },
    botaoCadastro:{
       width: 200, 
       marginTop: 10,
       alignSelf: 'center',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo do modal, com transparência
    },
        modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
    }
})

export default styles;