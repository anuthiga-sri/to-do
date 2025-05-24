# to-do

## How to setup the project
- git clone git@github.com:anuthiga-sri/to-do.git
- cd to-do/
- npm install
- rename .env.sample to .env
- add your/my database url to the `DATABASE_URL` in .env file
- npx prisma db push
   - It is an optional step. If you are using my database then no need to run this command. this will create required tables to run this application in your db
- npm run start
- go to http://localhost:3000 in your browser
