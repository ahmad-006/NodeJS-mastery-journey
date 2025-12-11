//Importing http module
import http from "http";
import fs, { writeFileSync } from "fs";
//*  Creating a server with http.createServer which takes callbck finction and parameters of request and response to access some detailed insights of request received and response sent

const server = http.createServer((req, res) => {
  // //? taking a look at few of the request methods to understand it better.....
  // console.log(req.url, req.method, req.headers);
  // //?  setting header and sending response to understand how server side responses work....
  // //?  set header
  // res.setHeader("content-type", "text/html");
  // //? sending response in html
  // res.write(
  //   "<html><head><title>My Server</title></head><body><h1>Welcome to my Page </h1></body></html>"
  // );

  // //?  res.end() ends the response and before it is what is seen by client after it any response is not shown to client
  // return res.end();

  //?  sending response based on routes (routing in nodejs)
  //?  extracting the route from url and method type
  const route = req.url;
  const method = req.method;

  //?  sending response for specific routes only
  if (route === "/") {
    res.write(
      `<html><head><title>My Server</title></head><body><form action="/message" method="POST" ><input type="text" name="message" placeholder = "Enter Your Message.."><button type="submit">Send</button></form></body></html>`
    );
    return res.end();
  }

  if (route === "/message" && method === "POST") {
    //? creating an array to store all the chunks from streaming
    const body = [];
    //? event listener to get access to stream chunks
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    //?  Buffering the streams to combine all the chunks and access the received data......
    req.on("end", () => {
      const parsedMessage = Buffer.concat(body).toString();
      const message = parsedMessage.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

//listening to the server created above so that runtime keep awake to listen to every request made to the server so that we can send response to each request

//passing the port to which it listens for request
server.listen(3002);
