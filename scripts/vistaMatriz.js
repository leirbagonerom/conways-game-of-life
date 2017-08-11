
//ejemplo config {tipo:'canvas|html'}
window.leirbag.vistaMatriz =
    function (logic) {
        var me = {};
        var _logic = logic;
        var ctx = document.getElementById("canvas").getContext("2d");
        var matrix_size = logic.tamanio_matriz;
        var w = 500;
        var h = 500;
        var x = 50;
        var y = 50;

        me.init = initialize;
        me.updateBoard = updateBoard;

        return me;

        function initialize() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.canvas.addEventListener('click', null);
            ctx.canvas.addEventListener('click', function (mouseClik) {

                var click_x = parseInt(mouseClik.clientX);
                var click_y = parseInt(mouseClik.clientY);

                var cell = getGridCell(click_x, click_y)
                if (cell != null) {
                    var logic_cell = _logic.obtenerCelula(cell.cell_index.i2, cell.cell_index.i1);
                    if (logic_cell.alive == 0)
                        drawGridCell(cell.cell_x, cell.cell_y)
                    else
                        clearGridCell(cell.cell_index.i2, cell.cell_index.i1)

                    _logic.asignarCelula(cell.cell_index.i2, cell.cell_index.i1, (logic_cell.alive == 1 ? 0 : 1));
                    console.log(_logic.obtenerCelula(cell.cell_index.i2, cell.cell_index.i1));
                }
            });
            printGrid();

        }

        function drawGridCell(x_, y_) {
            ctx.beginPath();
            var size = (w / matrix_size) - 6;
            ctx.rect((x_ + x) + 3, (y_ + y) + 3, size, size);
            ctx.fillStyle = "gray";
            ctx.fill();
        }

        function printGrid() {


            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";
            ctx.rect(x, y, w, h);
            ctx.stroke();

            var div_size = w / matrix_size;
            for (var i = 0; i < matrix_size; i++) {
                ctx.beginPath();
                ctx.moveTo(i * div_size + x, y);
                ctx.lineTo(i * div_size + x, h + y);
                ctx.stroke();
            }

            for (var i = 0; i < matrix_size; i++) {
                ctx.beginPath();
                ctx.moveTo(x, i * div_size + y);
                ctx.lineTo(w + x, i * div_size + y);
                ctx.stroke();
            }
        }

        function getGridCell(x1, y1) {
            var cell_x = x1 - x;
            var cell_y = y1 - y;
            if (cell_x <= w && cell_y <= h && cell_x > 0 && cell_y > 0) {
                var res_x = 0;
                var res_y = 0;

                var div_size = w / matrix_size;
                var div = 0;
                var cell_index = { i1: 0, i2: 0 }
                for (var i = 0; i < matrix_size; i++) {

                    var curr_x = i * div_size;
                    var next_x = curr_x + div_size;
                    if (cell_x >= curr_x && cell_x <= next_x) {
                        res_x = curr_x;
                        cell_index.i2 = i;
                    }

                    if (cell_y >= curr_x && cell_y <= next_x) {
                        res_y = curr_x;
                        cell_index.i1 = i;
                    }


                }

                return { "cell_x": res_x, "cell_y": res_y, "cell_index": cell_index };
            }

            return null;
        }

        function clearGridCell(i1, i2) {

            var res_x = 0;
            var res_y = 0;

            var div_size = (w / matrix_size);
            for (var i = 0; i < matrix_size; i++) {
                var curr_x = (i * div_size);
                if (i == i1)
                    res_x = curr_x + x;

                if (i == i2)
                    res_y = curr_x + y;
            }

            div_size = div_size - 4;
            ctx.clearRect(res_x + 2, res_y + 2, div_size, div_size);
        }

        function updateBoard() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            printGrid();
            var alive_cells = [];

            _logic.matrix.forEach(function (o) {
                o.filter(function (c) {

                    return c.alive == 1;
                })
                    .forEach(function (cell) {
                        alive_cells.push(cell);
                    })
            })

            alive_cells.forEach(function (o) {
                var res_x = 0;
                var res_y = 0;

                var div_size = (w / matrix_size);
                for (var i = 0; i < matrix_size; i++) {
                    var curr_x = (i * div_size);
                    if (i == o.idx[0])
                        res_x = curr_x + (div_size / 4);

                    if (i == o.idx[1])
                        res_y = curr_x + (div_size / 4);
                }

                drawGridCell(res_x, res_y);
            })

        }
    }