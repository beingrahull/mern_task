const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const connecttodb=require("./db/db")

const server = http.createServer(app);

connecttodb()


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});