# CompagnonDeVisite<!-- omit in toc -->

- [1. Getting started](#1-getting-started)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Install the Angular CLI](#12-install-the-angular-cli)
  - [1.3. Instal project](#13-instal-project)
- [2. Run project](#2-run-project)
- [3. Build](#3-build)
- [4. Doc](#4-doc)
- [5. PWA / Service worker](#5-pwa--service-worker)
- [6. Angular informations](#6-angular-informations)
  - [6.1. Development server](#61-development-server)
  - [6.2. Code scaffolding](#62-code-scaffolding)
  - [6.3. Build](#63-build)
  - [6.4. Running unit tests](#64-running-unit-tests)
  - [6.5. Running end-to-end tests](#65-running-end-to-end-tests)
  - [6.6. Further help](#66-further-help)
  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## 1. Getting started

### 1.1. Prerequisites

`Node.js` and `npm package manager`  
Cf. https://angular.io/guide/setup-local#prerequisites  

### 1.2. Install the Angular CLI

`npm install -g @angular/cli`  
Cf. https://angular.io/guide/setup-local#install-the-angular-cli

### 1.3. Instal project

```bash
git clone https://nantes.trsb.net/gitlab/cd44/GP/CompagnonDeVisite.git
git checkout <br>
```
Get a `j-angular-1.0.0.tgz` file here : https://nantes.trsb.net/gitlab/digiwin/angular/JAngular/tags  
Add file in the `libs` folder

```bash
npm install # Make sure to do it first

# Usefull commands
npm run lint # Run eslint accross all project files to find linter issues (try to fix them if possible) | Use ESLint extension for VSC
```

## 2. Run project
```bash
# localhost serv :
npm run dev

# R7 serv :
npm run dev-R7
# R7 serv in work :
npm run dev-R7I

```

## 3. Build

## 4. Doc 

Doc: `npm run docs:json`  

Doc components: `npm run storybook`  

## 5. PWA / Service worker

(https://angular.io/guide/service-worker-getting-started#service-worker-in-action-a-tour)  
Run `ng build`  
Run `http-server -p 8080 -c-1 dist/zelli`


## 6. Angular informations

### 6.1. Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### 6.2. Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### 6.3. Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### 6.4. Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### 6.5. Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### 6.6. Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
