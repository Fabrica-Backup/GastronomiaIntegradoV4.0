// ==================== GET ===================== //
// verifica se foi dado get das receitas, aulas e periodo, caso nao tenha dado ele dará get aqui
if (typeof jsonAula === 'undefined' || typeof jsonReceita === 'undefined' || typeof jsonPeriodo === 'undefined') {
    // get da tabela de aulas 
    $.getJSON(listAula, function(jsonObjectAula) {
        jsonAula = jsonObjectAula;
        // get da tabela de receitas
        $.getJSON(listReceita, function(jsonObjectReceita) {
            jsonReceita = jsonObjectReceita;
            // get da tabela associativa aula_receita
            $.getJSON(listAulaReceita, function(jsonObjectAulaReceita) {
                jsonAulaReceita = jsonObjectAulaReceita;
                getTabela(jsonAula, jsonReceita, jsonAulaReceita);
            })
        })
    })
} else {
    getTabela(jsonAula, jsonReceita, jsonAulaReceita);
}

function getTabela(jsonAula, jsonReceita, jsonAulaReceita) {
    // geração de botoes
    var botaoExcluir = '<td><button type="button" class="btn btn-xs btn-danger excluir"><i class="fa fa-trash"></i></button></td>';
    var botaoEditar = '<td><button class="btn btn-xs editar" type="button"><i class="fa fa-edit"></i></button></td>';
    var botaoAgendarAula = '<td><button class="botaoAgendarAula" type="button">Agendar Aula</button></td>';
    var botaoAulaConcluida = '<td><button class="botaoAulaConcluida" type="button">Aula Concluida</button></td>';
    var botaoDetalhes = '<td><button type="button" class="btn btn-xs botaoDetalhes"><i class="fa fa-eye"></i></button></td>';

    // novaId e velhaID sao usados para não passar o foreach de mesma Id 2x (a tabela associativa aula_receita pode ter varias id_aula iguais)
    var novaId = 0;
    var velhaId = 0;

    $.each(jsonAula, function(indexAula, valAula) {
        novaId = valAula.id_aula;

        $.each(jsonAulaReceita, function(indexAulaReceitas, valueAulaReceitas) {
            if (novaId != velhaId) {
                // conta o numero de receitas na aula
                var countReceitas = Object.keys(valAula.receitas).length;

                if (valAula.id_aula == valueAulaReceitas.id_aula || countReceitas == 0) {
                    // cria a 'tr' de cada aula para ficar em formato de lista
                    var htmlList = $('<tr class="id-aula" data-id="' + valAula.id_aula + '"></tr>');

                    // cria as 'td' com os valores da aula E joga as 'td' dentro da 'tr' htmlList (<tr><td>  </td></tr>)
                    $('<td hidden class="id_aula">' + valAula.id_aula + '</td>').appendTo(htmlList);
                    $('<td class="nome_aula">' + valAula.nome_aula + '</td>').appendTo(htmlList);
                    $('<td class="dia_da_aula">' + valAula.data_aula + '</td>').appendTo(htmlList);
                    $('<td class="periodo">' + valAula.periodo_aula + '</td>').appendTo(htmlList);
                    $('<td class="num_receitas">' + countReceitas + '</td>').appendTo(htmlList);

                    // joga os botoes detalhes e excluir dentro da 'tr'
                    $(botaoDetalhes).appendTo(htmlList);
                    $(botaoExcluir).appendTo(htmlList);

                    // se aula_agendada = false, a aula NAO ESTA agendada
                    if (valAula.aula_agendada == false) {
                        $(botaoEditar).appendTo(htmlList);
                        $(botaoAgendarAula).appendTo(htmlList);
                        $(htmlList).appendTo('.listaAulasPlanejadas');
                    }
                    // se aula_agendada = true, aula ESTA planejada
                    if (valAula.aula_agendada == true && valAula.aula_concluida == false) {
                        $(botaoAulaConcluida).appendTo(htmlList);
                        $(htmlList).appendTo('.listaAulasAgendadas');
                    }
                    // se aula_agendada = true E se aula_concluida = true, aula ESTA CONCLUIDA
                    if (valAula.aula_agendada == true && valAula.aula_concluida == true) {
                        // .aulaConcluidaList esta localizado em aulas-concluidas.html
                        $(htmlList).appendTo('.aulaConcluidaList');
                    }
                    velhaId = novaId;
                }
            }
        })


    })

}

// ===================== POST PUT ===================== //
$('#addAula').on('click', '#saveButton', function() {

    var formAula = $('#form_addAula');

    // pega id da aula (se vazio = POST, se tem algo = PUT)
    idData = $('#form_addAula').find('.id_aula').val();
    load_url();
    var aulaSerialized = formAula.serializeArray();

    aulaSerialized.push({
        name: 'aula_agendada',
        value: false
    }, {
        name: 'aula_concluida',
        value: false
    })


    if (idData == 0) {
        var urlData = createAula;
        adicionaAula();
        aulaReceita_control();
        // location.reload()
    } else {
        var urlData = updateAula;
        idCount();
    }

    function adicionaAula() {
        console.log(aulaSerialized)
        $.ajax({
            type: "POST",
            url: urlData,
            dataType: "json",
            data: aulaSerialized,
            success: function() {
                console.log('aula criada')
                    // $('#mensagens-sucesso-aula').append('Aula criado com sucesso!');
            },
            error: function() {
                swal({
                        title: "Problemas para criar aula",
                        type: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#DD6B55",
                    },
                    function() {
                        location.reload();
                    }
                )
            }
        });
    }

    // chama a funçao deleteReceita() para apagar tudo com id_aula especifica, em seguida chama a funçao adicionaReceita()
    function idCount() {
        var idAssoc;
        $.map(jsonAulaReceita, function(valueAulaReceitas) {
            if (valueAulaReceitas.id_aula == idData) {
                idAssoc = valueAulaReceitas.id_aula_receita;
                return deleteReceita(idAssoc);
            }
        })
        return aulaReceita_control();
    }

    //EDIT
    // Remove a associação da aula especifica
    function deleteReceita(idAssoc) {
        var idDataTemp = idData;
        idData = idAssoc;
        load_url();

        $.ajax(deleteAulaReceita, {
            type: 'DELETE',
            data: {
                "id_aula_receita": idAssoc
            },
            dataType: 'json',
            success: function() {
                console.log("Receita da associativa removido");
                idData = idDataTemp;
            },
            error: function() {
                console.log("Problemas para remover as receitas da associativa");
            }
        })
    }

    // Adiciona todas as Receitas da aula
    function aulaReceita_control() {
        // se estiver criando aula idData == 0, vai buscar a id dessa aula para adicionar as receitas
        if (idData == 0) {
            // imagina que, var lastAulaInfo = lastId;
            var lastAulaInfo = searchLastId(jsonAula, 'id_aula');

            if (typeof lastAulaInfo === 'undefined') {
                idData = 0;
            } else {
                idData = lastAulaInfo.id_aula;
            }
            idData++;
            eachReceita();
        } else {
            return editAula();
        }

        // pega a id da aula que acabou de ser criada, ao criar uma aula ele ja irá ir inserindo as receitas
        function searchLastId(arr, prop) {

            var lastId;
            for (var i = 0; i < arr.length; i++) {
                if (!lastId || parseInt(arr[i][prop]) > parseInt(lastId[prop]))
                    lastId = arr[i];
            }
            return lastId;
        }
    }

    function editAula() {

        idData = $('#form_addAula').find('.id_aula').val();
        var aulaSerialized = $('#form_addAula').serializeArray();
        load_url();
        aulaSerialized.push({
            name: 'aula_agendada',
            value: false
        }, {
            name: 'aula_concluida',
            value: false
        })
        console.log(aulaSerialized);
        $.ajax({
            type: "POST",
            url: updateAula,
            data: aulaSerialized,
            dataType: 'json',
            success: function() {
                console.log('editou aula');
                eachReceita(idData);
            },
            error: function() {
                swal({
                        title: "Problemas ao editar aula",
                        type: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#DD6B55",
                    },
                    function() {
                        location.reload();
                    }
                )
            }
        });
    }
    // serializa o form_muito_porco do html e adiciona a ID da aula, ele da post para cada receita individualmente na associativa
    function eachReceita() {
        console.log(idData, 'id criada')
        for (i = 0; i < rec; i++) {
            var receita = $('.form_muito_porco' + i + '').serializeArray();
            receita.push({
                name: 'id_aula',
                value: '' + idData + ''
            })
            postReceita(receita);
        }
    }

    function postReceita(receita) {
        console.log(receita)
        $.ajax({
                type: "POST",
                url: createAulaReceita,
                data: receita,
                dataType: 'json',
                success: function() {
                    $('#addAula').modal('hide')
                    swal({
                            title: "SUCESSO!",
                            type: "success",
                        },
                        function() {
                            location.reload();
                        }
                    )
                },
                error: function() {
                    swal({
                            title: "Problemas na inserção das receitas na aula",
                            type: "error",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#DD6B55",
                        },
                        function() {
                            location.reload();
                        }
                    )
                }
            }

        );
    }
});

// ===================== MARCAR COMO AULA CONCLUIDA ===================== //
// $('.aulas').on('click', '.botaoAulaConcluida', function() {
//     // pega id da receita
//     idData = $(this).closest('tr').data('id');

//     load_url();

//     var formAulaSerial = $('#form_addAula').serializeArray();

//     $.map(jsonAula, function(valAula) {
//         if (idData == valAula.id_aula) {

//             formAulaSerial.push({
//                 name: 'nome_aula',
//                 value: valAula.nome_aula
//             }, {
//                 name: 'descricao_aula',
//                 value: valAula.descricao_aula
//             }, {
//                 name: 'data_aula',
//                 value: valAula.data_aula
//             }, {
//                 name: 'periodo_aula',
//                 value: valAula.periodo_aula
//             }, {
//                 name: 'aula_agendada',
//                 value: true
//             }, {
//                 name: 'aula_concluida',
//                 value: true
//             })
//             return aulaConcluida(formAulaSerial);
//         }
//     })

//     function aulaConcluida(formAulaSerial) {

//         swal({
//                 title: "Marcar esta aula como Concluida?",
//                 type: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: "Sim",
//                 closeOnConfirm: false,
//             },
//             function() {
//                 $.ajax(updateAula, {
//                     type: 'POST',
//                     data: formAulaSerial,
//                     dataType: 'json',
//                     success: function() {
//                         swal({
//                                 title: "Aula Concluida!",
//                                 type: "success",
//                             },
//                             function() {
//                                 location.reload();
//                             }
//                         )
//                     },
//                     error: function() {
//                         swal({
//                             title: "Problemas para concluir a aula",
//                             type: "error",
//                             confirmButtonText: "Ok",
//                             confirmButtonColor: "#DD6B55",
//                         })
//                     }
//                 })
//             }
//         );
//     }
// });

// ===================== DELETE ===================== //
$('.aulas').on('click', '.excluir', function() {
    var thisTr = $(this).closest('tr');
    idData = thisTr.data('id');

    load_url();

    swal({
            title: "Tem certeza que deseja deletar esta aula?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Deletar!",
            closeOnConfirm: false,
        },
        function() {
            $.ajax(deleteAula, {
                type: 'DELETE',
                data: {
                    "id_aula": idData
                },
                dataType: 'json',
                success: function() {
                    swal({
                            title: "Aula removido com sucesso!",
                            type: "success",
                        }),
                        $(thisTr).remove();
                },
                error: function() {
                    swal({
                        title: "Problemas ao remover a aula",
                        type: 'error',
                    })
                },
            })
        }
    );
});


// === === === === === == CLONAR AULA === === === === === === == //
// $('#verAula').on('click', '.clonar', function () {
//     // xunxo para pegar a id da aula
//     var idAula = $(this).closest('.modal-body').find('.receitasQuantidade').find('tr').data('id');
//     $.each(jsonAula, function (indexAula, valueAula) {
//         // formulario não existe, criando um array serializado vazio
//         var aulaCloneSerial = $('#form_addAula').serializeArray();

//         if (valueAula.id_aula == idAula) {
//             var objClone = new Object();
//             objClone.id_aula = '';
//             objClone.nome_aula = valueAula.nome_aula + ' CLONE';
//             objClone.descricao_aula = valueAula.descricao_aula;
//             objClone.data_aula = '';
//             objClone.periodo_aula = valueAula.periodo_aula;
//             objClone.aula_concluida = 'false';
//             objClone.aula_agendada = 'false';

//             // inserindo todos os dados da aula a ser clonada dentro da array serializado vazio
//             aulaCloneSerial.push(objClone);

//             return cloneAulaPost(objClone)
//         }

//         function cloneAulaPost(objClone) {
//             load_url();
//             console.log(objClone)
//             swal({
//                     title: "Clonar esta aula?",
//                     type: "warning",
//                     showCancelButton: true,
//                     confirmButtonText: "Clonar",
//                     closeOnConfirm: false,
//                 },
//                 function () {
//                     $.ajax(createAula, {
//                         type: 'POST',
//                         data: objClone,
//                         dataType: 'json',
//                         success: function () {
//                             console.log('aula clonada')
//                             clonaReceitas(idAula);
//                         },
//                         error: function () {
//                             swal({
//                                 title: "Problemas ao clonar aula",
//                                 type: "warning",
//                                 confirmButtonText: "Vish Maria",
//                                 confirmButtonColor: "#DD6B55",
//                             })
//                         },
//                     })
//                 }
//             );
//         }

//         function clonaReceitas(idAula) {
//             // insere a ultima id_aula criada na variavel
//             var lastIdObj = searchLastId(jsonAula, 'id_aula');
//             var lastId = lastIdObj.id_aula;
//             lastId++;

//             // pega a id da aula que acabou de ser clonada
//             function searchLastId(arr, prop) {

//                 var lastId;
//                 for (var i = 0; i < arr.length; i++) {
//                     if (!lastId || parseInt(arr[i][prop]) > parseInt(lastId[prop]))
//                         lastId = arr[i];
//                 }
//                 return lastId;
//             }

//             $.each(jsonAulaReceita, function (index, valueAulaReceitas) {
//                 // formulario não existe, criando um array serializado vazio
//                 var receitaCloneSerial = $('#form_addAula').serializeArray();
//                 if (valueAulaReceitas.id_aula == idAula) {
//                     var objCloneReceita = new Object();
//                     objCloneReceita.id_aula = lastId;
//                     objCloneReceita.id_receita = valueAulaReceitas.id_receita;
//                     objCloneReceita.quantidade_receita = valueAulaReceitas.quantidade_receita;

//                     receitaCloneSerial.push(objCloneReceita);
//                     clonaReceitasPost(receitaCloneSerial);
//                 }
//             })
//         }

//         function clonaReceitasPost(receitaCloneSerial) {
//             load_url();
//             console.log(receitaCloneSerial);
//             $.ajax({
//                 type: 'POST',
//                 url: createAulaReceita,
//                 data: receitaCloneSerial,
//                 dataType: 'json',
//                 success: function () {
//                     swal({
//                         title: 'Aula clonado com sucesso!',
//                         text: 'Clone está localizado em Planejar Aulas',
//                         type: 'success',
//                         confirmButtonText: "Ok",
//                     });
//                 },
//                 error: function () {
//                     swal({
//                         title: "Problemas ao copiar as receitas da aula",
//                         type: "warning",
//                         confirmButtonText: "Vish Maria",
//                         confirmButtonColor: "#DD6B55",
//                     })
//                 },
//             })
//         }
//     })
// })