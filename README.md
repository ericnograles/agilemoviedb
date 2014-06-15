AgileMovieDB: One MEAN Application
============

This is a sample learning application to demonstrate the capabilities of the MEAN (Mongo, Express, AngularJS, Node.js) stack of web application development.

# Install Required Software #
1. [Node.js](http://www.nodejs.org) (for *nix systems, don't forget to install npm)
2. [MongoDB](http://www.mongodb.org/downloads)

# Prerequisite Steps #
1. Clone repo
2. In a command line run __sudo npm install -g bower grunt-cli karma__ (*nix systems) or __npm npm install -g bower grunt-cli karma__
3. Go to /Server in a command line and run __sudo npm install__ (*nix systems) or __npm install__ (Windows systems)
4. Go to /Server/seeds.  Run __/usr/bin/node seed.js__ (*nix systems) or __node seed.js__ (Windows systems)
5. Go to /Web in a command line and run __sudo npm install__ (*nix systems) or __npm install__ (Windows systems)
 
# Running the Application #
1. Go to /Server in a command line and run __sails lift__
2. Go to /Web in a command line and run __grunt server__
3. Browse to http://localhost:3445 for the Web UI
4. Browse to http://localhost:1337 for the API

# Credits #
* [NGBP](https://github.com/ngbp/ngbp): A boilerplate project for AngularJS encompassing best patterns and practices, directory structure, and automated build using Grunt
* [Sails.js](http://www.sailsjs.org): An MVC framework based on Node.js
* [StartBootstrap Stylish Portfolio Template](http://startbootstrap.com/stylish-portfolio): Making us developers feel like UI/UX people
