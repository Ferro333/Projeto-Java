import "./globals.css";
import { Header } from "../componentes/header";
import { Footer } from "../componentes/footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TaskManager",
  description: "Sistema de gerenciamento de tarefas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
