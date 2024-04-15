// app.js
const express = require('express');
const Graph = require('./class/Grafo');
const app = express();
const port = 3000;

const g = new Graph();

//EXEMPLO 1: Adicionando nós (vertices)
g.addVertex("agp");
g.addVertex("bateria");
g.addVertex("cooler");
g.addVertex("ddr");    
g.addVertex("eLed");            
g.addVertex("fonte");
g.addVertex("gabinete");
g.addVertex("hd");
g.addVertex("interface-memoria");
g.addVertex("jumper");
//EXEMPLO 1: Adicionando arestas
g.addEdge("agp", "bateria");
g.addEdge("agp", "cooler");
g.addEdge("bateria", "gabinete");
g.addEdge("gabinete", "jumper");
g.addEdge("jumper", "interface-memoria");
g.addEdge("interface-memoria", "eLed");
g.addEdge("gabinete", "hd");
g.addEdge("hd", "fonte");
g.addEdge("bateria", "fonte");
g.addEdge("fonte", "ddr");
g.addEdge("bateria", "cooler");
g.addEdge("cooler", "ddr");

const g2 = new Graph();

//EXEMPLO 2: Adicionando nós (vertices)
g2.addVertex("fonte");
g2.addVertex("agp");
g2.addVertex("bateria");
g2.addVertex("cooler");
g2.addVertex("ddr");    
g2.addVertex("eLed");            

//EXEMPLO 2: Adicionando arestas
g2.addEdge("agp", "bateria");
g2.addEdge("agp", "ddr");
g2.addEdge("bateria", "cooler");
g2.addEdge("ddr", "eLed");
g2.addEdge("cooler", "eLed");
g2.addEdge("cooler", "ddr");

//EXEMPLO 3: Adicionando arestas
const g3 = new Graph();
g3.addEdge("agp", "bateria");
g3.addEdge("bateria", "carro");
g3.addEdge("carro", "agp");

app.use('/backend/image', express.static(__dirname + '/image'));

console.log(__dirname)

app.get('/', (req, res) => {
    const result = g.topologicalSort();
    const result2 = g2.topologicalSort();
    const result3 = g3.topologicalSort();
    res.send(`
        <h2>Trabalho 1 - Projeto de Algoritmos: Grafos 1 </h2><br>
        <img src="/backend/image/e1.png" width="35%"/><br>
        <b>Resultado da ordenação topológica (Exemplo 1):</b> ${result} <br>

        <img src="/backend/image/e2.png" width="35%"/><br>
        <b>Resultado da ordenação topológica (Exemplo 2):</b> ${result2} <br>

        <img src="/backend/image/e3.png" width="35%"/><br>
        <b>Resultado da ordenação topológica (Exemplo 3):</b> ${result3}
        `);
  });
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });