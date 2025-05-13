const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFile('logs.txt', mensagem, (err) => {
        if (err) throw err;
        console.log('Log registrado com sucesso!');
    });

    return id;
}


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post('/logs', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Nome do aluno é obrigatório' });

    const id = registrarLog(nome);
    res.status(201).json({ id, mensagem: 'Log registrado com sucesso' });
});

const fsPromises = require('fs').promises;

app.get('/logs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dados = await fsPromises.readFile('logs.txt', 'utf8');
        const linhas = dados.split('\n');
        const log = linhas.find(linha => linha.startsWith(id));

        if (log) {
            res.status(200).json({ log });
        } else {
            res.status(404).json({ erro: 'Log não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao ler o arquivo de logs' });
    }
});

app.get('/', (req, res) => {
    res.send('API de registro de logs está funcionando!');
});



