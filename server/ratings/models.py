from django.db import models
from django.core.exceptions import ValidationError

from core.base_model import BaseModel
from provider.models import Provider
from condominium.models import CondominiumResident


class Rating(BaseModel):
    stars = models.IntegerField(verbose_name='Estrelas')
    comment = models.TextField(verbose_name='Comentário', blank=True, null=True)
    provider = models.ForeignKey(
        Provider,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name='Prestador de Serviço'
    )
    resident = models.ForeignKey(
        CondominiumResident,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name='Morador'
    )

    def clean(self):
        if Rating.objects.filter(
            provider=self.provider,
            resident=self.resident,
        ).exclude(pk=self.pk).exists():
            raise ValidationError('Morador já avaliou este Prestador de Serviço.')

    class Meta:
        db_table = 'ratings'
        verbose_name = 'Avaliação'
        verbose_name_plural = 'Avaliações'

    def __str__(self):
        return f'{self.resident} - {self.provider}'
