# Tattoo Studio API 🖋️

Welcome to the Tattoo Studio API documentation. This robust API manages user authentication, appointment scheduling, and tattoo artist portfolios. It's the 4th project of the GeeksHub Academy Fullstack Bootcamp, showcasing real-world backend development skills with TypeScript and Express.

## Table of Contents 🗂️

- [Stack 🛠️](#stack)
- [Features 🌟](#features-)
- [Installation 🚀](#installation-)
  - [Running with Docker ⚓️](#running-with-docker-️)
  - [Running directly with Node](#running-directly-with-node)
- [API Documentation 📘](#api-documentation-)
- [Database Design 📖](#database-design-)
  - [Relationships](#relationships)
  - [Indices and Constraints](#indices-and-constraints)
- [API Endpoints 🔌](#api-endpoints-)
- [Author ✒️](#author-)
- [Roadmap 🛣️](#roadmap-️)
- [Acknowledgements 🎓](#acknowledgements-)

## Stack 🛠️

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />

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

## Installation 🚀

Get a copy of the project up and running on your local machine for development and testing purposes.

```sh
git clone https://github.com/pedrogardim/tattoo-booking-api.git
cd tattoo-booking-api
```

#### Running with Docker ⚓️

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

## Database Design 📖

<img width="803" alt="ERD" src="https://github.com/pedrogardim/tattoo-booking-api/assets/81443264/09e7a113-6d4b-4615-9e97-e98d3427e61a">

### Relationships

- `Users` to `Appointments`: Double one-to-many relationship where:
  - One user (as a client) can have many appointments.
  - One user (as a tattooist) can be associated with many appointments.
- `Users` to `Tattoo Works`: One-to-many relationship where one tattooist can have many works

### Indices and Constraints

- `Users` table:
  - Unique constraint on `email` to ensure each user has a unique email address.
- `Appointments` and `Tattoo Works` tables:
  - Foreign key constraint on `client_id` and `tattooist_id` referring to `id` in the `Users` table.

## API Endpoints 🔌

Check the swagger documentation for a complete documentation of the API endpoints.

(Click to expand)

<details>
  <summary style="font-weight: bold; font-size: 1.3em;">Documentation</summary>

- `GET /api-docs` - Swagger documentation.
</details>

<details>
  <summary style="font-weight: bold; font-size: 1.3em;">User Endpoints</summary>

##### Authentication 🔒

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login an existing user.

##### Users 👤

- `GET /api/users/me` - Retrieve authenticated user's profile.
- `PUT /api/users/me` - Update authenticated user's profile.
- `DELETE /api/users/me` - Delete authenticated user.
- `GET /api/users/getTattooists` - List all tattooists.

##### User Appointments 📅

- `GET /api/appointments/my` - Retrieve user's appointments.
- `POST /api/appointments/my` - Request a new appointment.
- `GET /api/appointments/my/{id}` - Retrieve details of a specific appointment.
- `PUT /api/appointments/my/{id}` - Update a specific appointment.
- `DELETE /api/appointments/my/{id}` - Delete a specific appointment.

##### TattooWorks - Public 🌍

- `GET /api/tattooWorks` - List all tattoo works.
- `GET /api/tattooWorks/{id}` - Retrieve a specific tattoo work by ID.

##### TattooWorks - Tattooist 🎨

- `GET /api/tattooWorks/my` - Retrieve a tattooist's works.
- `POST /api/tattooWorks/my` - Create a new work for the authenticated tattooist.
- `PUT /api/tattooWorks/my/{id}` - Update a specific tattoo work by ID.
- `DELETE /api/tattooWorks/my/{id}` - Delete a specific tattoo work by ID.

</details>
<details>
<summary style="font-weight: bold; font-size: 1.3em;"><i>Admin endpoints</i></summary>

##### Admin CRUD Endpoints - Users 👩‍💼👨‍💼

- `GET /api/users` - List all users.
- `POST /api/users` - Create a new user.
- `GET /api/users/{id}` - Retrieve a user by ID.
- `PUT /api/users/{id}` - Update a user by ID.
- `DELETE /api/users/{id}` - Delete a user by ID.
- `PUT /api/users/setAsTattooist/{id}` - Set a user as a tattooist.

##### Admin CRUD Endpoints - Appointments 📅

- `GET /api/appointments` - List all appointments.
- `POST /api/appointments` - Create a new appointment.
- `GET /api/appointments/{id}` - Retrieve a specific appointment by ID.
- `PUT /api/appointments/{id}` - Update a specific appointment by ID.
- `DELETE /api/appointments/{id}` - Delete a specific appointment by ID.

##### Admin CRUD Endpoints - TattooWorks 🎨

- `POST /api/tattooWorks` - Create a new tattoo work.
- `PUT /api/tattooWorks/{id}` - Update a tattoo work by ID.
- `DELETE /api/tattooWorks/{id}` - Delete a tattoo work by ID.

</details>

## Author ✒️

- **Pedro Gardim** - Project Developer
  - [GitHub](https://github.com/pedrogardim) - [LinkedIn](https://www.linkedin.com/in/pedro-gardim) - [Portfolio](https://pedrogardim.com)

## Roadmap 🛣️

- **Add notifications** - So users know when their appointments are modified, created or deleted.
- **Add a React frontend** - So users can interact with the API from a web browser.

## Acknowledgements 🎓

- A big shoutout to the **Geekshubs Academy** for the opportunity to learn and grow as a developer.
