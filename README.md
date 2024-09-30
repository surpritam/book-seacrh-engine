# 📚 Book Search Engine

A full-stack web application that allows users to search for books using the Google Books API, save their favorite books, and manage their personal library. Built with React on the frontend and an Express.js server with Apollo Server for GraphQL on the backend, the application leverages MongoDB Atlas for data storage and is deployed on Render.

## 🚀 Table of Contents

- [🎯 Features](#-features)
- [🛠 Technologies Used](#-technologies-used)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🖥 Usage](#usage)
- [☁️ Deployment](#️-deployment)
- [🖼️ Demo](#️-demo)
- [📝 License](#-license)
- [📫 Contact](#-contact)


## 🎯 Features

- **User Authentication:**
  - Sign up and log in using a secure authentication system.
  - Protect routes to ensure only authenticated users can access certain features.

- **Book Search:**
  - Search for books using keywords via the Google Books API.
  - View detailed information including title, authors, description, cover image, and preview link.

- **Personal Library:**
  - Save favorite books to a personal library.
  - Remove books from the library.
  - View the total count of saved books.

- **Responsive Design:**
  - Optimized for various devices and screen sizes using React Bootstrap.

- **GraphQL API:**
  - Efficient data fetching and mutations using Apollo Client and Server.

## 🛠 Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tooling for faster builds and hot module replacement.
- **Apollo Client:** State management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **React Bootstrap:** Frontend framework for building responsive, mobile-first sites.
- **JWT (JSON Web Tokens):** For secure user authentication.

### Backend

- **Express.js:** Web framework for Node.js.
- **Apollo Server:** A community-maintained open-source GraphQL server.
- **GraphQL:** A query language for your API.
- **MongoDB & Mongoose:** Database and ODM for data modeling.
- **bcrypt:** For hashing user passwords.
- **jsonwebtoken:** For creating and verifying JWTs.

### Other

- **Google Books API:** For fetching book data.
- **Node.js:** JavaScript runtime environment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** and **npm**: [Download Here](https://nodejs.org/)
- **Git**: [Download Here](https://git-scm.com/)
- **MongoDB Atlas Account**: [Sign Up Here](https://www.mongodb.com/cloud/atlas)

## ⚙️ Installation

Follow these steps to set up the **Book Search Engine** on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/surpritam/book-seacrh-engine.git
cd book-search-engine
```

### 2. Configure Environment Variables
Create a .env file in project root directory
```.env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
```
### 3. Install dependencies
```bash
npm install
```
### 4. Build front end
```bash
npm run build
```

## Usage
Running locally
```bash
npm run develop
```
The application will start running in http://localhost:3000/

## ☁️ Deployment
The application is deployed on render: https://book-seacrh-engine.onrender.com 

## 🖼️ Demo
You can find a live deom of the app [here](https://drive.google.com/file/d/19rRXGp-FshZ5CHru2ixLTO15P_x3TtPl/view?usp=sharing)

## 📝 License

Distributed under the MIT License.

## 📫 Contact

- Pritam Sur
- Email: sur.pritam9878@gmail.com
- [LinkedIn](https://linkedin.com/in/pritam-sur)
- [GitHub](https://github.com/surpritam)