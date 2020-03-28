module.exports = (server) => {
    const config = require("../../config")
    const data = require('./data');

    server.get('/api/v0/projects',(req,res,next)=>{
        if(req.query["start"]){
            data.get_projects({starting_from:req.query["start"],next:(value)=>{
                if(value["query"]==true){
                    res.json({
                        "data":value["result"],
                        "query":config.success
                    })
                }else{
                    res.json({
                        "query":config.failed
                    })
                }
            }})
        }else{
            data.get_projects({next:(value)=>{
                if(value["query"]==true){
                    res.json({
                        "data":value["result"],
                        "query":"success"
                    })
                }else{
                    res.json({
                        "query":"failed"
                    })
                }
            }})
        }
        next()
    })

    server.get('/api/v0/projects/:projectid',(req,res,next)=>{
        let project_id = req.params.projectid;
        
        data.get_project_from_id({"id": project_id,next:(value)=>{
            if(value["query"]){
                res.json({
                    "query":config.success,
                    "data":value["result"]
                })
            }else{
                res.json({
                    "query":config.failed
                })
            }
        }})
        next()
    })
}