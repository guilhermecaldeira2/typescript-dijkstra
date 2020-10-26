"use strict";

var _fs = require("fs");

var _path = require("path");

/*
  Gustavo Loredo Costa - RA: 20761292
  Guilherme caldeira godoy da silva - RA 20768534
  Otavio Henrique Pires Costa - RA: 20667147
*/
class Node {
  constructor(name, first = false) {
    this.name = name;
    this.closed = false;
    this.adjacents = [];
    this.dv = first ? 0 : Number.MAX_SAFE_INTEGER;
  }

  registerAdjacent(name, cost) {
    const find = this.adjacents.find(el => el.nodeReference === name);
    if (find) return;
    this.adjacents.push({
      cost,
      nodeReference: name
    });
  }

}

class App {
  constructor() {
    // Carrega o arquivo em uma string
    try {
      this.fileData = (0, _fs.readFileSync)((0, _path.resolve)(__dirname, 'grafo.txt'), {
        encoding: 'utf8'
      });
    } catch {
      throw new Error('Carga do arquivo falhou! Verifique o nome.');
    } // Carrega os parãmetros em um array


    this.params = this.fileData.split('\n'); // Carrega a variável de informação de direcionamento

    try {
      this.directed = this.handleDirectedParam();
    } catch {
      throw new Error('Carga do arquivo falhou! Parâmetro gráfico direcionado, linha 1, inválido.');
    } // inicializa os arrays


    this.graph = [];
    this.openNodes = []; // Inicializa o grafo

    try {
      this.init(this.params);
    } catch {
      throw new Error('Carga do arquivo falhou! Verifique os parâmetros de vertices e arestas.');
    }
  }

  handleDirectedParam() {
    const directed = parseInt(this.params[0]);

    if (directed === 1 || directed === 0) {
      return directed;
    }

    throw new Error('Unhandled directed param');
  }

  handleNodeNames(params) {
    const nodeNames = params.slice(2, parseInt(params[1]) + 2);
    console.log('Vertices: ', nodeNames);
    nodeNames.forEach(nodeName => {
      if (nodeNames[0] === nodeName) this.registerNode(new Node(nodeName, true));
      this.registerNode(new Node(nodeName));
    });
  }

  registerNode(node) {
    const find = this.graph.find(el => el.name === node.name);
    if (find) return;
    this.graph.push(node);
  }

  handleArrests(params) {
    const arrests = params.slice(parseInt(params[1]) + 2, params.length);
    console.log('Arestas: ', arrests);
    arrests.forEach(el => {
      const params = el.split(',');
      this.graph.forEach(node => {
        if (node.name === params[0]) {
          const name = params[1];
          const cost = parseInt(params[2]);
          if (!name || !cost) throw new Error('Undled file format');
          node.registerAdjacent(name, cost);
        }
      });
    });
  }

  init(params) {
    this.handleNodeNames(params);
    this.handleArrests(params);
  }

  logDijkstraResult(graph) {
    graph.forEach(node => {
      const predecessor = node.predecessor ? node.predecessor.name : null;
      console.log(`Vertice ${node.name}: [${predecessor ? predecessor : '#'} , ${node.dv}]`);
    });
  }

  dijkstra() {
    console.log(this.directed === 1 ? 'Direcionado' : 'Não direcionado');

    try {
      this.openNodes = this.graph;

      while (this.openNodes.length >> 0) {
        const sortedNodes = this.openNodes.sort((a, b) => a.dv < b.dv ? -1 : a.dv > b.dv ? 1 : 0);
        const nextOpenNode = sortedNodes[0];
        this.openNodes = this.openNodes.filter(el => el.name !== nextOpenNode.name);
        nextOpenNode.adjacents.forEach(adjacent => {
          const node = this.graph.find(node => node.name === adjacent.nodeReference);
          if (node.closed) return;
          this.graph.forEach(u => {
            if (u.name === adjacent.nodeReference) {
              const relax = nextOpenNode.dv + adjacent.cost;

              if (relax < u.dv) {
                u.dv = relax;
                node.predecessor = nextOpenNode;
              }
            }
          });
        });
      }

      console.log('Solução encontrada!');
      this.logDijkstraResult(this.graph);
      return;
    } catch {
      throw new Error('O grafo fornecido está incorreto! Verifique a formatação do arquivo.');
    }
  }

}

const app = new App();
app.dijkstra();