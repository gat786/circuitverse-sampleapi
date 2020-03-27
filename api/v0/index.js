module.exports = (server) => {
    const config = require("../../config")
    const data = require('./data');

    server.get('/api/v0/projects',(req,res,next)=>{
        data.get_projects({next:(value)=>{
            res.json(value)    
        },starting_from:10})
        next()
    })

    server.get('/api/v0/projects/:projectid',(req,res,next)=>{
        let project_id = req.params.projectid;
        console.log(project_id)
        data.get_project_from_id({"id": project_id,next:(results)=>{
            res.json(results)
        }})
        next()
    })
}