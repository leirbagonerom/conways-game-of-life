window.leirbag.logica = function (matrizDatos_) {
    var me = {};
    var newMatrix = window.leirbag.matrizDatos();
    var newLogica = window.leirbag.matrizCelulas(newMatrix);

    me.aplicarReglas = function () {
       
        regla1();
        regla3();
        regla4();

        for (var i = 0; i < newLogica.matrix.length; i++) {
            for (var j = 0; j < newLogica.matrix[i].length; j++) {
                matrizDatos_.matrix[i][j] = newLogica.matrix[i][j];
            }
        }
        //matrizDatos_.matrix = newLogica.matrix;
    }
    /*
        1.Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        2.Any live cell with two or three live neighbours lives on to the next generation.
        3.Any live cell with more than three live neighbours dies, as if by overpopulation.
        4.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     */
    function regla1() {
        var celulasVivas = obtenerCelulasVivas();
        celulasVivas.forEach(function (o) {
            newLogica.asignarCelula(o.i1, o.i2, 1);
            var bloque = matrizDatos_.consultarBloque(o.i1, o.i2);
            bloque = bloque.filter(function (o) { return o.alive == 1; })
            if (bloque.length < 3)
                newLogica.asignarCelula(o.i1, o.i2, 0);
        });
    }

    function regla3() {
        var celulasVivas = obtenerCelulasVivas();
        celulasVivas.forEach(function (o) {
            newLogica.asignarCelula(o.i1, o.i2, 1);
            var bloque = matrizDatos_.consultarBloque(o.i1, o.i2);
            bloque = bloque.filter(function (o) { return o.alive == 1; })
            if (bloque.length > 4)
                newLogica.asignarCelula(o.i1, o.i2, 0);
        });
    }

    function regla4() {
        var celulasVivas = obtenerCelulasMuertas();
        celulasVivas.forEach(function (o) {
            newLogica.asignarCelula(o.i1, o.i2, 0);
            var bloque = matrizDatos_.consultarBloque(o.i1, o.i2);
            bloque = bloque.filter(function (o) { return o.alive == 1; })
            if (bloque.length == 3)
                newLogica.asignarCelula(o.i1, o.i2, 1);
        });
    }


    function obtenerCelulasVivas() {
        var alive_cells = [];

        matrizDatos_.matrix.forEach(function (o) {
            o.filter(function (c) {
                return c.alive == 1;
            })
            .forEach(function (cell) {
                alive_cells.push(cell);
            })
        })

        return alive_cells;
    }

    function obtenerCelulasMuertas() {
        var dead_cells = [];

        matrizDatos_.matrix.forEach(function (o) {
            o.filter(function (c) {
                return c.alive == 0;
            })
            .forEach(function (cell) {
                dead_cells.push(cell);
            })
        })

        return dead_cells;
    }
    return me;

}