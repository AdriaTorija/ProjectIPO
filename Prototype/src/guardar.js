const { dialog } = require('electron');

document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault();
    //AGAFEM TOTS ELS VALORS DELS INPUTS
    var nom= document.getElementById("form").elements[0].value;
    var cognom=document.getElementById("form").elements[1].value;
    var taula=document.getElementById("form").elements[2].value;
    var persones=document.getElementById("form").elements[3].value;
    var plats=document.getElementById("form").elements[4].checked;
    
    //MODIFIQUEM PER VEUREHO MILLOR
    if(plats==true) plats="Si";
    else plats="No";
    //LLEGIM EL FITXER JSON
    const fs= require('fs');
    var aux=JSON.parse(fs.readFileSync('Reserves.json'));
    
    //COMPROVEM QUE TOT ESTIGUI PLE SI HO ESTA AFEGIM EL OBJECT

    if(nom!="" & cognom!="" & taula!="" & persones!=""){
        var obj= {"name":nom, "cognom":cognom,"taula":taula,"persones":persones,"plats":plats};
        dia=document.getElementById('dia').getAttribute("value");
        //console.log(dia);
        aux['Des'][dia].push(obj);
        //console.log(aux['Nov'][dia]);
        x=JSON.stringify(aux);
        // Ho guardem al fitxer
        fs.writeFileSync('Reserves.json',x);
        const {ipcRenderer} = require('electron');
        ipcRenderer.send('close');
        ipcRenderer.send('update1',dia);
      

       // console.log(JSON.parse(fs.readFileSync("Update.json")))
    }
    else{
        alert("Camps buits");
    }
   
    
    
});