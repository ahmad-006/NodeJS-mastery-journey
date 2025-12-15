import http from "http";
import express, { response } from "express";

const app = express();

app.use("/users", (req, res, next) => {
  res.send(`
        <html>
            <head>
                <title>User List</title>
            </head>
            <body>
                <h1>Registered Users</h1>
                <ul>
                    <li>User 1: Ahmad Aamir (Admin)</li>
                    <li>User 2: Maximilian Schwarzmüller</li>
                    <li>User 3: Jonas Schmedtmann</li>
                    <li>User 4: Random Intern</li>
                </ul>
                <a href="/">Go back to Shop</a>
            </body>
        </html>
    `);
});

app.use("/", (req, res, next) => {
  res.send(`<h1 style='text-align:center;' >Welcome to practise page </h1>`);
});

app.listen(3000);
