### LocalShopper Setup Guide

This guide will walk you through setting up and running the LocaleCommerce application on your local machine. The application backend is built using Spring Boot 3.3.1 in the `localecommerce` directory, and the frontend uses Next.js 14.2.3 in the `web` directoy.

#### Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   [Java Development Kit (JDK) 22.0.1](https://www.oracle.com/uk/java/technologies/downloads/)
-   [Node.js 18.17.0](https://nodejs.org/en)
-   [Maven](https://maven.apache.org/)
-   [PostgreSQL](https://www.postgresql.org/)

#### Setup the database

The application uses PostgreSQL as its database. Follow these steps to set up the database:

1. Create a PostgreSQL Database: Open your PostgreSQL client and create a new database. You can name it ecommerce or use any other name you prefer.

```sql
CREATE DATABASE ecommerce;

```

2. Update Database Configuration: Navigate to the localecommerce directory

```bash
cd localecommerce/src/main/resources

```

3. Open the application.properties file.

4. Update the database connection settings with your PostgreSQL details:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/<your-database-name>
spring.datasource.username=<your-postgres-username>
spring.datasource.password=<your-postgres-password>

```

`Note`: Replace <your-database-name>, <your-postgres-username>, and <your-postgres-password> with your actual database name, username, and password.

#### Backend Setup (Spring Boot)

1. From the root directory, navigate to the Backend directory:

```bash
cd localecommerce

```

2. Build the Project: Use Maven to build the backend application.

```bash
mvn clean install

```

3. Run the Spring Boot Application: Start the backend server by running.

```bash
mvn spring-boot:run

```

The backend server should now be running on http://localhost:8080.

#### Frontend Setup (Next.js)

1. From the root directory, navigate to the Frontend directory:

```bash
cd web/

```

2. Install Node.js Dependencies: Install the necessary dependencies using npm.

```bash
npm install
```

Or using pnpm like this

```bash
pnpm install
```

3. Run the Development Server: Start the frontend development server.

```bash
npm run dev

```

The frontend should now be accessible at http://localhost:3000.
