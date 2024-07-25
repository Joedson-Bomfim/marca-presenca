import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fundoTela: {
        flex: 1,
        padding: 20
    },
    titulo: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 30,
    },
    tituloCadastro: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },
    alinhaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',  // Alinha verticalmente os botões ao centro
        paddingHorizontal: 20, // Adiciona espaçamento horizontal ao contêiner
        marginBottom: 20,
        padding: 10,
    },
    aviso: {
        marginBottom: 20,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
        
    },
    marginBottom: {
        marginBottom: 30
    }
})

export default styles;