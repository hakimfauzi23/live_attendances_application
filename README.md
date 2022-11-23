
## Live Attendances Application

When a company has a Work From Anywhere or Work From Home policy, then how to count their attendance when employees don't go to the office? well, this application helps the employee do attendance for Arrive (Clock In) and Go Home (Clock Out) from their devices such as laptops, PC, and even smartphones.

When an employee does attendance (Clock in & Clock out), this application will get the time and compare it with office hour, also get their location from `longitude` and `latitude` so HR will know where they doing their jobs.

  

## Run & Install

make sure you already setting .env from .env.example as template.


>  `npm install`

>  `npx sequelize-cli db:migrate`

>  `npx sequelize-cli db:seed:all`

>  `npm start`

  

## User Account Demo

| Email |Password |Role
|--|--|--|
|employee@mail.com|Admin!23|EMPLOYEE|
|admin@mail.com|Admin!23|ADMIN|
|hr@mail.com|Admin!23|HR|

  
  

*postman collection & environment provided at `postman` folder.*

*This project can be run use `docker` !*