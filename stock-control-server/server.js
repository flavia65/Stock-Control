// require('dotenv').config()
console.log(process.env.PORT)

const express = require('express')
const cors = require('cors')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const app = express()
const port = process.env.PORT //const port = 5501

app.use(express.json())
app.use(cors())

const credentials = { client_email: process.env.CLIENT_EMAIL, private_key: process.env.PRIVATE_KEY?.replace(/\\n/g,'\n')} //const credentials = require('./credentials.json')

const sheetID = "1jBkKm4OnP4qFfF4X9n-lYIJFA18H8-U6d2ySpWAiKy8"

const serviceAccountAuth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const doc = new GoogleSpreadsheet(sheetID, serviceAccountAuth)

app.use(async (req, res, next) => {
    try {
        await doc.loadInfo()
        req.sheet = doc.sheetsByIndex[0]
        next()
    } catch (error) {
        console.error('Erro ao conectar com o Google Sheets:', error)
        res.status(500).json({ error: 'Erro ao conectar com o Google Sheets.' })
    }
})

app.get('/produtos', async (req, res) => {
    try {
        const rows = await req.sheet.getRows()
        const produtos = rows.map(row => row.toObject())
        res.json(produtos)
    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        res.status(500).json({ error: 'Erro ao buscar produtos.' })
    }
})

app.post('/produtos', async (req, res) => {
    const { nome, codigo, quantidade, preco } = req.body; // Campos que você espera do frontend

    if (!nome || !codigo || !quantidade || !preco) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
    }

    try {
        const newRow = await req.sheet.addRow({ Nome: nome, Codigo: codigo, Quantidade: quantidade, Preco: preco })
        res.status(201).json({ message: 'Produto adicionado com sucesso!', produto: newRow.toObject() })
    } catch (error) {
        console.error('Erro ao adicionar produto:', error)
        res.status(500).json({ error: 'Erro ao adicionar produto.' })
    }
})

app.put('/produtos/:codigo', async (req, res) => {
    const { codigo } = req.params
    const { nome, quantidade, preco } = req.body

    try {
        const rows = await req.sheet.getRows();
        const produtoParaEditar = rows.find(row => row.Codigo === codigo)

        if (!produtoParaEditar) {
            return res.status(404).json({ error: 'Produto não encontrado.' })
        }

        if (nome) produtoParaEditar.Nome = nome
        if (quantidade) produtoParaEditar.Quantidade = quantidade
        if (preco) produtoParaEditar.Preco = preco

        await produtoParaEditar.save();
        res.json({ message: 'Produto atualizado com sucesso!', produto: produtoParaEditar.toObject() })
    } catch (error) {
        console.error('Erro ao editar produto:', error)
        res.status(500).json({ error: 'Erro ao editar produto.' })
    }
})



app.delete('/produtos/:codigo', async (req, res) => {
    const { codigo } = req.params; // Código vindo da URL, ex: "gfhfhjdkdl"

    console.log(`[DELETE] Requisição recebida para deletar produto com Código da URL: "${codigo}"`);

    try {
        await req.sheet.loadHeaderRow(); // Garante que os cabeçalhos são carregados
        const rows = await req.sheet.getRows(); // Obtém todas as linhas de dados

        if (!rows || rows.length === 0) {
            console.log("[DELETE] Planilha vazia ou sem dados.");
            return res.status(404).json({ error: 'Nenhum produto encontrado na planilha.' });
        }

        console.log(`[DELETE] Total de linhas lidas da planilha: ${rows.length}`);
        console.log("[DELETE] Cabeçalhos da planilha:", req.sheet.headerValues); // Verifique se 'Codigo' está aqui

        let produtoParaDeletar = null;

        // Itera sobre as linhas para encontrar o produto
        for (const row of rows) {
            // Converte a linha para um objeto plano para garantir acesso aos valores
            const rowData = row.toObject();

            // Acessa a propriedade 'Codigo' do objeto plano
            // Garante que o valor existe antes de tentar convertê-lo e trimar
            if (rowData.Codigo !== undefined && rowData.Codigo !== null) {
                const sheetCodigo = String(rowData.Codigo).trim();
                const paramCodigo = String(codigo).trim();

                console.log(`  Verificando Linha: Planilha "${sheetCodigo}" | URL "${paramCodigo}" | Match: ${sheetCodigo === paramCodigo}`);

                if (sheetCodigo === paramCodigo) {
                    produtoParaDeletar = row; // Mantém a referência à linha original para poder deletar
                    break; // Encontrou o produto, pode sair do loop
                }
            } else {
                // Isso só será logado se a célula 'Codigo' *realmente* estiver vazia na planilha
                console.log(`  Aviso: A célula 'Codigo' na linha está vazia ou não existe. Objeto da linha:`, rowData);
            }
        }


        if (!produtoParaDeletar) {
            console.log(`[DELETE] Produto com Código "${codigo}" NÃO encontrado após a busca.`);
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Se o produto foi encontrado:
        console.log(`[DELETE] Produto encontrado para deleção:`, produtoParaDeletar.toObject());
        await produtoParaDeletar.delete(); // Deleta a linha da planilha
        console.log(`[DELETE] Produto com Código "${codigo}" deletado com sucesso.`);
        res.json({ message: 'Produto apagado com sucesso!' });

    } catch (error) {
        console.error('[DELETE] Erro ao processar deleção:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao tentar deletar o produto.' });
    }
});

app.listen(port, () => {
    console.log(`API de controle de estoque rodando em http://localhost:${port}`)
})

// node server.js ===> para iniciar
// Ctrl + C ===> para parar