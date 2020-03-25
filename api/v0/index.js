module.exports = (server) => {
    const config = require("../../config")
    const data = require('./data');

    server.get('/api/v0/projects',(req,res,next)=>{
        data.get_projects({next:(value)=>{
            res.send(value)    
        }})
        next()
    })
}