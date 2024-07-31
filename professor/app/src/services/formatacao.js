export function formataDataHora(dataHora) {
    return `${dataHora.getDate().toString().padStart(2, '0')}/` +
           `${(dataHora.getMonth() + 1).toString().padStart(2, '0')}/` +
           `${dataHora.getFullYear()} ` +
           `${dataHora.getHours().toString().padStart(2, '0')}:` +
           `${dataHora.getMinutes().toString().padStart(2, '0')}:` +
           `${dataHora.getSeconds().toString().padStart(2, '0')}`;
}

export function formataDataHoraPadraoAmericano(dataHora) {
    return `${dataHora.getFullYear()}-` +
           `${(dataHora.getMonth() + 1).toString().padStart(2, '0')}-` +
           `${dataHora.getDate().toString().padStart(2, '0')} ` +
           `${dataHora.getHours().toString().padStart(2, '0')}:` +
           `${dataHora.getMinutes().toString().padStart(2, '0')}:` +
           `${dataHora.getSeconds().toString().padStart(2, '0')}`;
}

export function converteDataBrasileiraParaAmericana(dataBrasileira) {
    const [dia, mes, ano] = dataBrasileira.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

export function converteDataAmericanaParaBrasileira(dataAmericana) {
    const [ano, mes, dia] = dataAmericana.split('-');
    return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
}

export function dataHora() {
    return new Date();
}

export function obterDataAtualBrasileira() {
    const dataAtual = new Date();
    return formataDataHora(dataAtual).split(' ')[0]; // Retorna apenas a data no formato brasileiro
}

const formatarComDoisDigitos = (numero) => numero.toString().padStart(2, '0');

export function obterDataHoraAtualParaNomeArquivo() {
    const dataAtual = new Date();
    return `${formatarComDoisDigitos(dataAtual.getDate())}-${formatarComDoisDigitos(dataAtual.getMonth() + 1)}-${dataAtual.getFullYear()}_${formatarComDoisDigitos(dataAtual.getHours())}-${formatarComDoisDigitos(dataAtual.getMinutes())}-${formatarComDoisDigitos(dataAtual.getSeconds())}`;
};

export function formatUUID(uuid, visibleLength = 8, fillerLength = 10, fillerChar = '*'){
    if (uuid.length <= (visibleLength * 2 + fillerLength)) return uuid; // Handle short UUIDs

    const firstPart = uuid.slice(0, visibleLength); // Primeiro grupo de caracteres
    const lastPart = uuid.slice(-visibleLength); // Últimos caracteres
    const maskedPart = fillerChar.repeat(fillerLength); // Filler para o meio

    return `${firstPart}${maskedPart}${lastPart}`;
};

function varDump(variavel) {
    return JSON.stringify(variavel, null, 2);
}