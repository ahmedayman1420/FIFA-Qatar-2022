// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MLBW5CYNUMBhAJ0E3scKg3eOvp8hJE0SLV9vu2OPNiv36tdd1XpnsE7P3kmOH12KFUH9KRmZrEBR53C7uL38RKq00uHgUENi4"
);

/*
//==// Express is a minimal and flexible Node.js web application framework that
provides a robust set of features for web and mobile applications.

//==// Dotenv is a zero-dependency module that loads environment variables from a
.env file into process.env. Storing configuration in the environment separate from
code is based on The Twelve-Factor App methodology.
*/

//==// cors middleware that can be used to enable CORS with various options.

const userRouter = require("./modules/users/routes/user-routes");
const stadiumRouter = require("./modules/stadiums/routes/stadium-routes");
const matchRouter = require("./modules/matchs/routes/match-routes");
const Connection = require("./Configration/configDB");
/*
//==// userRouter: is a router object that contains user module apis.
//==// Connection: function that used to connection with mongodb
*/

// ====== --- ====== > calling some functions < ====== --- ====== //
env.config();
Connection();
/*
//==// the config method takes a .env file path as an argument,
it parses it and sets environment vars defined in that file in process.env.

//==// call connection function of mongodb.
*/

// ====== --- ====== > Server APIs < ====== --- ====== //
app.use(cors()); // General Middleware
app.use(express.json()); // General Middleware
app.use(userRouter); // user routes
app.use(stadiumRouter); // stadium routes
app.use(matchRouter); // match routes

/*
//==// To setup your middleware, you can invoke app.use(<specific_middleware_layer_here>) for every middleware 
layer that you want to add (it can be generic to all paths, or triggered only on specific path(s)
your server handles), and it will add onto your Express middleware stack. 
*/

// ====== --- ====== > Listen Server On Port < ====== --- ====== //
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} !`);
});
/*
//==//The app.listen() function is used to bind and listen the connections on the specified host and port.
This method is identical to Node’s http.Server.listen() method. If the port number is omitted or is 0,
the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
*/
