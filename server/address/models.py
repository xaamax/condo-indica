from django.db import models
from django.core.exceptions import ValidationError


class Address(models.Model):
    cep = models.CharField(max_length=10, verbose_name='CEP')
    street = models.CharField(max_length=100, verbose_name='Logradouro')
    number = models.IntegerField(blank=True, null=True, verbose_name='Número')
    neighborhood = models.CharField(max_length=100, verbose_name='Bairro')
    city = models.CharField(max_length=100, verbose_name='Cidade')
    state = models.CharField(max_length=100, verbose_name='Estado')

    def clean(self):
        if Address.objects.filter(
            cep=self.cep,
            number=self.number,
        ).exclude(pk=self.pk).exists():
            raise ValidationError('Endereço já está cadastrado.')

    class Meta:
        db_table = 'address'
        verbose_name = 'Endereço'
        verbose_name_plural = 'Endereços'

    def __str__(self):
        return f'{self.street}, {self.number} - {self.neighborhood} - {self.city}/{self.state}, {self.cep}'
