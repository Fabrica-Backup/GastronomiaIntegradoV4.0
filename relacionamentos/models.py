from django.db import models
from classificacoes.models import Classificacao
from categorias.models import Categoria
from unidades_medida.models import UnidadeMedida
import datetime

# todas as tabelas de relacionamento many to many


# ingrediente
class Ingrediente (models.Model):
    id_ingrediente = models.AutoField(primary_key=True)
    nome_ingrediente = models.CharField(max_length=200)
    quantidade_calorica_ingrediente = models.DecimalField(
        max_digits=6, decimal_places=1)
    aproveitamento_ingrediente = models.DecimalField(
        max_digits=4, decimal_places=1)
    quantidade_estoque_ingrediente = models.DecimalField(
        max_digits=12, decimal_places=2, default=0, null=True)
    quantidade_reservada_ingrediente = models.DecimalField(
        max_digits=12, decimal_places=2, default=0, null=True)
    valor_ingrediente = models.DecimalField(
        max_digits=12, decimal_places=2, default=0)
    motivo_retirada_estoque = models.CharField(max_length=200, null=True)
    id_unidade_medida = models.ForeignKey(
        'unidades_medida.UnidadeMedida', null=True, on_delete=models.CASCADE)


# receita
class Receita (models.Model):
    id_receita = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(
        'categorias.Categoria', on_delete=models.CASCADE)
    id_classificacao = models.ForeignKey(
        'classificacoes.Classificacao', on_delete=models.CASCADE)
    nome_receita = models.CharField(max_length=100)
    modo_preparo_receita = models.TextField(max_length=6500)
    ingredientes = models.ManyToManyField(
        'Ingrediente', through='ReceitaIngrediente')


# aula
class Aula (models.Model):
    id_aula = models.AutoField(primary_key=True)
    nome_aula = models.CharField(max_length=200)
    data_aula = models.DateField(default='01 de janeiro de 2000', null=True)
    descricao_aula = models.CharField(max_length=200)
    aula_agendada = models.BooleanField(default=True)
    aula_concluida = models.BooleanField(default=True)
    periodo_aula = models.CharField(max_length=100, null=True)
    receitas = models.ManyToManyField('Receita', through='AulaReceita')


class AulaReceita (models.Model):
    id_aula_receita = models.AutoField(primary_key=True)
    id_aula = models.ForeignKey('Aula', on_delete=models.CASCADE)
    id_receita = models.ForeignKey('Receita', on_delete=models.CASCADE)
    quantidade_receita = models.DecimalField(
        max_digits=12, decimal_places=2, default=0)


# receita ingrediente
class ReceitaIngrediente (models.Model):
    id_receita_ingrediente = models.AutoField(primary_key=True)
    id_receita = models.ForeignKey('Receita',  on_delete=models.CASCADE)
    id_ingrediente = models.ForeignKey(
        'Ingrediente',  on_delete=models.CASCADE)
    quantidade_bruta_receita_ingrediente = models.DecimalField(
        max_digits=12, decimal_places=2, default=0)
    custo_bruto_receita_ingrediente = models.DecimalField(
        max_digits=12, decimal_places=2, default=0)
