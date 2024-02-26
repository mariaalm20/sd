// microsservico-ponto.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/pontos', (req, res) => {
  const {  freqRespiratoria,
    freqCardiaca,
    pressaoArterial,
    temperaturaCorporal,
    estadoConsciencia } = req.query;

  // Lógica para calcular pontos
  const pontos = calcularPontos(freqRespiratoria, freqCardiaca, pressaoArterial, temperaturaCorporal, estadoConsciencia);
  res.json({ pontos });
});

app.listen(port, () => {
  console.log(`Microsserviço de Ponto rodando na porta ${port}`);
});

function calcularPontos(
  freqRespiratoria,
  freqCardiaca,
  pressaoArterial,
  temperaturaCorporal,
  estadoConsciencia
) {
  let pontos = 0;

  // Frequência Respiratória
  if (freqRespiratoria >= 8 && freqRespiratoria <= 20) {
    pontos += 0;
  } else if (freqRespiratoria >= 21 && freqRespiratoria <= 24) {
    pontos += 1;
  } else if (freqRespiratoria >= 25) {
    pontos += 2;
  }

  // Frequência Cardíaca
  if (freqCardiaca >= 51 && freqCardiaca <= 90) {
    pontos += 0;
  } else if (freqCardiaca >= 91 && freqCardiaca <= 110) {
    pontos += 1;
  } else if (freqCardiaca >= 111 && freqCardiaca <= 130) {
    pontos += 2;
  } else if (freqCardiaca >= 131) {
    pontos += 3;
  }

  // Pressão Arterial Sistólica
  if (pressaoArterial >= 111) {
    pontos += 0;
  } else if (pressaoArterial >= 101 && pressaoArterial <= 110) {
    pontos += 1;
  } else if (pressaoArterial >= 91 && pressaoArterial <= 100) {
    pontos += 2;
  } else if (pressaoArterial <= 90) {
    pontos += 3;
  }

  // Temperatura Corporal
  if (temperaturaCorporal >= 36.1 && temperaturaCorporal <= 38.0) {
    pontos += 0;
  } else if (
    (temperaturaCorporal >= 35.1 && temperaturaCorporal <= 36.0) ||
    (temperaturaCorporal >= 38.1 && temperaturaCorporal <= 39.0)
  ) {
    pontos += 1;
  } else if (temperaturaCorporal <= 35.0 || temperaturaCorporal >= 39.1) {
    pontos += 3;
  }


  // Estado de Consciência
  if (estadoConsciencia === 'Alerta') {
    pontos += 0;
  } else if (estadoConsciencia === 'Responde a estímulos') {
    pontos += 1;
  }

  return pontos;
}

