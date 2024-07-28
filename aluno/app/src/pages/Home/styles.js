// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0' // Define a cor de fundo como você deseja
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha verticalmente no centro
        marginBottom: 20 // Adiciona espaço abaixo
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold",
        flex: 1, // Faz com que o texto ocupe o espaço restante
        textAlign: 'center'
    },
    subTitulo: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10 // Adiciona espaço entre o subtítulo e o UUID
    },
    marginBottom: {
        marginBottom: 30
    },
    parteInferior: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao: {
        padding: 10,
    }
});

export default styles;