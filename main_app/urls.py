from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^estoque$', views.estoque),
    url(r'^aulas_concluidas$', views.aulas_concluidas),
    url(r'^planejar_aulas$', views.planejar_aulas),
    url(r'^nova_receita$', views.nova_receita),
    url(r'^receita_detalhes$', views.receita_detalhes),
    url(r'^receitas$', views.receitas),
]
