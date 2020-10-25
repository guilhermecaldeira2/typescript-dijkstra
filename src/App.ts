/*
  
*/
import { readFileSync } from 'fs';
import { resolve } from 'path';

type adjacent = {
  cost: number;
  node: Node;
};

class Node {
  public name: string;
  public closed: boolean;
  public dv: number;
  public predecessor: Node;
  public adjacents: adjacent[];

  constructor(name: string, first: boolean = false) {
    this.name = name;
    this.closed = false;
    this.dv = first ? 0 : Number.MAX_SAFE_INTEGER;
  }

  public registerAdjacent(node: Node, cost: number) {
    const find = this.adjacents.find((el) => el.node.name === node.name);
    if (find) return;
    this.adjacents.push({
      cost,
      node,
    });
  }
}

class App {
  private params: string[];
  private directed: number;
  private graph: Node[];
  private openNodes: Node[];

  constructor() {
    // Carrega o arquivo em uma string
    const fileData = readFileSync(resolve(__dirname, 'grafo.txt'), { encoding: 'utf8' });
    // Carrega os parãmetros em um array
    this.params = fileData.split('\n');
    // Carrega a variável de informação de direcionamento
    this.directed = parseInt(this.params[0]);
    // this.init(this.params);
  }

  private registerNode(node: Node) {
    const find: Node = this.graph.find((el) => el.name === node.name);
    if (find) return;
    this.graph.push(node);
    this.openNodes.push(node);
  }

  public dijkstra(initialNode: Node) {
    console.log('Parâmetros: ', this.params);
    console.log('Direcionado? ', this.directed === 1 ? 'sim' : 'não');
    if (!this.openNodes) return this.graph;
    const sortedNodes: Node[] = this.openNodes.sort((a: Node, b: Node) =>
      a.dv < b.dv ? -1 : a.dv > b.dv ? 1 : 0,
    );
    const nextNode = sortedNodes[0];
    this.openNodes = this.openNodes.filter((el) => el.name !== nextNode.name);
    nextNode.adjacents.forEach((el) => {
      if (el.node.closed) return;

      this.graph.forEach((node: Node) => {
        if (node.name === el.node.name) {
          const relax = el.node.dv + el.cost;
          node.dv = relax > node.dv ? node.dv : relax;
          node.predecessor = el.node;
        }
      });
    });
  }
}

const app = new App();
