const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')

roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.fornecedor.id)
    resposta.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id
        const corpo = requisicao.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        resposta.status(201)
        resposta.send(produto)
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.fornecedor.id
    }

    const produto = new Produto(dados)
    await produto.apagar()
    resposta.status(204)
    resposta.end()
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        }
    
        const produto = new Produto(dados)
        await produto.carregar()
        resposta.send(
            JSON.stringify(produto)
        )
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador