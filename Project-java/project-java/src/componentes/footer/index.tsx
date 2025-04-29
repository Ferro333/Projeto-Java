'use client';

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="w-full flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <p className="text-sm leading-loose text-muted-foreground">
            Desenvolvido por{" "}
            <Link
              href="https://github.com/tiagoferro"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tiago Ferro
            </Link>{" "}
            e{" "}
            <Link
              href="https://github.com/afonsocorreia"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Afonso Correia
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm leading-loose text-muted-foreground">
            O código fonte está disponível no{" "}
            <Link
              href="https://github.com/tiagoferro/project-java"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/tiagoferro"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/tiagoferro"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
