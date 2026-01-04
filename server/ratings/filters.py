from dj_rql.filter_cls import AutoRQLFilterClass

from .models import Rating


class RatingFilterClass(AutoRQLFilterClass):
    MODEL = Rating
