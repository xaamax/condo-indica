from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from core.base_model import BaseModel
from provider.models import Provider


class Condominium(BaseModel):
    name = models.CharField(max_length=100, verbose_name='Nome')
    cep = models.CharField(max_length=10, verbose_name='CEP')
    street = models.CharField(max_length=100, verbose_name='Logradouro')
    number = models.IntegerField(blank=True, null=True, verbose_name='Número')
    neighborhood = models.CharField(max_length=100, verbose_name='Bairro')
    city = models.CharField(max_length=100, verbose_name='Cidade')
    state = models.CharField(max_length=100, verbose_name='Estado')

    class Meta:
        db_table = 'condominiuns'
        verbose_name = 'Condomínio'
        verbose_name_plural = 'Condomínios'

    def __str__(self):
        return f'{self.name} - {self.address_full}'

    @property
    def address_full(self):
        return f'{self.street}, {self.number} - {self.neighborhood} - {self.cep} - {self.city}/{self.state}'


class CondominiumResident(BaseModel):
    apartment = models.IntegerField(verbose_name='Apartamento')
    block = models.CharField(max_length=50, verbose_name='Bloco')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='condominium_residents',
        verbose_name='Usuário'
    )

    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='condominium_residents',
        verbose_name='Condomínio'
    )

    def clean(self):
        if CondominiumResident.objects.filter(
            user=self.user,
            condominium=self.condominium,
            apartment=self.apartment,
            block=self.block
        ).exclude(pk=self.pk).exists():
            raise ValidationError(
                'Usuário já está vinculado a este apartamento e bloco.'
            )

    class Meta:
        db_table = 'condominium_residents'
        verbose_name = 'Morador'
        verbose_name_plural = 'Moradores'

    def __str__(self):
        return f'{self.user} - {self.condominium} - {self.apartment}{self.block}'


class CondominiumProvider(BaseModel):
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='condominium_providers',
        verbose_name='Condomínio'
    )
    provider = models.ForeignKey(
        Provider,
        on_delete=models.CASCADE,
        related_name='condominium_providers',
        verbose_name='Prestador de Serviço'
    )

    def clean(self):
        if not self.condominium_id:
            raise ValidationError('Condomínio é obrigatório.')

        if not self.provider_id:
            raise ValidationError('Prestador de Serviço é obrigatório.')

        if CondominiumProvider.objects.filter(
            provider=self.provider,
            condominium=self.condominium
        ).exclude(pk=self.pk).exists():
            raise ValidationError('Prestador de Serviço já está vinculado a este condomínio.')

    class Meta:
        db_table = 'condominium_providers'
        verbose_name = 'Prestador de Serviço'
        verbose_name_plural = 'Prestadores de Serviços'

    def __str__(self):
        return f'{self.provider}'
