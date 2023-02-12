let fs = require("fs"); 

module.exports = function(app) {


    //gets and sends the parsed notes as JSON object
    app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json",  (err, data) => {
        if (err) throw err;
        parsedData = JSON.parse(data);
        res.send(parsedData);
        })
    }); 


    //recieves incoming note, pushes it into notes array, assigns all notes an ID#, re-writes JSON file
    app.post("/api/notes", function(req, res) {

        let incomingNote = req.body

        fs.readFile("./db/db.json", (err, data) => {
            if(err) throw err;
            parsedData = JSON.parse(data);
            parsedData.push(incomingNote);
            let number = 1
            parsedData.forEach((note, index) => {
                  note.id = number;
                  number++;
                  return parsedData;
            });
            console.log(parsedData);

            stringData = JSON.stringify(parsedData);

            fs.writeFile("./db/db.json", stringData, (err, data) => {
                if (err) throw err;
                })
        })
        res.send("Thank you for your note!");
    })


    app.delete("/api/notes/:id", function(req, res) {
        //gets the id# of the note set for deletion
        let chosen_for_death = req.params.id
        console.log(chosen_for_death);

        //reads the current database file
        fs.readFile("./db/db.json", (err, data) => {
            if(err) throw err;
            //parses current database file into array of objects
            parsedData = JSON.parse(data);
            //for each function, comparing each note's id to the chosen_for_death variable
            for(let i=0; i < parsedData.length; i++){
                if(parsedData[i].id === Number(chosen_for_death)){
                    parsedData.splice([i], 1);
                }
            }
            console.log(parsedData);
            stringData = JSON.stringify(parsedData);

            fs.writeFile("./db/db.json", stringData, (err, data) => {
                if (err) throw err;
                })
        })
        res.status(204).send(); 
    })





}