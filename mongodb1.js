let MongoClient = require('mongodb').MongoClient;

// URL de conexão
let mongoServer = 'mongodb://localhost:27017/';

// Conecta no servidor do MongoDB
MongoClient.connect(mongoServer, function(err, client) {
    if (err) return callback(err);

    // Seleciona o banco de dados 'livro'
    let db = client.db('starwars');

    // Seleciona a collection (lista) dos planetas
    let planetas = db.collection('planetas');

    // Busca todos os planetas
    planetas.find({}).toArray(function(error, results) {

        // Percorre o array e imprime o nome de cada planeta
        for(let planeta of results) {
            console.log(planeta)
        }
    });
});