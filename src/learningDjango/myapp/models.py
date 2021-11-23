from django.db import models

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(default = 'null', upload_to="articles")
    public = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name="Article"
        verbose_name_plural="Articles"
        ordering=['id']
    
    def __str__(self):
        return f"{self.title}"
    

class Category(models.Model):

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    created_at = models.DateField()
    
    class Meta:
        verbose_name="Category"
        verbose_name_plural="Categories"
