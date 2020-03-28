const restify = require('restify');

const port = process.env.PORT || 3000;

const server = restify.createServer();

// Middleware

server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser());


server.get('/',(req,res,next)=>{
    res.send("Hello there user");
})

require('./api/v0/index')(server)

server.listen(port,()=>{
    console.log(`listening at port ${port}`);
});