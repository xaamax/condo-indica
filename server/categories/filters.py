from dj_rql.filter_cls import AutoRQLFilterClass
from .models import Category


class CategoryFilterClass(AutoRQLFilterClass):
    MODEL = Category
