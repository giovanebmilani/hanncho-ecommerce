# Hanncho

#### 👉 https://hannchoclothing.com

## About this project

This repository is the frontend of Hanncho Clothing e-commerce project. \
This project also has an backend (in private repo) built with the concepts of Clean Architecture, and has as one of its features the integration with Google Merchant Service for promoting the brand's products. \
The entire infrastructure was defined using AWS.

This project is part of my personal portfolio.

Email: giovanebmilani@hotmail.com \
Connect with me at [LinkedIn](https://linkedin.com/in/giovanebmilani).

## Screenshots

<img src="/docs/assets/screenshots/admin_dashboard1.png" alt="Admin Dashboard screenshot" style="width: 100%;"/>

## Main features

- Auth protected Admin dashboard to manage the e-commerce and products stock;
- Integration with Google Merchant Service;
- Shop containing product filtering and cart system;

## Tecnologies

#### Cliend-Side
- [React](https://reactjs.org/) - For user interfaces
- [Typescript](https://www.typescriptlang.org/) - For better code quality and maintence
- [Sass](https://sass-lang.com/) - For defining better responsive styles
- [Axios](https://axios-http.com/docs/intro) - HTTP Client
- [React Query](https://react-query-v3.tanstack.com/) - For data fetching and caching

#### Server-Side
- [Flask RESTX](https://flask-restx.readthedocs.io/en/latest/) - For building RESTAPIs with Python
- [SQLAlchemy](https://www.sqlalchemy.org/) - For defining SQL using Python
- [Alembic](https://alembic.sqlalchemy.org/en/latest/) - For database migrations using Python
- [Zappa](https://github.com/zappa/Zappa) - For serveless application deployment
- [Botocore](https://github.com/boto/botocore) - To comunicate with AWS using Python
- [Google Api Core](https://pypi.org/project/google-api-core/) - For Google Merchant Service integration using Python

#### Database
- [PostgreSQL](https://www.postgresql.org/) - Database system

#### Infrastructure
- [AWS Lambda](https://aws.amazon.com/lambda/) - For serveless backend
- [AWS Amplify](https://aws.amazon.com/amplify/) - For frontend hosting and deployment
- [AWS RDS](https://aws.amazon.com/rds/) - For hosting and deployment of SQL database
- [AWS S3](https://aws.amazon.com/s3/) - For storing images


## 🛠 Getting Started

To run this project you need to install the prerequisites:

[NodeJS](https://nodejs.org/) `v16.16.0`

## ⚙️ Installation

##### Clone the repository

```bash
git clone https://github.com/giovanebmilani/hanncho-ecommerce.git
cd hanncho-ecommerce
```

##### Install dependencies

```bash
yarn
```
_or_
```bash
npm install
```

##### Create a file called `.env` in the root directory

```bash
touch .env
```

##### Set up environment variables as shown below

```
REACT_APP_API_BASE_URL=your-api-url-goes-here
```

> _**Tip -** you can use production API in the url: https://aqjj5vsxu0.execute-api.us-east-1.amazonaws.com/prod/api, but you won't have access to admin dashboard._

## 🚀 Run

After installing process you just need to run in develop mode

```bash
yarn start
```
_or_

```bash
npm start
```


# ☕
