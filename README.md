# 🧾 Bill Splitter

A web application to easily split bills among multiple people.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Library**: Material UI (MUI)
- **Containerization**: Docker, Docker Compose

## 🚀 Local Development

To run the project locally without Docker:

### 1. Clone the repository

```bash
git clone https://github.com/Unknownflow/bill-splitter.git
cd bill-splitter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will start on http://localhost:5173

## 🐳 Running with Docker

### 📦 Build and Start the App (Recommended)

Use **Docker Compose** to build and run the application:

This will:

- Build the Docker image
- Start the development server (typically at http://localhost:5173)

```bash
docker-compose up --build
```

## 🐋 Run Using Prebuilt Docker Image

If the image is already built, you can run it directly:

```bash
docker run -p 5173:5173 bill-splitter
```
