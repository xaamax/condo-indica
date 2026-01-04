from django.db import models
from core.base_model import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=100, verbose_name='Nome')
    icon = models.CharField(max_length=50, blank=True, null=True, verbose_name='Ícone')

    class Meta:
        db_table = 'categories'
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

    def __str__(self):
        return self.name
