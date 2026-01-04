from dj_rql.filter_cls import AutoRQLFilterClass

from .models import Address


class AddressFilterClass(AutoRQLFilterClass):
    MODEL = Address
