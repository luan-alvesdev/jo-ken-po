const pedra = {
    valor: 0,
    nome: "pedra"
}

const papel = {    
    valor: 1,
    nome: "papel"
}

const tesoura = {
    valor: 2,
    nome: "tesoura"
}

function jogar(jogadaUsuario, jogadaMaquina) {

    if (jogadaMaquina === jogadaUsuario) {
        return 'c';
        // C = empate
    }

    if (
        (jogadaMaquina === pedra.valor && jogadaUsuario === tesoura.valor) || 
        (jogadaMaquina === tesoura.valor && jogadaUsuario === papel.valor) || 
        (jogadaMaquina === papel.valor && jogadaUsuario === pedra.valor))
    {
        return "b";
        // B maquina venceu
    } else {
        return `a`;
        // jogador venceu = a
    }
}

module.exports = jogar;


// Math.floor(Math.random() * 3))