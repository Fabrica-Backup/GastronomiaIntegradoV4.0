// Chama calendario // planejar-aulas.html
function chamaDatePicker() {
    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0
    });
}

// Limpa as mensagens de sucesso e erro
function limpaMensagens() {
    // estoque.html
    $('#mensagens-sucesso-soma').empty();
    $('#mensagens-erro-soma').empty();

    $('#mensagens-sucesso-subtrair').empty();
    $('#mensagens-erro-subtrair').empty();

    // estoque.html, nova-receita.html, planejar-aulas.html
    $('#mensagens-erro').empty();
    $('#mensagens-sucesso').empty();

    // nova-receita.html
    $('#mensagens-ing-receita-erro').empty();

    // planejar-aulas.html
    $('#mensagens-erro-aula').empty();
    $('#mensagens-sucesso-aula').empty();
}