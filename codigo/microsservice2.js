// microsservico-recomendacao.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3002;

app.use(bodyParser.json());


///STATUS NORMAL
// {
// 	"freqRespiratoria": 8,
// 	"freqCardiaca": 87,
// 	"pressaoArterial": 200,
// 	"temperaturaCorporal": 37.5,
// 	"estadoConsciencia": "Alerta"
// }

///STATUS MODERADO
// {
// 	"freqRespiratoria": 21,
// 	"freqCardiaca": 91,
// 	"pressaoArterial": 101,
// 	"temperaturaCorporal": 38.5,
// 	"estadoConsciencia": "Alerta"
// }

///STATUS ALERTA
// {
// 	"freqRespiratoria": 21,
// 	"freqCardiaca": 91,
// 	"pressaoArterial": 101,
// 	"temperaturaCorporal": 38.5,
// 	"estadoConsciencia": "Responde a estímulos"
// }

///STATUS CRÍTICO
// {
// 	"freqRespiratoria": 21,
// 	"freqCardiaca": 91,
// 	"pressaoArterial": 101,
// 	"temperaturaCorporal": 39.1,
// 	"estadoConsciencia": "Responde a estímulos"
// }


app.post('/recomendacao', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/pontos', {
      params: {
        freqRespiratoria: req.body.freqRespiratoria,
        freqCardiaca: req.body.freqCardiaca,
        pressaoArterial: req.body.pressaoArterial,
        temperaturaCorporal: req.body.temperaturaCorporal,
        estadoConsciencia: req.body.estadoConsciencia
      }
    });

    const pontos = response.data.pontos;



    const recomendacao = gerarRecomendacao(pontos); 

    res.json({ pontos, recomendacao });
  } catch (error) {
    console.error('Erro ao obter pontos do Microsserviço 1', error.message);
    res.status(500).json({ error: 'Erro ao obter pontos do Microsserviço 1' });
  }
});
app.listen(port, () => {
  console.log(`Microsserviço de Recomendação rodando na porta ${port}`);
});

function gerarRecomendacao(pontos) {
  if (pontos===0) {
    return 'STATUS: NORMAL. Monitoramento a cada 12 horas!';
  } else if(pontos >=1 && pontos<=4) {
    return 'STATUS: MODERADO. Monitoramente entre 4 e 6 horas!';
  }else if(pontos >=5 && pontos <=6){
    return 'STATUS: ALERTA. Monitoramente a cada 1 hora';
  }else{
    return 'STATUS: CRÍTICO. Controle contínuo de sinais';
  }
}
