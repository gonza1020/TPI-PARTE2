// Product Constructor
export class Property {
    static id = 0;
    constructor(nombre, ubicacion, telefono,cantAmbientes,antiguedad,servicios,multimedia,tipo,disponibilidad) {
        this.codProp = ++this.constructor.id;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.telefono = telefono;
        this.cantAmbientes = cantAmbientes;
        this.antiguedad = antiguedad;
        this.servicios = servicios;
        this.multimedia= multimedia;
        this.tipo= tipo;
        this.disponibilidad= disponibilidad;
        this.multimedia= ubicacion;


    }

}

