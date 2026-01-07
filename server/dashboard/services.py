from ratings.models import Rating
from provider.models import Provider
from condominium.models import Condominium, CondominiumResident 


class DashboardService:
    @staticmethod
    def get_cards_data():
        return [
            {
                "title": "Avaliações",
                "icon": "Star",
                "value": Rating.objects.count(),
            },
            {
                "title": "Prestadores",
                "icon": "Wrench",
                "value": Provider.objects.count(),
            },
            {
                "title": "Condomínios",
                "icon": "Building",
                "value": Condominium.objects.count(),
            },
            {
                "title": "Moradores",
                "icon": "Users",
                "value": CondominiumResident.objects.count(),
            },
        ]
