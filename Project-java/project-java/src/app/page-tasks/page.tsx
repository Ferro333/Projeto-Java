"use client";

import { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, fetchCategories } from '@/services/api';
import { motion } from 'framer-motion';
import { Plus, Trash2, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

type Categoria = {
  id?: number;
  nome: string;
};

type Tarefa = {
  id: number;
  nome: string;
  prioridade: string;
  status: string;
  categoria: Categoria;
};

const statusColors = {
  PENDENTE: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  COMECADO: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  FINALIZADO: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const STATUS_LABELS = {
  PENDENTE: 'Pendente',
  COMECADO: 'Em Andamento',
  FINALIZADO: 'Finalizado'
};

const PRIORITY_LABELS = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta'
};

const prioridadeColors = {
  BAIXA: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  MEDIA: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  ALTA: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const statusIcons = {
  PENDENTE: Circle,
  COMECADO: Clock,
  FINALIZADO: CheckCircle,
};

export default function PageTasks() {
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState<{
    nome: string;
    prioridade: string;
    status: string;
    categoria: string;
  }>({
    nome: '',
    prioridade: 'BAIXA',
    status: 'PENDENTE',
    categoria: 'Saúde',
  });

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Erro ao carregar tarefas");
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategorias(data);
    } catch (error) {
      toast.error("Erro ao carregar categorias");
    }
  };

  const handleAdd = async () => {
    if (!novaTarefa.nome.trim()) {
      toast.error("O nome da tarefa é obrigatório");
      return;
    }

    try {
      await addTask({
        nome: novaTarefa.nome,
        prioridade: novaTarefa.prioridade,
        status: novaTarefa.status,
        categoria: { nome: novaTarefa.categoria }
      });

      setNovaTarefa({
        nome: '',
        prioridade: 'BAIXA',
        status: 'PENDENTE',
        categoria: 'Saúde'
      });

      setFormVisible(false);
      loadTasks();
      toast.success("Tarefa adicionada com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      toast.error("Erro ao adicionar tarefa");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      loadTasks();
      toast.success("Tarefa removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover tarefa");
    }
  };

  const StatusIcon = ({ status }: { status: keyof typeof statusIcons }) => {
    const Icon = statusIcons[status] || AlertCircle;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Minhas Tarefas</h1>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
          >
            {formVisible ? 'Cancelar' : <Plus className="h-5 w-5" />}
          </button>
        </div>

        {formVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Nome da Tarefa
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome da tarefa"
                  value={novaTarefa.nome}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, nome: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Prioridade
                  </label>
                  <select
                    value={novaTarefa.prioridade}
                    onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Status
                  </label>
                  <select
                    value={novaTarefa.status}
                    onChange={(e) => setNovaTarefa({ ...novaTarefa, status: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="COMECADO">Começado</option>
                    <option value="FINALIZADO">Finalizado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Categoria
                  </label>
                  <select
                    value={novaTarefa.categoria}
                    onChange={(e) => setNovaTarefa({ ...novaTarefa, categoria: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {categorias.map((cat, index) => (
                      <option key={index} value={cat.nome}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleAdd}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
              >
                Salvar Tarefa
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((tarefa) => (
            <motion.div
              key={tarefa.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">{tarefa.nome}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${prioridadeColors[tarefa.prioridade as keyof typeof prioridadeColors]}`}>
                      {PRIORITY_LABELS[tarefa.prioridade as keyof typeof PRIORITY_LABELS]}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[tarefa.status as keyof typeof statusColors]}`}>
                      <StatusIcon status={tarefa.status as keyof typeof statusIcons} />
                      {STATUS_LABELS[tarefa.status as keyof typeof STATUS_LABELS]}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {tarefa.categoria?.nome}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(tarefa.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Nenhuma tarefa encontrada</h3>
              <p className="text-sm text-muted-foreground">
                Comece adicionando uma nova tarefa usando o botão acima.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}