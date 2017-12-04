function calculos() {
    var qtd_receita;
    var idReceitaAR;

    $.map(jsonAulaReceita, function (valAulaReceita) {
        if (valAulaReceita.id_aula == idData) {
            idReceitaAR = valAulaReceita.id_receita;
            qtd_receita = valAulaReceita.quantidade_receita;

            return compara_idReceita(idReceitaAR, qtd_receita);
        }
    })
}

function compara_idReceita(idReceitaAR, qtd_receita) {
    var qtdIngrediente;
    var idIngrediente;

    /// TODO: NAO EXISTE jsonReceitaIngrediente AINDA
    $.map(jsonReceitaIngrediente, function (valReceitaIngrediente) {
        if (valReceitaIngrediente.id_receita == idReceitaAR) {
            idIngrediente = valReceitaIngrediente.id_ingrediente;
            qtdIngrediente = valReceitaIngrediente.quantidade_bruta_receita_ingrediente;

            return compara_idIngrediente(qtd_receita, qtdIngrediente, idIngrediente);
        }
    })
}

function compara_idIngrediente(qtd_receita, qtdIngrediente, idIngrediente) {
    var qtdEstoque;
    var qtdReservada;

    $.map(jsonIngrediente, function (valIngrediente) {
        if (valIngrediente.id_ingrediente == idIngrediente) {
            qtdEstoque = valIngrediente.quantidade_estoque_ingrediente;
            qtdReservada = valIngrediente.quantidade_reservada_ingrediente;

            return subtrai_ingrediente(qtd_receita, qtdEstoque, qtdReservada);
        }
    })
}

function subtrai_ingrediente(qtd_receita, qtdEstoque, qtdReservada) {
    var ingCalculado = qtd_receita * qtdIngrediente;
    if (qtdEstoque > ingCalculado) {
        /// TODO: name=qtdReservada vai pra um form em algum lugar do html para ser serializado
        var form_reserva = $('<form id="reserva"><input='+ingCalculado+' type="hidden" name="quantidade_reservada_ingrediente"></input></form>');
        $('#form_reserva').html(form_reserva);
    } else {
        alert('Quantidade no estoque insuficiente');
    }
}