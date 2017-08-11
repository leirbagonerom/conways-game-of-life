window.leirbag.matrizCelulas =
    function (MatrizDatos_) {
        var mod = {};
        var matrizDatos = MatrizDatos_.matriz;
        poblarMatriz();

        mod.crearCelula = fnNuevaCelula;
        mod.obtenerCelula = fnObtenerCelula;
        mod.asignarCelula = fnAsignarCelula;
        mod.consultarBloque = fnConsultarBloque;
        mod.tamanio_matriz = matrizDatos.length;

        return mod;

        function poblarMatriz() {
            for (var i = 0; i < matrizDatos.length; i++)
                for (var j = 0; j < matrizDatos[i].length; j++)
                    matrizDatos[i][j] = fnNuevaCelula(0, i, j);
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

        function fnAsignarCelula(i1, i2, alive) {
            if (matrizDatos[i1])
                if (matrizDatos[i1][i2])
                    matrizDatos[i1][i2].alive = alive;
        }

        function fnConsultarBloque(i1, i2) {
            var r = [];
            for (var i = 0; i < i1; i++) {
                for (var j = 0; j < i2; i++) {
                    var cel = fnObtenerCelula(i, j);
                    if (cel != null)
                        r.push(cel);
                }
            }

            return r;
        }
    }