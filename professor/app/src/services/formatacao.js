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

export function dataHora() {
    return new Date();
}

export function obterDataAtualBrasileira() {
    const dataAtual = new Date();
    return formataDataHora(dataAtual).split(' ')[0]; // Retorna apenas a data no formato brasileiro
}