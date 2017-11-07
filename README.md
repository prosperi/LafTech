# **LafTech**


### Structure

The project is built in *React* and *Ruby on Rails*. There are two main parts of the project - backend and frontend. Backend is written on Rails while React is used to build front-end

In addition to React we are using ES6, Sass and Semantic UI, with Webpack bundler. The structure of the whole project is following:

##### Main directories:
- `src` directory contains all the source files
- `dist` directory keeps production versions
- `test` directory is supposed to store all the unit and integration tests
- `cfg` provides *webpack* configuration for * test, production* and *development* builds

#### React
- `src/actions` contains all the Redux actions
- `src/api` contains the server-side codebase written on Rails
- `src/components` keeps all the React Components
- `src/data` contains all the data files used in application (JSON, txt, etc.)
- `src/images` contains all the media files used in the project
- `src/pages` contains main all the pages user can navigate to using LafTech
- `src/styles`directory provides stylesheets written in Sass

#### Rails
To be developed....

### Setup

In order to set up the project on the local machine, at first clone the repo:
- `git clone git@github.com:prosperi/LafTech.git`

Navigate to the project directory:
- `cd LafTech`

Install all the packages:
- `npm install`

Start webpack dev-server:
- `npm start`

After this react will be serving on port 3000, hence navigate to localhost:3000 in your browser and view the client-side.

To start the rails server, navigate to api directory:
- `cd src/api`

Start rails on port 3001:
- `bin/rails s -p 3001`
