$('.aulas').on('click', '.botaoAulaConcluida', function() {
    // pega id da receita
    idData = $(this).closest('tr').data('id');

    if (typeof jsonReceitaIngrediente === 'undefined' || typeof jsonIngrediente === 'undefined') {
        $.getJSON(listReceitaIngrediente, function(jsonObjectReceitaIngrediente) {
            jsonReceitaIngrediente = jsonObjectReceitaIngrediente;
            $.getJSON(listIngrediente, function(jsonObjectIngrediente) {
                jsonIngrediente = jsonObjectIngrediente;
                mainFunction()
            })
        })
    } else {
        mainFunction()
    }

    function mainFunction() {
        var concluiAulaSerial = criaSerialize();
        var receitaArr = populaReceitaArr();
        var ingredienteArr = populaIngredienteArr(receitaArr[0]);
        // Obs: receitaArr[0] = array de Ids de receita
        // Obs: receitaArr[1] = array de qtd de receitas da aula

        // Obs: ingredienteArr[0] = array de Ids de ingrediente
        // Obs: ingredienteArr[1] = array de qtd de ingrediente usada na receita
        var qtdEstoque = populaEstoqueArr(ingredienteArr[0]);
        var qtdTotalUsada = calculos(receitaArr[0], receitaArr[1], ingredienteArr[0], ingredienteArr[1]);
        console.log(ingredienteArr[0], qtdTotalUsada)

        ajaxConcluiAula(concluiAulaSerial, ingredienteArr[0], qtdTotalUsada);
    }
})

function criaSerialize() {
    var concluiAulaSerial = $('#lagumacoisa').serializeArray()
    return concluiAulaSerial;
}

function populaReceitaArr() {
    var receitaArr = [];
    var qtdReceita = [];

    $.map(jsonAulaReceita, function(valAulaReceita) {
        if (valAulaReceita.id_aula == idData) {
            receitaArr.push(valAulaReceita.id_receita);
            qtdReceita.push(valAulaReceita.quantidade_receita);
        }
    })
    return [receitaArr, qtdReceita];
}

function populaIngredienteArr(receitaIdArr) {
    var ingredienteArr = [];
    var qtdReceita = [];

    for (var i = 0; i < receitaIdArr.length; i++) {
        $.map(jsonReceitaIngrediente, function(valReceitaIngrediente) {
            if (valReceitaIngrediente.id_receita == receitaIdArr[i]) {
                ingredienteArr.push(valReceitaIngrediente.id_ingrediente);
                qtdReceita.push(valReceitaIngrediente.quantidade_bruta_receita_ingrediente);
            }
        })
    }
    return [ingredienteArr, qtdReceita];
}

function populaEstoqueArr(ingredienteIdArray) {
    var qtdEstoque = [];

    for (var i = 0; i < ingredienteIdArray.length; i++) {
        $.map(jsonIngrediente, function(valIngrediente) {
            qtdEstoque.push(valIngrediente.quantidade_estoque_ingrediente)
        })
    }
    return qtdEstoque;
}

function calculos(receitaIdArr, receitaQtdArr, ingredienteIdArr, qtdUsadaArr) {
    var qtdReceitaExtend = [];
    var qtdTotalUsar = [];

    for (var i = 0; i < ingredienteIdArr.length; i++) {
        $.map(jsonReceitaIngrediente, function(valReceitaIngrediente) {
            if (receitaIdArr[i] == valReceitaIngrediente.id_receita) {
                qtdReceitaExtend.push(receitaQtdArr[i]);
            }
        })
    }

    for (var j = 0; j < ingredienteIdArr.length; j++) {
        qtdTotalUsar.push(qtdReceitaExtend[j] * qtdUsadaArr[j])

    }
    return qtdTotalUsar;
}

function ajaxConcluiAula(concluiAulaSerial, idIngrediente, qtdTotalUsada) {
    var jsonMontadoArr = montaJson();

    function montaJson() {
        ///TODO: montar json de ingrediente
        ///TODO: montar json de concluir aula
    }
}