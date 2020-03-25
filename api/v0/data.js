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
                next(records.slice(starting_from).slice(0, 10))
            }
            else {
                //console.log(records.slice(1,10))
                next(records.slice(1, 11))
            }
        }
    })
}
