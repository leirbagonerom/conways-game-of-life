var MatrizCelulas = null;
var MatrizCelulas = (function (MatrizDatos_) {
    var mod = {};
    var matrizDatos = MatrizDatos_.matriz;
    poblar_matriz();

    mod.nuevaCelula = fnNuevaCelula;
    mod.obtenerCelula = fnObtenerCelula;
    mod.asignarCelula = fnAsignarCelula;
    mod.consultarBloque= fnConsultarBloque;

    return mod;

    function poblar_matriz() {
        for (var i = 0; i < matrizDatos.length; i++)
            for (var j = 0; j < matrizDatos[i].length; j++)
                matrizDatos[i][j] = newCell(0, i, j);
    }

    function fnNuevaCelula(alive, i1, i2) {
        var me = {};
        me.alive = alive;
        me.i1 = i1;
        me.i2 = i2;

        return me;
    }

    function fnObtenerCelula(i1, i2) {
        if (matrizDatos[i1])
            if (matrizDatos[i1][i2])
                return matrizDatos[i1][i2];

        return null;
    }

    function fnAsignarCelula(celula) {
        if (matrizDatos[celula.i1])
            if (matrizDatos[celula.i1][celula.i2])
                matrizDatos[celula.i1][celula.i2].alive = celula.alive;
    }

    function fnConsultarBloque(i1, i2) {
        var r = [];
        for (var i = 0; i < i1; i++) {
            for (var j = 0; j < i2; index++) {
                var cel = fnObtenerCelula(i, j);
                if (cel != null)
                    r.push(cel);
            }
        }

        return r;
    }
})(MatrizDatos);