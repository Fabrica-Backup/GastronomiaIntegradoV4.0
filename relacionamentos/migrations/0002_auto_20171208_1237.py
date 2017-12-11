# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-08 14:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('relacionamentos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingrediente',
            name='quantidade_estoque_ingrediente',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='ingrediente',
            name='quantidade_reservada_ingrediente',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, null=True),
        ),
    ]
