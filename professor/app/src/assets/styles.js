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
        marginBottom: 20
    },
    listaTabela: {
        marginBottom: 25,
        padding: 5,
    },
    lista: {
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    marginBottomPadrao: {
        marginBottom: 15
    },
    buttonCadastraEdita: {
        marginBottom: 20
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
        marginBottom: 12,
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
        backgroundColor: '#557CE1',
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
        marginBottom: 30,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    searchIcon: {
        padding: 10,
    },
    inputSearch: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        color: '#424242',
    },
})

export default styles;