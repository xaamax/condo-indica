from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import DashboardService

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "cards": DashboardService.get_cards_data(),
            "charts": {
                "recommended_providers": [
                    {"month": "Jan", "value": 4700},
                    {"month": "Feb", "value": 4400},
                    {"month": "Mar", "value": 4300},
                    {"month": "Apr", "value": 1700},
                    {"month": "May", "value": 4900},
                    {"month": "Jun", "value": 5200},
                    {"month": "Jul", "value": 4700},
                    {"month": "Aug", "value": 2100},
                    {"month": "Sep", "value": 2700},
                    {"month": "Oct", "value": 2900},
                    {"month": "Nov", "value": 1700},
                    {"month": "Dec", "value": 1100}
                ]
            },
            "top_providers": [
                {
                    "name": "Olivia Martin",
                    "email": "olivia.martin@email.com",
                    "value": 1999.00
                },
                {
                    "name": "Jackson Lee",
                    "email": "jackson.lee@email.com",
                    "value": 39.00
                },
                {
                    "name": "Isabella Nguyen",
                    "email": "isabella.nguyen@email.com",
                    "value": 299.00
                },
                {
                    "name": "William Kim",
                    "email": "will@email.com",
                    "value": 99.00
                },
                {
                    "name": "Sofia Davis",
                    "email": "sofia.davis@email.com",
                    "value": 39.00
                }
            ]
        })
