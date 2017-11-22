from django.shortcuts import render
from relacionamentos.models import Ingrediente, Aula, Receita, AulaReceita, ReceitaIngrediente

def index (request):
    return render(request, 'main_app/index.html', {})

def estoque (request):
    return render(request, 'main_app/estoque.html', {})

def planejar_aulas (request):
    return render (request, 'main_app/planejar-aulas.html',{})

def aulas_concluidas (request):
    return render (request, 'main_app/aulas-concluidas.html', {})

def nova_receita (request):
    return render(request, 'main_app/nova-receita.html', {})

def receita_detalhes (request):
    return render(request, 'main_app/receitas-detalhes.html', {})

def receitas (request):
    return render(request, 'main_app/receitas.html', {})