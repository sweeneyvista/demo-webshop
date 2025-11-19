# Gemini Project: Demo Webshop

A simple fruit shop demo application built with HTML, CSS, and JavaScript. This project serves as a demonstration application for AI agent workshops and testing purposes.

## Project Overview

The project is a simple webshop that allows users to browse a catalog of fruits, add them to a shopping basket, and view the basket contents. The application is built with plain HTML, CSS, and JavaScript, without any external frameworks or libraries (other than a Google Font). The application state, specifically the shopping basket, is managed on the client-side using the browser's `localStorage`.

### Key Files

-   `index.html`: The main landing page that displays the product catalog.
-   `basket.html`: The page that displays the contents of the shopping basket.
-   `checkout.html`: The page for the user to enter their details to checkout.
-   `product-*.html`: Individual product pages for each fruit.
-   `style.css`: The main stylesheet for the application.
-   `shop.js`: The JavaScript file that contains the application's logic, including basket management.
-   `img/`: A directory containing image assets for the application.

## Building and Running

This is a static web project. No build process is required. To run the application, simply open the `index.html` file in a web browser.

## Development Conventions

-   The project uses vanilla JavaScript for all its client-side logic.
-   The shopping basket state is managed using `localStorage`.
-   The styling is done with a single CSS file.
-   The project has a simple and clear file structure, with separate HTML files for each page.
-   The code is not minified or bundled, making it easy to read and understand.
