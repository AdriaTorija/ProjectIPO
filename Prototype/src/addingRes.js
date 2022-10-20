const { ipcRenderer } = require('electron');
let dia;
//Quan rebem un ping vol dir que volem escriure
require('electron').ipcRenderer.on('nReserva', (event, arg, arg2) => {
 
    //ESCRIBIM TOT PER HTML
    dia= arg;
    var text = document.createTextNode("Reserva dia " + arg + " " + arg2);
    var title = document.getElementById("title1");
    title.append(text);
    
    var h1 = document.createElement('H2');
    h1.innerHTML = "Dia " + arg + " " + arg2;
    var xd = document.getElementById("div1");
    var dia= document.createElement('p');
    dia.setAttribute("type","hidden");
    dia.setAttribute("value",arg);
    dia.setAttribute("id","dia");

    xd.appendChild(h1);
    xd.appendChild(dia);
   
});

