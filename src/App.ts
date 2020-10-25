/*
  
*/
import { readFileSync } from 'fs';
import { resolve } from 'path';

class node {
  name: string;
  closed: boolean;
  dv: number;
  predecessor: node;
  adjacents: node[];

  constructor(name: string) {
    this.name = name;
    this.closed = false;
    this.dv = Number.MAX_SAFE_INTEGER;
  }

  registerAdjacent(node: node) {
    const find = this.adjacents.find((el) => el.name === node.name);
    if (find) return;
    this.adjacents.push(node);
  }
}

class App {
  params: string[];
  directed: number;
  graph: node[];

  constructor() {
    // Carrega o arquivo em uma string
    const fileData = readFileSync(resolve(__dirname, 'grafo.txt'), { encoding: 'utf8' });
    // Carrega os parãmetros em um array
    this.params = fileData.split('\n');
    // Carrega a variável de informação de direcionamento
    this.directed = parseInt(this.params[0]);
  }

  // dijkstra(initialNode: node) {
  //   console.log('Parâmetros: ', this.params);
  //   console.log('Direcionado? ', this.directed === 1 ? 'sim' : 'não');
  // }
}

new App();
