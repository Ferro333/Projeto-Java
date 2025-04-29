export const API_URL = "http://localhost:8080";


export const addTask = async (task: {
  nome: string;
  prioridade: string;
  status: string;
  categoria: { nome: string };
}) => {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Erro ao adicionar tarefa");
  return res.json();
};

export const updateTask = async (
  id: number,
  updatedTask: {
    nome: string;
    prioridade: string;
    status: string;
    categoria: { nome: string };
  }
) => {
  await fetch(`${API_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
};

export const deleteTask = async (id: number) => {
  await fetch(`${API_URL}/tarefas/${id}`, { method: "DELETE" });
};

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tarefas`);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
};


export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categorias`);
  if (!res.ok) throw new Error("Erro ao buscar categorias");
  return res.json();
};

export const addCategory = async (categoria: { nome: string }) => {
  const res = await fetch("http://localhost:8080/categorias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });

  if (!res.ok) {
    const erro = await res.text();
    console.error("Erro ao adicionar categoria:", erro);
    throw new Error("Erro ao adicionar categoria");
  }

  return res.json();
};


export const deleteCategory = async (id: number) => {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao excluir categoria");
};


export const cadastrarUsuario = async (usuario: {
  nome: string;
  email: string;
  senha: string;
}) => {
  const res = await fetch(`${API_URL}/usuarios/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  if (!res.ok) throw new Error("Erro ao criar conta. Verifique os dados.");
  return res.json();
};

export const loginUsuario = async (credenciais: {
  email: string;
  senha: string;
}) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciais),
  });

  if (!res.ok) throw new Error("Email ou senha inválidos.");
  return res.json();
};

export const fetchUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
};
