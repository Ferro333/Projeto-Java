'use client';

import { useState, useEffect } from 'react';
import { fetchTasks } from '@/services/api';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon, CheckCircle, Clock, Circle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

type Tarefa = {
  id: number;
  nome: string;
  prioridade: string;
  status: string;
  categoria: {
    nome: string;
  };
};

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6', '#EC4899'];

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

export default function PageStatistics() {
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCount = () => {
    const counts = {
      PENDENTE: 0,
      COMECADO: 0,
      FINALIZADO: 0,
    };
    tasks.forEach((task) => {
      if (task.status in counts) {
        counts[task.status as keyof typeof counts]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: STATUS_LABELS[name as keyof typeof STATUS_LABELS],
      value,
      id: name // mantemos o ID original para referência
    }));
  };

  const getPriorityCount = () => {
    const counts = {
      BAIXA: 0,
      MEDIA: 0,
      ALTA: 0,
    };
    tasks.forEach((task) => {
      if (task.prioridade in counts) {
        counts[task.prioridade as keyof typeof counts]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: PRIORITY_LABELS[name as keyof typeof PRIORITY_LABELS],
      id: name,
      value
    }));
  };

  const getCategoryCount = () => {
    const counts: { [key: string]: number } = {};
    tasks.forEach((task) => {
      if (task.categoria && task.categoria.nome) {
        counts[task.categoria.nome] = (counts[task.categoria.nome] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  };

  const statusCounts = getStatusCount();
  const priorityCounts = getPriorityCount();
  const categoryCounts = getCategoryCount();

  const statusColors = {
    PENDENTE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    COMECADO: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    FINALIZADO: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  };

  const priorityColors = {
    BAIXA: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    MEDIA: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    ALTA: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const displayName = data.name;
      const value = data.value;
      
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{`${displayName}: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Status das Tarefas</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={false}
                  >
                    {statusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {statusCounts.map((status, index) => (
                <div key={status.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status.id as keyof typeof statusColors]}`}>
                      {status.id === 'PENDENTE' && <Circle className="mr-1 h-4 w-4" />}
                      {status.id === 'COMECADO' && <Clock className="mr-1 h-4 w-4" />}
                      {status.id === 'FINALIZADO' && <CheckCircle className="mr-1 h-4 w-4" />}
                      {status.name}
                    </span>
                  </div>
                  <span className="font-medium">{status.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Priority Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Prioridades</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityCounts} barGap={0}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#6366F1">
                    {priorityCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {priorityCounts.map((priority) => (
                <div key={priority.id} className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[priority.id as keyof typeof priorityColors]}`}>
                    {priority.name}
                  </span>
                  <span className="font-medium">{priority.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryCounts}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={false}
                  >
                    {categoryCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryCounts.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {category.name}
                  </span>
                  <span className="font-medium">{category.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Nenhuma tarefa encontrada</h3>
              <p className="text-sm text-muted-foreground">
                Adicione algumas tarefas para ver as estatísticas.
              </p>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
