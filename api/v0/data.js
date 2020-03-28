const config = require('../../config');
const csv  = require('csv-parse/lib/sync');
const fs = require('fs');

module.exports.get_projects = ({starting_from,next}) =>{
    fs.readFile(config.dbpath, (err, data) => {
        if (err) {
            console.log("error occurred");
            console.log(err);
            
        }
        else {
            const csv_data = data.toString();
            var records = csv(csv_data);
            var headers = records[0];
            // if there is a parameter of starting from
            if (starting_from) {

                // if starting from is a allowed query
                if(starting_from<records.length-10 && starting_from >= 0 ){
                    //console.log(records.slice(starting_from).slice(0,10));
                    var records = records.slice(starting_from).slice(1,11)
                    var list_rows = []
                    records.forEach(row => {
                        row_dict = {}
                        row_dict["type"] = "project";
                        for(var i=0;i<row.length;i++){
                            row_dict[headers[i]] = row[i];
                        }
                        list_rows.push(row_dict)
                    });
                    console.log(`request with a starting point ${starting_from}`)
                    next({
                        "query":true,
                        "result":list_rows
                    })
                }else{
                    next({
                        "query":false,
                    })
                }


            }
            else {
                //console.log(records.slice(1,10))
                records = records.slice(1, 11)
                var list_rows = []
                records.forEach(row => {
                    row_dict = {}
                    row_dict["type"] = "project";
                    for(var i=0;i<row.length;i++){
                        row_dict[headers[i]] = row[i];
                    }
                    list_rows.push(row_dict)
                });
                console.log("request without a starting point")
                next({
                    "query":true,
                    "result":list_rows
                })
            }
        }
    })
}


module.exports.get_project_from_id = ({id,next})=>{
    fs.readFile(config.dbpath,(err,data)=>{
        if (err) {
            console.log("error occurred");
            console.log(err);
            next(err);
        }else{
            const csv_data = data.toString();
            var records = csv(csv_data);
            const headers = records[0];

            let proj_ind = headers.indexOf("project_id");
            
            if(proj_ind != null){
                let found = false;

                records.forEach(element => {
                    if(element[proj_ind]==id){
                        result = {}
                        
                        found = true;
                        result["type"] = "project"
                        
                        for(var i = 0; i < headers.length ; i++){
                            result[headers[i]] = element[i];
                        }

                        next({
                            "query":true,
                            "result":result
                        });
                    }
                });

                if(!found){
                    next({
                        "query":false,
                        "result":""
                    })
                }
            }
            
        }
    })
}