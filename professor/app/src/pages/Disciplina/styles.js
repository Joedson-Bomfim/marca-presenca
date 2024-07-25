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
    tituloDois: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
    },
    subTitulo: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30,
        fontWeight: "bold"
    },
    detalhes: {
        fontSize: 20,
        fontWeight: "bold",  
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
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
        
    },
    marginBottom: {
        marginBottom: 30
    },
    buttonTouchable: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonTouchableSegundo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    fonteTextoTouchable: {
        fontSize: 20,
        color: '#fff',
    },
    dataIcone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    botaoSair: {     
        alignSelf: 'center',
        width: '40%',
        marginBottom: 15
    },
})

export default styles;