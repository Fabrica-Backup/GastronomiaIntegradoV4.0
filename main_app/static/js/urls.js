// ========== LIST ========== //
// ingrediente
window.listIngrediente = 'http://localhost:8000/api/ingredientes/list/';

// unidade_medida
window.listUnidadeMedida = 'http://localhost:8000/api/unidadesmedida/list';

// aula
window.listAula = "{% static 'testesJson/testeJsonAula.json' %}";

// receita
window.listReceita = "{% static 'testesJson/testeJsonReceitas.json' %}";

// associativa aula_receita
window.listAulaReceita = "{% static 'testesJson/testeJsonAulaReceita.json' %}";

// ========== LIST fim ========== //

function load_url() {
    if (typeof idData === 'undefined') {
        window.idData = 0;
    }
    // ========== INGREDIENTE ========== //
    window.createIngrediente = 'http://localhost:8000/api/ingredientes/create/';
    window.updateIngrediente = 'http://localhost:8000/api/ingredientes/edit/' + idData + '';
    window.deleteIngrediente = 'http://localhost:8000/api/ingredientes/delete/' + idData + '';

    // ========== AULAS ========== //
    window.createAula = 'http://localhost:3000/aulas';
    window.updateAula = 'http://localhost:3000/aulas/' + idData + '';
    window.deleteAula = 'http://httpbin.org/delete' + idData + '';

    // ========== AULA_RECEITA ========== //
    window.updateAulaReceita = "{% static 'testesJson/testeJsonAulaReceita.json' %}";
    window.deleteAulaReceita = "";
}