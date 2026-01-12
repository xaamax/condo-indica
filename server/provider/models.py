from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from core.base_model import BaseModel
from categories.models import Category


class Provider(BaseModel):
    name = models.CharField(unique=True, max_length=50, verbose_name='Nome')
    phone = models.CharField(unique=True, max_length=20, verbose_name='Telefone')
    description = models.TextField(verbose_name='Descrição')
    cep = models.CharField(max_length=10, verbose_name='CEP')
    street = models.CharField(max_length=100, verbose_name='Logradouro')
    number = models.IntegerField(blank=True, null=True, verbose_name='Número')
    neighborhood = models.CharField(max_length=100, verbose_name='Bairro')
    city = models.CharField(max_length=100, verbose_name='Cidade')
    state = models.CharField(max_length=100, verbose_name='Estado')
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='provider',
        verbose_name='Categoria'
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='provider',
        verbose_name='Usuário'
    )

    @property
    def address(self):
        return f'{self.street}, {self.number} - {self.neighborhood} - {self.city}/{self.state}, {self.cep}'

    def clean(self):
        if Provider.objects.filter(
            user=self.user,
            category=self.category
        ).exclude(pk=self.pk).exists():
            raise ValidationError('Usuário já está vinculado a esta categoria.')

    class Meta:
        db_table = 'providers'
        verbose_name = 'Prestador'
        verbose_name_plural = 'Prestadores'

    def __str__(self):
        return self.name
