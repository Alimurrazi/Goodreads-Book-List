# Goodreads Book-List

This is a full-stack web app with React, Express, and Mongoose. There are some APIs that scrape book-related meta-data from https://www.goodreads.com/ and populate data into https://cloud.mongodb.com. In frontend, the book list is shown category-wise.

## Demo

![image](https://github.com/Alimurrazi/Goodreads-Book-List/assets/23289126/e7dce27b-50ca-459c-ab45-e713fb2191e5)

- Live demo is available here: **[Demo](https://alimurrazi.github.io/Goodreads-Book-List/)**

## Features

- Server
  - Express-based backend with typescript.
  - Deployed in Render (https://dashboard.render.com/#).
  - JWT-based Authentication added for user.
  - Some APIs (sync book list) are JWT protected, some are public which can be used by the frontend.
  - with the help of puppeteer(https://www.npmjs.com/package/puppeteer?activeTab=readme), cheerio(https://www.npmjs.com/package/cheerio), backend fetch 20 top most popular books on different category from goodreads(https://www.goodreads.com/). 
  - Fetch the most popular books in 9 different categories (adventure, classics, fantasy, favourites, history, memoir, non-fiction, science-fiction, thriller)
  - populate data in Mongodb atlas (https://cloud.mongodb.com)
  - Sometimes one single API fails to fetch all metadata of 20 books at a time. So there also exists a single API for syncing one specific book at a time.

- Client
  - React client with functional components, responsive UI and Typescript.
  - Deployed as github page (https://pages.github.com/).
  - Collapsable sidebar with different categories of book. there is also a portion of the page containing famous quote about the book. 
  - Reusable book component with image, rating, description, title, etc.
  - Maintain code quality with eslint

## Installation

Read on on how to set up this for development. Clone the repo.

```
$ git clone https://github.com/Alimurrazi/Goodreads-Book-List.git
$ cd Goodreads-Book-List
```

### Server

#### .env file
```
#db
MONGODB_STRING=mongodb://localhost:27017/mernboilerplate

#### Install dependencies

```
$ cd server
$ npm install
$ npm run start:dev
```

#### Run the server

You are good to go, server will be available on `https://localhost:5000`

```
$ npm run server
```

### Client

Just install the dependencies and run the dev server. App will load on `https://localhost:3000`.

```
$ cd client
$ npm install
$ npm start
```

## References
- This app is built based on the mern-boilerplate template(https://github.com/nemanjam/mern-boilerplate)

## Licence

### MIT
