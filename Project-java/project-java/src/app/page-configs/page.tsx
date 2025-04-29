'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Plus, Trash2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchCategories, addCategory, deleteCategory } from '@/services/api';

type Categoria = {
  id?: number;
  nome: string;
};

export default function PageConfigs() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt-BR');
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedNotifications = localStorage.getItem('notifications') !== 'false';
    const savedLanguage = localStorage.getItem('language') || 'pt-BR';

    setTheme(savedTheme);
    setNotifications(savedNotifications);
    setLanguage(savedLanguage);
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Erro ao carregar categorias');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error('O nome da categoria é obrigatório');
      return;
    }

    try {
      await addCategory({ nome: newCategory });
      setNewCategory('');
      setFormVisible(false);
      loadCategories();
      toast.success('Categoria adicionada com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar categoria');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      loadCategories();
      toast.success('Categoria removida com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover categoria');
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    toast.success('Tema atualizado com sucesso!');
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotifications(enabled);
    localStorage.setItem('notifications', String(enabled));
    toast.success(enabled ? 'Notificações ativadas!' : 'Notificações desativadas!');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    toast.success('Idioma atualizado com sucesso!');
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
          <Settings className="h-6 w-6" />
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Aparência</h2>
            <div>
              <label className="text-sm font-medium mb-2 block">Tema</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    theme === 'light'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  <span>Claro</span>
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span>Escuro</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories Management */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Categorias</h2>
              <button
                onClick={() => setFormVisible(!formVisible)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {formVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nome da categoria"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
                  >
                    Adicionar
                  </button>
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg border bg-card p-2"
                >
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{category.nome}</span>
                  </div>
                  <button
                    onClick={() => category.id && handleDeleteCategory(category.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Preferences Settings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Preferências</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Idioma</label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Notificações</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleNotificationsChange(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      notifications ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-sm">
                    {notifications ? 'Ativadas' : 'Desativadas'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
