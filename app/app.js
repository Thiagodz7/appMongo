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
                      .connect("mongodb://adm:123@127.0.0.1:27017/usuario", 
                                {
                                  useNewUrlParser: true,
                                  useUnifiedTopology: true
                                })
                                .then((conn) => conn.db("usuario"))
                                .catch((err) => {
                                  console.error(err);
                                  process.exit(1);
                                });

           

            const db = await connection();
             var users = db.collection("usuario").find().toArray();

            res.status(200).json(users);
            res.send(users);
            // mongoose.connect(
            //   process.env.MONGODB_URI || "mongodb://adm:123@localhost:27017/usuario",
            //   {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //   },
            //   async (err) => {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       const usuarioSchema = new mongoose.Schema({
            //         nome: String,
            //         idade: Number
            //       }, { collection: 'usuario' }
            //       );
      
            //       const usuarios = mongoose.model('usuario', usuarioSchema, 'usuario');
       
            //       const docs = await usuarios.find({}).lean().exec();
            //       res.send("Conectado com sucesso\n", docs);
            //     }
            //   }
            // );

            // var mongoose = require('mongoose')
            // mongoose.connect("mongodb://adm:123@localhost:27017")
            // mongoose.connection.on('error', () => console.error('connection error:'))
            // mongoose.connection.on('open', () => console.error('connected'))

            // try{
            //   const usuario = await "usuario".find()
            //   res.send(usuario)
            // }catch(error){
            //   res.send(500,error)
            // }

});

app.listen(porta, () => {
            console.log(`Escutando Porta: ${porta}`)
});
