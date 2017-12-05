function calculos() {
    var qtd_receita;
    var idReceitaAR;
    var qtdIngrediente;
    var idIngrediente;
    var qtdEstoque;
    var qtdReservada;

    $.map(jsonAulaReceita, function(valAulaReceita) {
        if (valAulaReceita.id_aula == idData) {
            idReceitaAR = valAulaReceita.id_receita;
            qtd_receita = valAulaReceita.quantidade_receita;

            return compara_idReceita();
        }
    })

    function compara_idReceita() {
        $.map(jsonReceitaIngrediente, function(valReceitaIngrediente) {
            if (valReceitaIngrediente.id_receita == idReceitaAR) {
                idIngrediente = valReceitaIngrediente.id_ingrediente;
                qtdIngrediente = valReceitaIngrediente.quantidade_bruta_receita_ingrediente;

                return compara_idIngrediente();
            }
        })
    }

    function compara_idIngrediente() {
        $.map(jsonIngrediente, function(valIngrediente) {
            if (valIngrediente.id_ingrediente == idIngrediente) {
                qtdEstoque = valIngrediente.quantidade_estoque_ingrediente;
                qtdReservada = valIngrediente.quantidade_reservada_ingrediente;

                return subtrai_ingrediente();
            }
        })
    }

    function subtrai_ingrediente() {
        var ingCalculado = qtd_receita * qtdIngrediente;
        if (qtdEstoque > ingCalculado) {
            // var form_reserva = $('<form id="reserva"><input value=' + ingCalculado + ' type="hidden" name="quantidade_reservada_ingrediente"></input></form>');
            var form_reserva = $('<form id="reserva"><input id="aReservar" value=' + ingCalculado + ' type="hidden"></input></form>');

            $('#form_reserva').html(form_reserva);
            criaSerial()
        } else {
            console.log(idIngrediente, 'Quantidade no estoque insuficiente');
        }
    }

    function criaSerial() {
        $.map(jsonAulaReceita, function(valAulaReceita) {
            if (idData == valAulaReceita.id_aula) {

                /// TODO: corrigir os forEach, ta criando varios JSON iguais
                var ingredienteSerial = $('#reserva').serializeArray();

                $.each(jsonIngrediente, function(index, valIngrediente) {
                    if (idIngrediente == valIngrediente.id_ingrediente) {
                        var aReservar = $('#aReservar').val();
                        var reservaExistente = valIngrediente.quantidade_reservada_ingrediente;
                        var reservaAtualizado = reservaExistente + aReservar;

                        ingredienteSerial.push({
                            name: 'id_ingrediente',
                            value: valIngrediente.id_ingrediente
                        }, {
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
                            name: 'valor_ingrediente',
                            value: valIngrediente.valor_ingrediente
                        }, {
                            name: 'motivo_retirada_estoque',
                            value: valIngrediente.motivo_retirada_estoque
                        }, {
                            name: 'id_unidade_medida',
                            value: valIngrediente.id_unidade_medida
                        }, {
                            name: 'quantidade_reservada_ingrediente',
                            value: aReservar
                        })
                        console.log(ingredienteSerial)
                    }
                })

            }
        })
    }
}