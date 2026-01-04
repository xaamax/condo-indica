from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from core.base_model import BaseModel
from address.models import Address
from categories.models import Category


class Provider(BaseModel):
    phone = models.CharField(unique=True, max_length=20, verbose_name='Telefone')
    description = models.TextField(verbose_name='Descrição')
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='provider',
        verbose_name='Categoria'
    )
    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE,
        related_name='provider',
        verbose_name='Endereço'
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='provider',
        verbose_name='Usuário'
    )

    def clean(self):
        if Provider.objects.filter(
            user=self.user,
            category=self.category
        ).exclude(pk=self.pk).exists():
            raise ValidationError('Usuário já está vinculado a esta categoria.')

        if Provider.objects.filter(
            user=self.user,
            address=self.address,
        ).exclude(pk=self.pk).exists():
            raise ValidationError('Usuário já está vinculado a este endereço.')

    class Meta:
        db_table = 'providers'
        verbose_name = 'Prestador'
        verbose_name_plural = 'Prestadores'

    def __str__(self):
        return f'{self.phone} - {self.category}'
