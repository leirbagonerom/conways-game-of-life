window.leirbag = {};
window.leirbag.matrizDatos =
//ejemplo config { size: 12 }
function (config) {
    var mod = {};
    var config = {};
    config.size = config.size || 12;

    mod.matriz = [];

    inicializar();

    return mod;

    function inicializar() {
        for (var i = 0; i < config.size; i++) {
            var newCell = [];
            for (var j = 0; j < config.size; j++)
                newCell.push([i, j]);

            mod.matriz.push(newCell);
        }
    }
}