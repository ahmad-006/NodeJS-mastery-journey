//Importing http module
import http from "http";

//Creating a server with http.createServer which takes callbck finction with parameters of request and response to access some detailed insights of request received and response sent

const server = http.createServer((req, res) => {
  console.log(req);
});

//listening to the server created above so that runtime keep awake to listen to every request made to the server so that we can send response to each request

//passing the port to which it listens for request
server.listen(3000);
