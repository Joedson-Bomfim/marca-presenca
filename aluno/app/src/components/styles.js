import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    containerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    botaoRedefinirId: {
        width: 130,
        alignSelf: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    conteudoAlunoPresenca: {
        marginBottom: 30,
        padding: 10,
        alignItems: 'flex-start',
    },
    marginBottom: {
        marginBottom: 10
    },
})

export default styles;