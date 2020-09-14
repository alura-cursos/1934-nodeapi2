const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')

roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.params.idFornecedor)
    resposta.send(
        JSON.stringify(produtos)
    )
})

module.exports = roteador