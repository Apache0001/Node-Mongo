const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://localhost/fseletro", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Conectado com ao mongo, Banco "fseletro" ');
    })
    .catch((erro) => {
      console.log(`Houve um erro inesperado: ${erro}`);
    });
}

module.exports = connect()
