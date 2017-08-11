(function () {

    "use strict";


    var matrizDatos = window.leirbag.matrizDatos();
    var matrizCelulas = window.leirbag.matrizCelulas(matrizDatos);
    var vistaMatriz = window.leirbag.vistaMatriz(matrizCelulas);

    vistaMatriz.init();

})();