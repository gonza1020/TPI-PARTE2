// Product Constructor
export class Property {
    

    constructor(id,nombre, ubicacion, telefono,cantAmbientes,antiguedad,servicios,multimedia,tipo,disponibilidad,propietario) {
        this.id = id
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

