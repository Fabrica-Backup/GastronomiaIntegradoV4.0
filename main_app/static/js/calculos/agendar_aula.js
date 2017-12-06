function calculos() {
    window.jsonReceitaIngrediente;
    window.jsonIngrediente;

    // cria array com as receitas da aula
    var receitaArr = [];

    $.each(jsonAulaReceita, function(index, valAulaReceita) {
        if (valAulaReceita.id_aula == idData) {
            receitaArr.push(valAulaReceita.id_receita);
        }
    })

    // garante que a associativa receita_ingrediente foi baixado
    if (typeof jsonReceitaIngrediente === 'undefined' || typeof jsonIngrediente === 'undefined') {
        $.getJSON(listReceitaIngrediente, function(jsonObjectReceitaIngrediente) {
            jsonReceitaIngrediente = jsonObjectReceitaIngrediente;
            $.getJSON(listIngrediente, function(jsonObjectIngrediente) {
                jsonIngrediente = jsonObjectIngrediente;
                mainFunction();
            })
        })
    } else {
        mainFunction();
    }

    // =========================== AQUI COMEÇA OS CALCULOS ========================== //
    function mainFunction() {
        // busca as receitas que está na array receitaArr
        for (i = 0; i < receitaArr.length; i++) {
            $.map(jsonReceitaIngrediente, function(valReceitaIngrediente) {
                if (valReceitaIngrediente.id_receita == receitaArr[i]) {
                    // qtdIngrediente_receita é a quantidade de ingredientes usado para a receita especifica
                    var qtdIngrediente_receita = valReceitaIngrediente.quantidade_bruta_receita_ingrediente
                    var idIngrediente = valReceitaIngrediente.id_ingrediente;

                    var serialQtdReceita = $('.qtdReceita' + i + '').serializeArray();

                    var qtdIngrediente = calculaIngredientes(qtdIngrediente_receita, serialQtdReceita);

                    var reservaTotal = somaIngredientesReservados(idIngrediente, qtdIngrediente);

                    console.log('reserva total', reservaTotal, ' | idIngrediente', idIngrediente)
                        // i define o form_muito_porco a ser procurado no html
                    ajaxIngrediente(i, idIngrediente, reservaTotal);
                }
            })
        }
    }

    // multiplica quantidade de receita desejado * ingrediente dessa receita
    function calculaIngredientes(qtdIngrediente_receita, serialQtdReceita) {
        var stringQtdReceita = JSON.stringify(serialQtdReceita);
        var parseQtdReceita = JSON.parse(stringQtdReceita);

        // pega o 'value' do json na posição 0
        var qtdReceita = parseQtdReceita[0].value;

        for (var i = 0; i < rec; i++) {
            return qtdReceita * qtdIngrediente_receita;
        }
    }

    function montaJson(idIngrediente, i, reservaTotal) {

        var serializedReturn = $('input[name!=quantidade_reservada_ingrediente]', $('.qtdReceita' + i + '')).serializeArray();


        $.map(jsonIngrediente, function(valIngrediente) {
            if (idIngrediente == valIngrediente.id_ingrediente) {
                serializedReturn.push({
                    name: 'nome_ingrediente',
                    value: valIngrediente.nome_ingrediente
                }, {
                    name: 'quantidade_calorica_ingrediente',
                    value: valIngrediente.quantidade_calorica_ingrediente
                }, {
                    name: 'aproveitamento_ingrediente',
                    value: valIngrediente.aproveitamento_ingrediente
                }, {
                    name: 'quantidade_estoque_ingrediente',
                    value: valIngrediente.quantidade_estoque_ingrediente
                }, {
                    name: 'quantidade_reservada_ingrediente',
                    value: reservaTotal
                }, {
                    name: 'valor_ingrediente',
                    value: valIngrediente.valor_ingrediente
                }, {
                    name: 'motivo_retirada_estoque',
                    value: valIngrediente.motivo_retirada_estoque
                }, {
                    name: 'id_unidade_medida',
                    value: valIngrediente.id_unidade_medida
                })
            }
        })

        return serializedReturn;
    }

    function ajaxIngrediente(i, idIngrediente, reservaTotal) {
        var jsonMontado = montaJson(idIngrediente, i, reservaTotal);

        console.log('serializedReturn', jsonMontado)
            // $.ajax({
            //         type: "POST",
            //         url: createAulaReceita,
            //         data: receita,
            //         dataType: 'json',
            //         success: function() {
            //             $('#addAula').modal('hide')
            //             swal({
            //                     title: "SUCESSO!",
            //                     type: "success",
            //                 },
            //                 function() {
            //                     location.reload();
            //                 }
            //             )
            //         },
            //         error: function() {
            //             swal({
            //                 title: "Problemas na inserção das receitas na aula",
            //                 type: "error",
            //                 confirmButtonText: "Ok",
            //                 confirmButtonColor: "#DD6B55",
            //             })
            //         }
            //     }

        // );

    }

    function somaIngredientesReservados(idIngrediente, qtdIngrediente) {
        var reservaAtual = parseInt(pegaIngredientesReservados(idIngrediente));
        var reservaSomada = reservaAtual + qtdIngrediente;
        return reservaSomada;
    }

    function pegaIngredientesReservados(idIngrediente) {
        var getReservaAtual;
        $.map(jsonIngrediente, function(valIngrediente) {
            if (valIngrediente.id_ingrediente == idIngrediente) {
                getReservaAtual = valIngrediente.quantidade_reservada_ingrediente;
            }
        })
        return getReservaAtual;
    }
}