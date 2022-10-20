
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

//script per accedir al excel de reserves que volem
const cells = document.querySelectorAll('span');
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(e) {
        //Tenim el dia que volem  en e.target
        var x=  $(e.target).text();
        var mes= document.getElementById("monthAndYear");
        mes= $(mes).text();
        console.log(mes);
        //console.log(x);
        //fare els missatges 
        const {ipcRenderer} = require('electron');
        ipcRenderer.send('Reservas',x,mes);
     });
}