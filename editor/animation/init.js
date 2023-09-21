requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        function decToBin(number) {

            var bin = number.toString(2);

            return "0".repeat(8 - bin.length) + bin;
        }

        var io = new extIO({
            animation: function($expl, data){
                var checkioInput = data.in;
                if (!checkioInput) return;

                if (checkioInput[0] > 256 || checkioInput[1] > 256) return;
                
                var $table = $expl.find("table");
                var binA = decToBin(checkioInput[0]);
                var binB = decToBin(checkioInput[1]);
                var $first = $table.find(".first");
                var $second = $table.find(".second");
                var $xor = $table.find(".xor");
                $first.append($("<td>").text(checkioInput[0] + " = "));
                $second.append($("<td>").text(checkioInput[1] + " = "));
                $xor.append($("<td>").text("H = "));
                var dif = 0;
                for (var i = 0; i < 8; i++) {
                    $first.append($("<td>").text(binA[i]));
                    $second.append($("<td>").text(binB[i]));
                    $xor.append($("<td>").text(binB[i] == binA[i] ? "0" : "1"));
                    if (binB[i] != binA[i]) dif++;
                    if (i < 7) {
                        $first.append($("<td>").text(" "));
                        $second.append($("<td>").text(" "));
                        $xor.append($("<td>").text("+"));
                    }
                }
                $xor.append($("<td>").text(" = " + dif));
            }
        });
        io.start();
    }
);





