class Graph {
    // Construtor da classe Graph
    // Cria um novo grafo vazio com um objeto Map para armazenar as listas de adjacência
    constructor() {
        this.adjList = new Map();
    }

    // Método para adicionar uma aresta de v para w no grafo
    addEdge(v, w) {
        // Verifica se o vértice v já existe no grafo, se não, o adiciona
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
        // Adiciona o vértice w à lista de adjacência do vértice v
        this.adjList.get(v).push(w);
    }

    // Método para adicionar um novo vértice ao grafo
    addVertex(v) {
        // Verifica se o vértice já existe no grafo
        // Se não existir, o adiciona com uma lista de adjacência vazia
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        } else {
            console.log("Já possui este nó no sistema");
        }
    }

    // Método para remover um vértice do grafo
    removeVertex(v) {
        // Remove o vértice v do mapa de adjacência
        this.adjList.delete(v);

        // Itera sobre as listas de adjacência de todos os outros vértices
        // e remove qualquer ocorrência de v
        for (const neighbors of this.adjList.values()) {
            const index = neighbors.indexOf(v);
            if (index !== -1) {
                neighbors.splice(index, 1);
            }
        }
    }

    // Método para realizar a ordenação topológica do grafo
    topologicalSort() {
        // Cria uma cópia do grafo original
        const graphCopy = new Graph();
        // Mapa para armazenar o grau de entrada de cada vértice
        const inDegree = new Map();
        // Array para armazenar o resultado da ordenação topológica
        const result = [];

        // Passo 1: Copia o grafo original para o grafo copiado
        for (const [vertex, neighbors] of this.adjList) {
            graphCopy.addVertex(vertex);
            for (const neighbor of neighbors) {
                graphCopy.addEdge(vertex, neighbor);
            }
        }

        // Passo 2: Conta o grau de entrada de cada vértice no grafo copiado
        for (const [vertex] of graphCopy.adjList) {
            inDegree.set(vertex, 0);
        }
        for (const neighbors of graphCopy.adjList.values()) {
            for (const neighbor of neighbors) {
                inDegree.set(neighbor, inDegree.get(neighbor) + 1);
            }
        }

        // Passo 3: Inicializa e processa o array de ordem topológica
        for (const [vertex, neighbors] of this.adjList) {
            this.executa_ordenacao(graphCopy, inDegree, result);
        }

        return result; // Retorna o resultado da ordenação topológica
    }

    // Método auxiliar para executar a ordenação topológica
    executa_ordenacao(graphCopy, inDegree, result) {
        // Cria uma fila de vértices candidatos com grau de entrada zero
        let candidateQueue = [];
        for (const [vertex, degree] of inDegree) {
            if (degree === 0) {
                candidateQueue.push(vertex);
                break;
            }
        }

        // Se houver apenas um vértice com grau de entrada zero, executa a ordenação
        if (candidateQueue.length == 1) {
            // Adiciona o vértice ao resultado da ordenação topológica
            result.push(candidateQueue[0]);
            // Remove o vértice do grafo copiado
            graphCopy.adjList.delete(candidateQueue[0]);
            // Atualiza o grau de entrada dos vértices adjacentes
            for (const [vertex, neighbors] of graphCopy.adjList) {
                const index = neighbors.indexOf(candidateQueue[0]);
                if (index !== -1) {
                    neighbors.splice(index, 1);
                }
            }
            // Remove o vértice da contagem do grau de entrada
            inDegree.delete(candidateQueue[0]);
            // Atualiza o grau de entrada dos vértices restantes
            for (const [vertex] of graphCopy.adjList) {
                inDegree.set(vertex, 0);
            }
            for (const neighbors of graphCopy.adjList.values()) {
                for (const neighbor of neighbors) {
                    inDegree.set(neighbor, inDegree.get(neighbor) + 1);
                }
            }
        } else {
            result[0] = "tem ciclo no grafo";
            return;
        }
    }
}

// Exporta a classe Graph para ser utilizada em outros módulos
module.exports = Graph;
