# 💻 NLW | Upload AI WEB

A web application designed to generate insights for video such as title, description, transcription, questions and translation based on video content using AI.

The system allows users to either upload video or insert the youtube URL, which will be converted into audio format and processed by OpenAI's Whisper model to generate the transcription.

It can be an excellent tool for content creators to automate your work using AI with the potential to expand its use to various other scenarios.

This project was created as part of Rocketseat NLW event: https://www.rocketseat.com.br/nlw.

**NOTE:** This is the front-end part, please find the API project here https://github.com/danilo-formagio/nlw-upload-ai-api

## 🧪 Technologies
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![RadixUi](https://img.shields.io/badge/Radix%20UI-161618.svg?style=for-the-badge&logo=Radix-UI&logoColor=white)](https://www.radix-ui.com/primitives)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://dev.w3.org/html5/spec-LC/)
[![i18n](https://img.shields.io/badge/i18next-26A69A.svg?style=for-the-badge&logo=i18next&logoColor=white)](https://www.i18next.com/)
[![FFMPEG](https://img.shields.io/badge/FFmpeg-007808.svg?style=for-the-badge&logo=FFmpeg&logoColor=white)](https://ffmpegwasm.netlify.app/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## ⚡️ Quick start

### Dependencies

To run the application on your local machine, make sure you have Node.js and NPM installed before proceeding with the steps below.

OpenAI API Key is necessary for the AI integration, access or create a new account on https://openai.com/ to generate your API key.

### Install and start API

**1. Clone the API project**
```bash
git clone git@github.com:danilo-formagio/nlw-upload-ai-api.git
```

**2. Setup OpenAI key**

Edit `.env` file replacing `OPENAI_KEY="OPENAI_KEY"` with the generated OpenAI API key.

**3. Install**
```bash
npm install
```

**4. Create database**
```bash
npm run create:db
```

**5. Run API**
```bash
npm run dev
```

### Install and start Web App

**1. Clone the WEB project**
```bash
git clone git@github.com:danilo-formagio/nlw-upload-ai-web.git
```

**2. Install**
```bash
npm install
```

**3. Run Web App**
```bash
npm run dev
```

Access URL: http://localhost:5173/

## 📖 License

This project is under the MIT license.
