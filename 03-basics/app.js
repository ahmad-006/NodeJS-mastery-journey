//Importing http module
import http from "http";
import requestHandler from "./routes.js";

//*  Creating a server with http.createServer which takes callbck finction and parameters of request and response to access some detailed insights of request received and response sent

const server = http.createServer(requestHandler);

//?  listening to the server created above so that runtime keep awake to listen to every request made to the server so that we can send response to each request
//?  passing the port to which it listens for request
server.listen(3002);
