Laravel with Vue.js Blog site Project

Introduction

This repository contains a Laravel with Vue.js blog site project that combines the Laravel PHP framework with Vue.js for building web applications. This README provides instructions on how to set up and run the project locally.
Prerequisites

Before you begin, ensure you have met the following requirements:

    PHP: Install PHP on your machine. You can download it from php.net.

    Composer: Install Composer, the PHP dependency manager, from getcomposer.org.

    Node.js and npm: Install Node.js and npm (Node Package Manager) from nodejs.org.

    Laravel: Install Laravel globally using Composer:

    bash

composer global require laravel/installer

Vue CLI: Install the Vue CLI globally using npm:

bash

    npm install -g @vue/cli

Getting Started

To get the project up and running, follow these steps:

    Clone the repository:

git clone https://github.com/baselah/blog-site.git

Navigate to the project directory:



cd blog-site

Install PHP dependencies using Composer:



composer install

Install JavaScript dependencies using npm:



npm install

Copy the .env.example file to .env and update the database configuration and other environment variables:



cp .env.example .env

Generate an application key:



php artisan key:generate

Migrate and seed the database:



php artisan migrate --seed

Compile the Vue.js assets:



npm run dev
