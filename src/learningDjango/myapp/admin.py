from django.contrib import admin
from .models import *

# Register your models here.

class ArticleAdmin(admin.ModelAdmin):
    readonly_fields=('created_at', 'updated_at')

admin.site.register(Article, ArticleAdmin)
admin.site.register(Category)

#Configurar titulo del panel
admin.site.site_header = "Master en Python"
admin.site.site_title="Carrizo"