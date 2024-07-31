import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fundoTela: {
        flex: 1,
        padding: 20
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
        fontSize: 15,
    },
})

export default styles;