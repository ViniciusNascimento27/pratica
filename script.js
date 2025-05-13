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
