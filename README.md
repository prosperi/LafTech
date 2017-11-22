# **LafTech**


### Structure

The project is built in [*React*](https://reactjs.org/tutorial/tutorial.html) and [*Ruby on Rails*](http://guides.rubyonrails.org/getting_started.html). There are two main parts of the project - server-side rails application and client-side react application. [Backend is written on Rails while React is used to build front-end](https://www.fullstackreact.com/articles/how-to-get-create-react-app-to-work-with-your-rails-api/)

In addition to React we are using [ES6](http://ccoenraets.github.io/es6-tutorial/), [Sass](http://sass-lang.com/) and [Semantic UI](https://react.semantic-ui.com/), with [Webpack](https://webpack.js.org/) bundler. The structure of the whole project is following:

##### Main directories:
- `src` directory contains all the source files
- `dist` directory keeps production versions
- `test` directory is supposed to store all the unit and integration tests
- `cfg` provides *webpack* configuration for *test, production* and *development* builds

#### React
- `src/actions` contains all the [Redux](https://redux.js.org/) actions
- `src/api` contains the server-side codebase written on Rails
- `src/components` keeps all the [React Components](https://reactjs.org/docs/react-component.html)
- `src/data` contains all the data files used in application (JSON, txt, etc.)
- `src/images` contains all the media files used in the project
- `src/pages` contains main all the pages user can navigate to using LafTech
- `src/styles`directory provides stylesheets written in Sass

#### Rails
To be developed....

### Setup

In order to set up the project on the local machine, at first clone the repo:
- `git clone git@github.com:prosperi/LafTech.git`

#### Running the frontend (React)

Navigate to the project directory:
- `cd LafTech`

Install all the packages:
- `npm install`

Start webpack dev-server:
- `npm start`

After this react will be serving on port 3000, hence navigate to localhost:3000 in your browser and view the client-side.

#### Database Setup
Create an SSH tunnel to the Lafayette server using
>> `ssh -fN -L 5432:localhost:5432 yourLafUsername@139.147.9.191`

You may want to save this as an alias in `~/bash_profile` as `alias cs320db='ssh -fN -L 5432:localhost:5432 yourLafUsername@139.147.9.191'`

Once the ssh tunnel is enabled, configure `/config/database.yml` to use the port `5432`, your lafayette username and your LID as a password (copy from previous project). You can now proceed to the next steps.

#### Rails setup

Follow [this tutorial](https://gorails.com/setup/osx/10.13-high-sierra) to set up Ruby and Rails 

#### Running the backend (Rails)

To start the rails server, navigate to api directory:
- `cd src/api`

Start rails on port 3001:
- `bin/rails s -p 3001`
