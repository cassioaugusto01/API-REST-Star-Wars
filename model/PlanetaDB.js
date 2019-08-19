// Importa a biblioteca do Mongo
let db = require('./mongodb');
// Objeto usado como id no mongo
let ObjectId = require('mongodb').ObjectID;

function getQuantidadeAparicoes(planetaNome, callback){
    require('http').request('https://swapi.co/api/planets/?search='+planetaNome+'&format=json',
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
                 var myObj = JSON.parse(body);

                if(myObj.results != ''){
                       if(myObj.results[0].name == planetaNome){
                          return callback(true, myObj.results[0].films.length);
                      }
                }
          }
          return callback(false);
      });
    }

// Classe PlanetaDB
class PlanetaDB {
    // retorna a quantidade de aparições do planeta pelo nome


    // Retorna a lista de planetas
    static getPlanetas() {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            planetas.find({}).toArray(function(error, result) {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

	// Retorna a lista de planetas por clima do banco de dados
	static getPlanetasByClima(clima) {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            planetas.find({"clima":clima}).toArray(function(error, result) {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }
    	// Retorna a lista de planetas por nome do banco de dados
	static getPlanetasByNome(nome) {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            planetas.find({"nome":nome}).toArray(function(error, result) {
                if (error) return reject(error);
                resolve(result);
            });
        });
	}
    // Retorna o planeta pelo id 
	static getPlanetaById(id) {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            planetas.findOne({"_id":ObjectId(id)},function(error, result) {
                console.log(error);
                console.log(result);
                if (error) return reject(error);
                resolve(result);
            });
        });
	}
	// Salva um planeta no banco de dados.
	// Recebe o JSON com dados do planeta como parâmetro.
	static save(planeta) {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            //let aparicoes = getQuantidadeAparicoes(planeta.nome);
            //planeta.aparicoes = aparicoes;
            planetas.insert(planeta, function (error, response) {
                if(error) {
                    reject(error);
                } else {
                    resolve(planeta);
                }
            });
        });
	}

	// Atualiza um planeta no banco de dados.
	static update(planeta) {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            // Salva o id do planeta em uma variável
            let id = planeta._id;
            // Remove o id do JSON
            delete planeta._id;
            // Atualiza o planeta pelo id
            planetas.update( {"_id":ObjectId(id)} ,planeta, function (error, response) {
                if(error) {
                    reject(error);
                } else {
                    resolve(planeta);
                }
            });
        });
	}

	// Deleta um planeta pelo id.
	static deleteById(id) {
        return new Promise(function (resolve, reject) {
            let planetas = db.get().collection('planetas');
            planetas.removeOne({"_id":ObjectId(id)},function(error, r) {
                if (error) return reject(error);
                // Retorna a qtde de registros deletados
                resolve(r.result.n);
            });
        });
	}
}

module.exports = PlanetaDB;
