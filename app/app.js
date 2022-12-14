const { query } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");
const porta = 3000;
const { MongoClient } = require('mongodb');

app.get("/",async (req, res) => {

            //res.send("Pagina Inicial 123");
            const mensagem = `${new Date().toISOString()}: chegou o request`;
            console.log(mensagem);

            var logStrem = fs.createWriteStream('logs/log.app.txt', { flags: 'a' });
            logStrem.write(mensagem);
            logStrem.write('\n');

            const connection = () => MongoClient
                      .connect("mongodb://adm:123@localhost:27017", 
                                {
                                  useNewUrlParser: true,
                                  useUnifiedTopology: true
                                })
                                .then((conn) => conn.db("usuario"), console.log("conectado!"))
                                .catch((err) => {
                                  console.error(err);
                                  process.exit(1);
                                });

            const db = await connection();
             var users = await db.collection("usuario").find().toArray();

            //res.status(200).json(users);
            res.send(users);
});

app.listen(porta, () => {
            console.log(`Escutando Porta: ${porta}`)
});
