# Project Setup Instructions

Follow these steps to set up the project on a new computer after cloning from GitHub.

## Prerequisites
-   PHP 8.2 or higher
-   Composer
-   Node.js & NPM
-   MySQL (or SQLite)

## Installation Steps

1.  **Install PHP Dependencies**
    ```bash
    composer install
    ```

2.  **Install Node.js Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Copy the example environment file and configure it:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and update your database credentials:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

4.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

5.  **Run Migrations & Seeders**
    Create the database if it doesn't exist, then run:
    ```bash
    php artisan migrate:fresh --seed
    ```
    *This will set up the tables and create the default admin user.*

6.  **Build Frontend Assets**
    ```bash
    npm run build
    ```

7.  **Start the Server**
    ```bash
    php artisan serve
    ```

## Admin Access
-   **URL**: `http://localhost:8000/login`
-   **Email**: `aguirrevirgilio17@gmail.com`
-   **Password**: `password`
