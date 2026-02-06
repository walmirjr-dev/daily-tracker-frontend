# 🎨 Daily Tracker - Interface

![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwindcss)
![Nginx](https://img.shields.io/badge/Nginx-Docker-009639?style=flat&logo=nginx)

Esta é a interface web do **Daily Tracker**, desenvolvida para oferecer uma experiência intuitiva e motivadora no acompanhamento de hábitos diários. O layout foca na visualização rápida do progresso e na facilidade de interação para garantir a consistência do utilizador.

🔗 **Repositório do Backend (Orquestrador):** [https://github.com/walmirjr-dev/daily-tracker]

---

## ✨ Diferenciais da Interface

- **Visualização Estilo GitHub:** Um visualizador que mostra os checkins feitos por meio de quadrados marcados em verde, lembrando um pouco a interface do GitHub.
- **Feedback de Progresso:** Gráficos circulares que indicam a percentagem concluída de cada desafio de forma dinâmica.
- **Identidade Personalizada:** Título e ícone customizados para uma experiência de marca única.

---

## 🛠️ Tecnologias e Bibliotecas

- **ReactJS + Vite:** Base do projeto para uma experiência de desenvolvimento rápida e build otimizado.
- **Tailwind CSS:** Estilização moderna utilizando uma abordagem utility-first.
- **Axios:** Cliente HTTP para comunicação com a API REST do Backend.
- **Lucide React:** Conjunto de ícones minimalistas e consistentes.
- **Day.js:** Biblioteca leve para manipulação, validação e formatação de datas.

---

## 🐳 Execução via Docker (Recomendado)

O Frontend foi configurado para ser servido por um servidor **Nginx** otimizado dentro de um container. Para rodar o sistema completo:

1. Certifica-te de que este repositório está na mesma pasta pai que o repositório do **Backend**.
2. Acede à pasta do **Backend** pelo terminal.
3. Executa o comando:
```bash
docker-compose up -d --build
