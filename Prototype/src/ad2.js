const { ipcRenderer } = require('electron');
const { electron } = require('process');


//Quan rebem un ping vol dir que volem escriure
require('electron').ipcRenderer.on('tReserves', (event, arg, arg2) => {
    
    //Parlem amb el mainProcess per el Mondongo per que ens passi lo de la reserva
    const {ipcRenderer} = require('electron');




    //ESCRIBIM TOT PER HTML
    var text = document.createTextNode("Reserves dia " + arg + " " + arg2);
    var h1 = document.createElement('H2');
    h1.innerHTML = "Dia " + arg + "/" + arg2;
    var xd = document.getElementById("div1");
    xd.appendChild(h1);
    var title = document.getElementById("title1");
    title.append(text);


    //Per añadir una reserva
    const baR = document.getElementById('aR');
    baR.addEventListener('click', function (e) {
        require('electron').ipcRenderer.send('NewReserva', arg, arg2);
    })

    const t = document.getElementById('t');
    t.addEventListener('click', function (e) {
        require('electron').ipcRenderer.send('Taules', arg, arg2);
    })
    

    llegirDades(arg);
    startListeners(arg);
});



function llegirDades(arg){
    
    //Per llegir les dades del dia
    const fs= require('fs');
    var aux=JSON.parse(fs.readFileSync('Reserves.json'));
    //console.log(aux['Nov'][arg]);

    let table= document.createElement('table');
    table.setAttribute("id","t1");
    let headerRow= document.createElement('tr');
    let headers=['Nom','Identificador','Taula','Persones','Plats','Hora']
    console.log(headers);
    headers.forEach(headerT=>{
        let header = document.createElement('th');
        let textNode= document.createTextNode(headerT);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    

    let ar = aux['Des'][arg];
    var i=1;
    ar.forEach(emp=>{
        let row= document.createElement('tr');

        Object.values(emp).forEach(text=>{
            let cell = document.createElement('td');
            let textNode= document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        let cell2 = document.createElement('td');
        let textNode2= document.createTextNode("3:00");
        cell2.appendChild(textNode2);
        row.appendChild(cell2);
        let cell= document.createElement('td');
        let button=document.createElement('button');
        button.innerText='Modificar'
        button.setAttribute("id","m"+i);
        button.setAttribute("value",i);
        cell.appendChild(button);
        row.appendChild(cell);
       
        cell= document.createElement('td');
        button=document.createElement('button');
        button.innerText='Eliminar';
        button.setAttribute("id","e"+i);
        button.setAttribute("value",i);
        cell.appendChild(button);
        row.appendChild(cell);
        
        table.appendChild(row);
        i++;
    });
    let myTable= document.querySelector('#divTable');
    myTable.appendChild(table);
}




//PER UPDATE
require('electron').ipcRenderer.on('update2', (e,arg) => {
    document.getElementById('t1').remove();
    llegirDades(arg);
    startListeners(arg);
});

function startListeners(arg){
    var mida=document.getElementById('t1').rows.length-1;
    var i=1;
    var button= document.getElementById('m1');
    while(i<mida+1){
        var button=document.getElementById('m'+i);
        button.addEventListener('click',function(e){
            
            modificar(e.target.value,arg);
        });
        var be= document.getElementById("e"+i);
        console.log(be);
        be.addEventListener('click',function(e){

            eliminar(e.target.value,arg);
        });

        i++;
    }
    
}
//funcio per modificar una reserva
function modificar(i,arg){
    console.log("Modificar "+i);
    const {ipcRenderer} = require('electron');
    ipcRenderer.send('modificarReserva',arg,i);
    //ipcRenderer.send('update1',arg);
}


//funcio per eliminar una reserva
function eliminar(i,arg){
    const fs= require('fs');
    var aux=JSON.parse(fs.readFileSync('Reserves.json'));
    i--;
    delete aux['Des'][arg][i];
    
    var lol = filter_array(aux['Des'][arg]);
    aux['Des'][arg]=lol;
    console.log(aux['Des']);
    text= JSON.stringify(aux);
    fs.writeFileSync('Reserves.json',text);
    const {ipcRenderer} = require('electron');
    ipcRenderer.send('update1',arg);
}

//funcio per eliminar els nulls

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}