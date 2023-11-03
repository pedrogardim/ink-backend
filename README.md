# Tattoo Studio API 🖋️

Welcome to the Tattoo Studio API documentation. This robust API manages user authentication, appointment scheduling, and tattoo artist portfolios. It's the 4th project of the GeeksHub Academy Fullstack Bootcamp, showcasing real-world backend development skills with TypeScript and Express.

## Features 🌟

- **User Authentication:** Secure signup and login processes. 🔒
- **Appointment Creation:** Users can book appointments, with date and user profile validation. 📅
- **Tattoo Artist Portfolios:** Tattooists can upload examples of their work. 🎨
- **Admin CRUD Endpoints:** Full control over users, appointments, and tattoo works for administrators. 👩‍💼👨‍💼
- **Swagger Documentation:** Fully documented API endpoints. 📚
- **Docker Compose:** Easy setup and deployment with Docker. 🐳
- **Google-Style JSON Responses:** Consistently formatted responses. 📁
- **MySQL Database with TypeORM and Migrations:** Robust database management. 🗄️
- **Mock Data Generation:** Realistic data generation with Faker.js. 🤖

## Getting Started 🚀

Get a copy of the project up and running on your local machine for development and testing purposes.

```sh
git clone https://github.com/pedrogardim/tattoo-booking-api.git
cd inkhouse-tattoo-studio-api
```

#### Running with Docker 🛠️

```sh
docker-compose up --build
```

(You'll need Docker and Docker Compose installed on your machine.)

#### Running directly with Node

```sh
npm install             # Install dependecies
npm run migrations:run  # Run migrations
npm run seed            # Populate DB with mock
npm run dev             # Run server
```

You'll need add a `.env` based on the provided `.env.example` file with the database credentials, and have a MySQL server running.

## API Documentation 📘

Access the Swagger documentation at `http://localhost:3000/api-docs`.


## Author ✒️

- **Pedro Gardim** - Project Developer
  - [GitHub](https://github.com/pedrogardim) - [LinkedIn](https://www.linkedin.com/in/pedro-gardim) - [Portfolio](https://pedrogardim.com)

## Roadmap 🛣️

- **Add notifications** - So users know when their appointments are modified, created or deleted.
- **Add a React frontend** - So users can interact with the API from a web browser.

## Acknowledgements 🎓

- A big shoutout to the **Geekshubs Academy** for the opportunity to learn and grow as a developer.
