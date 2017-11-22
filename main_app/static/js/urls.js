// ========== LIST ========== //
// ingrediente
window.listIngrediente = 'http://localhost:8000/api/ingredientes/list/';

// unidade_medida
window.listUnidadeMedida = 'http://localhost:8000/api/unidadesmedida/list';

// aula
window.listAula = 'http://localhost:8000/api/aulas/list';

// receita
window.listReceita = 'http://localhost:8000/api/receitas/list';

// associativa aula_receita
window.listAulaReceita = 'http://localhost:8000/api/aula_receita/list/';

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
    window.createAula = 'http://localhost:8000/api/aulas/create';
    window.updateAula = 'http://localhost:8000/api/edit/' + idData + '';
    window.deleteAula = 'http://localhost:8000/api/delete' + idData + '';

    // ========== AULA RECEITA ========== //
    window.createAulaReceita = 'http://localhost:8000/api/aula_receita/create/';
    window.deleteAulaReceita = 'http://localhost:8000/api/aula_receita/delete/' + idData + '';
}