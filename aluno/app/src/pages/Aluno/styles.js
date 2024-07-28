import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fundoTela: {
        flex: 1,
    },
    fundoTelaCadastro: {
        flex: 1,
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold" 
    },
    tituloCadastro: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },
    informativoSobreSenha: {
        marginTop: 10,
        marginBottom: 10,
    },
    marginBottom: {
        marginBottom: 30
    },
    alunoPresencaMargin: {
        marginBottom: 100,
    },
})

export default styles;