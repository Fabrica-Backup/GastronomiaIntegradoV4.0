from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/unidadesmedida/', include('unidades_medida.urls')),
    
    url(r'^api/categoria/', include('categorias.urls')),
    url(r'^api/classificacao/', include('classificacoes.urls')),
    
    url(r'', include('main_app.urls')),
    url(r'^api/', include('relacionamentos.urls')),
    
   
]
