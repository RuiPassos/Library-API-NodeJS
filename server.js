require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// ==========================================
// 1. MIDDLEWARES
// ==========================================
app.use(cors()); 
app.use(express.json()); 
app.use(morgan("dev")); 

// ==========================================
// 2. BASE DE DADOS EM MEMORIA (Mock)
// ==========================================
let livros = [
  { 
    id: 1, 
    titulo: "Clean Code: A Handbook of Agile Software Craftsmanship", 
    autor: "Robert C. Martin", 
    genero: "tecnico",
    ano_publicacao: 2008,
    disponivel: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: 2, 
    titulo: "The Pragmatic Programmer", 
    autor: "Andrew Hunt e David Thomas", 
    genero: "tecnico",
    ano_publicacao: 1999,
    disponivel: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: 3, 
    titulo: "Steve Jobs", 
    autor: "Walter Isaacson", 
    genero: "biografia",
    ano_publicacao: 2011,
    disponivel: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: 4, 
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software", 
    autor: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", 
    genero: "tecnico",
    ano_publicacao: 1994,
    disponivel: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: 5, 
    titulo: "Neuromancer", 
    autor: "William Gibson", 
    genero: "ficcao",
    ano_publicacao: 1984,
    disponivel: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// ==========================================
// 3. ROTAS (ENDPOINTS)
// ==========================================

// GET /livros: Retorna a lista de todos os livros
app.get("/livros", (req, res) => {
  res.status(200).json({ data: livros });
});

// GET /livros/:id: Retorna um livro especifico procurando pelo seu ID
app.get("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const livro = livros.find((l) => l.id === id); 

  if (!livro) { 
    return res.status(404).json({ message: "Livro não encontrado" }); 
  }

  res.status(200).json({ data: livro }); 
});

// DELETE /livros/:id: Remove um livro da lista
app.delete("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const index = livros.findIndex((l) => l.id === id); 

  if (index === -1) { 
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  livros.splice(index, 1); 
  res.status(200).json({ message: "Livro eliminado com sucesso" });
});

// POST /livros: Regista um novo livro
app.post("/livros", (req, res) => {
  const { titulo, autor, genero, ano_publicacao } = req.body; 

  // Validacao de campos obrigatorios
  if (!titulo || !autor) {
    return res.status(400).json({ message: "O título e o autor são obrigatórios" });
  }

  // Validacao do genero com base nos valores permitidos
  const generosValidos = ["ficcao", "nao_ficcao", "tecnico", "biografia"];
  if (genero && !generosValidos.includes(genero)) {
    return res.status(400).json({ message: "Género inválido" });
  }

  // Criacao do objeto do livro com ID auto-incrementado e timestamps automáticos
  const novoLivro = {
    id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1, 
    titulo, 
    autor,
    genero,
    ano_publicacao,
    disponivel: true, // Valor predefinido como solicitado
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  livros.push(novoLivro);
  res.status(201).json({ data: novoLivro });
});

// PUT /livros/:id: Atualiza as informacoes de um livro existente
app.put("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = livros.findIndex((l) => l.id === id);

  // Verifica se o livro existe antes de tentar atualizar
  if (index === -1) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  const { titulo, autor, genero, ano_publicacao, disponivel } = req.body;

  // Validacao de campos obrigatorios
  if (!titulo || !autor) {
    return res.status(400).json({ message: "O título e o autor são obrigatórios" });
  }

  // Validacao do genero
  const generosValidos = ["ficcao", "nao_ficcao", "tecnico", "biografia"];
  if (genero && !generosValidos.includes(genero)) {
    return res.status(400).json({ message: "Género inválido" });
  }

  // Substitui os dados do livro, mantendo o ID e a data de criacao originais intactos
  livros[index] = {
    id,
    titulo,
    autor,
    genero,
    ano_publicacao,
    disponivel: disponivel !== undefined ? disponivel : livros[index].disponivel,
    created_at: livros[index].created_at,
    updated_at: new Date().toISOString() // Atualiza apenas a data de modificacao
  };

  res.status(200).json({ data: livros[index] });
});

// ==========================================
// 4. INICIALIZACAO DO SERVIDOR
// ==========================================
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});