requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        var $tryit;

        function decToBin(number, len) {
            len = len || 8;
            var bin = number.toString(2);
            var pad = "";
            for (var i = len; i > bin.length; i--){
                pad += "0"
            }
            return pad + bin;
        }

        var io = new extIO({

            animation: function($expl, data){
                var checkioInput = data.in;
                if (!checkioInput){
                    return;
                }

                if (checkioInput[0] < 256 && checkioInput[1] < 256) {
                    var $table = $expl.find("table");
                    var binA = decToBin(checkioInput[0]);
                    var binB = decToBin(checkioInput[1]);
                    var $first = $table.find(".first");
                    var $second = $table.find(".second");
                    var $xor = $table.find(".xor");
                    $first.append($("<td>").text(checkioInput[0] + " = "));
                    $second.append($("<td>").text(checkioInput[1] + " = "));
                    $xor.append($("<td>").text("H = "));
                    for (var i = 1; i < binA.length; i++) {
                        $first.append($("<td>").text(binA[i]));
                        $second.append($("<td>").text(binB[i]));
                        if (i < binA.length - 1) {
                            $xor.append($("<td>").text(binB[i] == binA[i] ? "0+" : "1+"));
                        }
                        else {
                            $xor.append($("<td>").text(binB[i] == binA[i] ? "0" : "1"));
                        }

                    }
                }

            },
            tryit: function (this_e) {
                $tryit = $(this_e.extSetHtmlTryIt(this_e.getTemplate('tryit')));

                var $first = $tryit.find(".first");
                var $second = $tryit.find(".second");

                function changeRow(e) {
                    var $this = $(this);
                    var v = parseInt($this.val());
                    if (!v || isNaN(v)) {
                        v = 1;
                    }
                    else if (v > 255) {
                        v = 255;
                    }
                    $this.val(v);
                    var binV = decToBin(v);
                    var $row = $tryit.find("tr." + $this.attr("class")).find("td");
                    for (var i = 0; i < binV.length; i++){
                        $($row[i + 2]).html(binV[i]);
                    }
                    return false;
                }
                $tryit.find("input[type=number]").change(changeRow);
                $tryit.find("input[type=number]").keyup(changeRow);



                $tryit.find('.bn-check').click(function (e) {
                    var data = [
                        parseInt($tryit.find("input.first").val()),
                        parseInt($tryit.find("input.second").val())
                    ];
                    this_e.extSendToConsoleCheckiO(data[0], data[1]);
                    e.stopPropagation();
                    return false;
                });

            },
            retConsole: function (ret) {
                $tryit.find(".checkio-result-in").html("Your Result: " + ret);
            },
            animationTemplateName: 'template_animation',
            functions: {
                js: 'hammingDistance',
                python: 'checkio'
            }
        });
        io.start();
    }
);





