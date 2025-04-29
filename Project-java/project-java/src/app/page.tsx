'use client';

import { motion } from "framer-motion";
import { ListTodo, Settings, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container relative">
      <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Bem-vindo ao{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TaskManager
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Organize suas tarefas de forma simples e eficiente. Gerencie seu tempo,
            acompanhe seu progresso e aumente sua produtividade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Link
            href="/page-tasks"
            className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <ListTodo className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Gerenciar Tarefas</h3>
              <p className="text-sm text-muted-foreground">
                Crie, edite e organize suas tarefas de forma eficiente
              </p>
            </div>
          </Link>

          <Link
            href="/page-configs"
            className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Configurações</h3>
              <p className="text-sm text-muted-foreground">
                Personalize categorias e preferências do sistema
              </p>
            </div>
          </Link>

          <Link
            href="/page-statistcs"
            className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Estatísticas</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe seu progresso e desempenho
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-4">Recursos Principais</h2>
          <ul className="grid gap-2 text-left sm:grid-cols-2">
            <li className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Organização de tarefas por categorias</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Acompanhamento de progresso</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Estatísticas detalhadas</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Interface intuitiva e responsiva</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
