from django.shortcuts import render, HttpResponse, redirect
from myapp.models import Article
from django.db.models import Q
from myapp.forms import FormArticle
from django.contrib import messages

# Create your views here.
# MVC = Modelo Vista Controlador --> Acciones (metodos)
# MVT = Modelo Template Vista --> Acciones (metodos)

layout = """
<h1>Sitio Web con Django @Carri</h1>
<hr/>
<ul>
    <li>
        <a href="/inicio">Inicio</a>
    </li>
    <li>
        <a href="/hola-mundo">Hola Mundo</a>
    </li>
    <li>
        <a href="/pagina-pruebas">Pagina de prueba</a>
    </li>
</ul>
<hr/>
"""

def index(request):
    
    """
    html = ""
        <h1>Inicio</h1>
        <p>Años hasta el 2050</p>
        <ul>
    ""
    year = 2021
    while year < 2051:
        html+=f"<li>{str(year)}</li>"
        year+=1
    html += "</ul>"
    """
    nombre = 'Juan Cruz Carrizo'
    lenguajes = ['JavaScript', 'Python', 'PHP', 'C']
    year = 2021
    hasta = range(year, 2051)
    return render(request,'index.html', {
        'mi_variable': 'Soy un dato que esta en la vista',
        'title': 'Inicio',
        'nombre': nombre,
        'lenguajes': lenguajes,
        'years': hasta
    })


def hola_mundo(request):
    return render(request, 'hola_mundo.html')

def pagina(request, redirigir=0):
    if redirigir==1:
        return redirect('/inicio')
    return render(request, 'pagina.html', {
        'texto':"Este es mi texto",
        'lista': ['uno', 'dos', 'tres']
    })

def contacto(request, nombre="", apellido=""):
    return HttpResponse(layout+f"""
    <h2>Contactos</h2>
    <li>{nombre} {apellido}</li>
    """)

def crear_articulo(request, title, content, public):

    articulo = Article(
        title = title,
        content = content,
        public = public
    )
    articulo.save() #Para guardarlo en la bd
    return HttpResponse(f"Articulo creado: {articulo.title} - {articulo.content}")

def create_full_article(request):

    if request.method == 'POST':
        
        formulario = FormArticle(request.POST)
        if formulario.is_valid():
            data_form = formulario.cleaned_data
            title= data_form.get('title')
            content=data_form['content']
            public= data_form['public']

            articulo = Article(
                title = title,
                content = content,
                public = public
            )
            articulo.save() #Para guardarlo en la bd

            #Crear mensaje flash (solo se muestra una vez)
            messages.success(request, 'Has creado el articulo correctamente')
            



            return redirect('articulos')
            #return HttpResponse(articulo.title + ' ' + articulo.content + ' '+ str(articulo.public))
    else:
        formulario = FormArticle()

    return render(request, 'create_full_article.html', {
        'form':formulario
    })

def save_article(request):

    if request.method == "POST":
        
        articulo = Article(
            title = request.POST['title'],
            content = request.POST['content'],
            public = request.POST['public']
        )
        articulo.save() #Para guardarlo en la bd
        
        return HttpResponse(f"Articulo creado: {articulo.title} - {articulo.content}")

    else:
        return HttpResponse("<h2>No se ha podido crear el articulo</h2>")

def create_article(request):

    return render(request, 'create_article.html')



def mostrar_articulo(request, id):
    #articulo = Article.objects.get(pk=4) pk es primary key
    try:
        articulo = Article.objects.get(pk=id, public=True) #Osea si no es publico no lo va a mostrar
        return HttpResponse(f"Articulo: <strong>{articulo.title}</strong><br/><hr/>{articulo.content}")
    except:
        return HttpResponse("Articulo no encontrado")

def editar_articulo(request, id):

    articulo = Article.objects.get(pk=id)
    articulo.title = "Raqueta"
    articulo.content = "Se la usa para juga la tenis"
    articulo.save()
    return HttpResponse(f"Articulo: <strong>{articulo.title}</strong><br/><hr/>{articulo.content}")
    #mostrar_articulo(id=id)

def listar_articulos(request):
    
    articulos= Article.objects.filter(public=True).order_by('id') #[:3]Para mostrar solo los primeros 3
    return render(request, 'articulos.html',{
        'articulos':articulos  
    })

def borrar_articulo(request, id):
    articulo = Article.objects.get(pk=id)
    articulo.delete()

    return redirect('articulos')

#Tipos de filtros

# articulos = Article.objects.filter(title="Campazzo")
# articulos = Article.objects.order_by('id')
# articulos = Article.objects.all()
# articulos = Article.objects.filter(title__contains="articulo")
# articulos = Article.objects.filter(title__iexact="articulo") no tiene sensibilidad en mayusculas
# articulos = Article.objects.filter(id__gt=3) gt es >, gte es >=
# articulos = Article.objects.filter(id__lt=3) lte es <=
# Estos filtros se pueden combinar


# articulos = Article.objects.filter(title="Articulo").exclude(public=False)

#PARA HACER UN OR EN LA CONSULTA
# articulos = Article.objects.filter(
#   Q(title__contains="2") | Q(title__contains="3")
# )