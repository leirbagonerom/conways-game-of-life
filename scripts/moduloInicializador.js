var matrizCelulas;
var logica;
(function () {

    "use strict";


    var matrizDatos = window.leirbag.matrizDatos();
    matrizCelulas = window.leirbag.matrizCelulas(matrizDatos);
    var vistaMatriz = window.leirbag.vistaMatriz(matrizCelulas);
    logica = window.leirbag.logica(matrizCelulas);

    vistaMatriz.init();

    //window.setInterval( function () {
    //    vistaMatriz.updateBoard();
    //}, 200);

    window.jugar =  function () {
        var intervalLogica = window.setInterval(function () {
            logica.aplicarReglas();
            vistaMatriz.updateBoard();
        }, 50);
    }
    
    //window.clearInterval(intervalLogica);
})();