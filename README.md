# ZuDrop Frontend

Frontend application for the **ZuDrop Limited Edition Sneaker Drop System**.

Live Demo: https://zudrop.vercel.app/

## Features

- View active sneaker drops
- Real-time stock updates using WebSockets
- Reserve inventory with instant UI feedback
- Complete purchases within the reservation window
- Automatic stock synchronization across all connected clients
- Display the 3 most recent successful purchasers for each drop
- Responsive and clean user interface

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Socket.IO Client

## Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
VITE_SOCKET_URL=your_socket_url
VITE_BASE_URL=your_back_api_url
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Purpose

This frontend was built as part of a technical assessment focused on:

- Real-time inventory synchronization
- High-concurrency reservation workflows
- Temporary inventory reservation handling
- Live stock recovery notifications
- Purchase activity tracking

## Backend Repository

The frontend communicates with a Node.js, Express, PostgreSQL, Prisma, and Socket.IO backend that manages inventory, reservations, purchases, and real-time updates.
