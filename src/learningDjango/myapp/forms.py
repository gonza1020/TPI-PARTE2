from django import forms
from django.core import validators

class FormArticle(forms.Form):

    title = forms.CharField(
        label = "Titulo",
        max_length=50,
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'kpo',
                'class': 'titulo_form_article'
            }
        ),
        validators=[
            validators.MinLengthValidator(4, 'El titulo es demasiado corto'),
            validators.RegexValidator('^[A-Za-z0-9ñ ]*$', 'El titulo no tiene el formato correcto', 'invalid_title')
        ]
    )



    content = forms.CharField(
        label="Contenido",
        widget=forms.Textarea,
        validators=[
            validators.MaxLengthValidator(100)
        ]
    )

    content.widget.attrs.update({
        'placeholder': 'Insertalo',
        'class': 'titulo_form_article',
        'id':'contenido_form'
    })

    public_options=[
        (1, 'Si'),
        (0, 'No')
    ]
    public = forms.TypedChoiceField(
        label = 'Publico?',
        choices = public_options
    )