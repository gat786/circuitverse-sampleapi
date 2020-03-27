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
            if (starting_from) {
                //console.log(records.slice(starting_from).slice(0,10));
                var records = records.slice(starting_from).slice(1,11)
                var list_rows = []
                records.forEach(row => {
                    row_dict = {}
                    for(var i=0;i<row.length;i++){
                        row_dict[headers[i]] = row[i];
                    }
                    list_rows.push(row_dict)
                });
                console.log(`request with a starting point ${starting_from}`)
                next(list_rows)
            }
            else {
                //console.log(records.slice(1,10))
                records = records.slice(1, 11)
                var list_rows = []
                records.forEach(row => {
                    row_dict = {}
                    for(var i=0;i<row.length;i++){
                        row_dict[headers[i]] = row[i];
                    }
                    list_rows.push(row_dict)
                });
                console.log("request without a starting point")
                next(list_rows)
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
            console.log(headers);
            
            let proj_ind = headers.indexOf("project_id");

            console.log("proj id is"+proj_ind);
            
            if(proj_ind){
                records.forEach(element => {
                    if(element[proj_ind]==id){
                        result = {}
                        for(var i = 0; i < headers.length ; i++){
                            result[headers[i]] = element[i];
                        }
                        console.log(result);
                        next(result);
                    }
                });
            }
            
        }
    })
}