// Product Constructor
export class Property {
    static cont = 3;
    constructor(nombre, ubicacion, telefono,cantAmbientes,antiguedad,servicios,multimedia,tipo,disponibilidad,propietario) {
        this.id = Property.getid();
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.telefono = telefono;
        this.cantAmbientes = cantAmbientes;
        this.antiguedad = antiguedad;
        this.servicios = servicios;
        this.multimedia= multimedia;
        this.tipo= tipo;
        this.disponibilidad= disponibilidad;
        this.propietario = propietario;
    }

    static getid () { 
       this.cont += 1 
        return this.cont
    }

}

