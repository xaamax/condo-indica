from dj_rql.filter_cls import AutoRQLFilterClass
from .models import Condominium


class CondominiumFilterClass(AutoRQLFilterClass):
    MODEL = Condominium
