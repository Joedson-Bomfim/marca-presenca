import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    botaoPrincipal: {
        padding: 4,
    },
    botaoProcuraAluno: {
        marginBottom: 30
    },
    botaoParaProcura: {
        marginBottom: 30
    },
    inputPadrao: {
        padding: 4,
    },
    inputModal: {
        marginBottom: 30
    },
    listaTabela: {
        marginBottom: 30,
        padding: 10,
    },
    marginBottomPadrao: {
        marginBottom: 30
    },
    buttonCadastraEdita: {
        marginBottom: 40
    },
    botaoCadastro:{
       width: 250, 
       marginTop: 10,
       alignSelf: 'center',
       padding: 4,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },
    informativo: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold"
    },
    tituloModal: {
        textAlign: 'center',
        fontSize: 20,
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
    },
    modalSelecinaAluno: {
        width: '80%',
        backgroundColor: '#557CE1',
        borderRadius: 8,
        padding: 20,
    },
    alinhamento: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botoesEditRegistro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
})

export default styles;