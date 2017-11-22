from django.conf.urls import url
from .views import CreateAula, ListAula, EditAula, DeleteAula
from .views import CreateIngrediente, ListIngrediente, EditIngrediente, DeleteIngrediente
from .views import CreateReceita, ListReceita, EditReceita, DeleteReceita

from .views import CreateAulaReceita, ListAulaReceita,  DeleteAulaReceita
from .views import CreateReceitaIngrediente, ListReceitaIngrediente, DeleteReceitaIngrediente

urlpatterns = [
    url(r'^aulas/create/$', CreateAula.as_view(), name='create'),
    url(r'^aulas/list/$', ListAula.as_view(), name='list'),
    url(r'^aulas/edit/(?P<id>[0-9]+)$', EditAula.as_view(), name='edit'),
    url(r'^aulas/delete/(?P<id>[0-9]+)$', DeleteAula.as_view(), name='delete'),

    url(r'^ingredientes/create/$', CreateIngrediente.as_view(), name='create'),
    url(r'^ingredientes/list/$', ListIngrediente.as_view(), name='list'),
    url(r'^ingredientes/edit/(?P<id>[0-9]+)$', EditIngrediente.as_view(), name='edit'),
    url(r'^ingredientes/delete/(?P<id>[0-9]+)$', DeleteIngrediente.as_view(), name='delete'),

    url(r'^receitas/create/$', CreateReceita.as_view(), name='create'),
    url(r'^receitas/list/$', ListReceita.as_view(), name='list'),
    url(r'^receitas/edit/(?P<id>[0-9]+)$', EditReceita.as_view(), name='edit'),
    url(r'^receitas/delete/(?P<id>[0-9]+)$', DeleteReceita.as_view(), name='delete'),


    url(r'^aula_receita/create/$', CreateAulaReceita.as_view(), name='create'),
    url(r'^aula_receita/list/$', ListAulaReceita.as_view(), name='list'),
    url(r'^aula_receita/delete/(?P<id>[0-9]+)$', DeleteAulaReceita.as_view(), name='delete'),


    url(r'^receita_ingrediente/create/$', CreateReceitaIngrediente.as_view(), name='create'),
    url(r'^receita_ingrediente/list/$', ListReceitaIngrediente.as_view(), name='list'),
    url(r'^receita_ingrediente/delete/(?P<id>[0-9]+)$', DeleteReceitaIngrediente.as_view(), name='delete'),
     

]