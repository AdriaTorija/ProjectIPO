const { dialog } = require('electron');
console.log("XD");
require('electron').ipcRenderer.on('modificarR', (event, arg, arg2) => {
    console.log("XD2");
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("XD3");
        //AGAFEM TOTS ELS VALORS DELS INPUTS
        var nom = document.getElementById("form").elements[0].value;
        var cognom = document.getElementById("form").elements[1].value;
        var taula = document.getElementById("form").elements[2].value;
        var persones = document.getElementById("form").elements[3].value;
        var plats = document.getElementById("form").elements[4].checked;

        //MODIFIQUEM PER VEUREHO MILLOR
        if (plats == true) plats = "Si";
        else plats = "No";
        //LLEGIM EL FITXER JSON
        const fs = require('fs');
        var aux = JSON.parse(fs.readFileSync('Reserves.json'));
        
        //COMPROVEM QUE TOT ESTIGUI PLE SI HO ESTA AFEGIM EL OBJECT

        if (nom != "" & cognom != "" & taula != "" & persones != "") {
            var obj = { "name": nom, "cognom": cognom, "taula": taula, "persones": persones, "plats": plats };
            
            //console.log(dia);
            
            //console.log(aux['Nov'][arg][arg2-1]);
            aux['Des'][arg][arg2-1]=obj;
            //console.log(aux['Nov'][arg][arg2-1]);
        
            x = JSON.stringify(aux);
            //Ho guardem al fitxer
            fs.writeFileSync('Reserves.json', x);
            const { ipcRenderer } = require('electron');
            ipcRenderer.send('close');
            ipcRenderer.send('update1', arg);
            // console.log(JSON.parse(fs.readFileSync("Update.json")))
        }
        else {
            alert("Camps buits");
        }



    });
}); 