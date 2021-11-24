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

    getNombre(){
        return this.nombre;
    }
    getUbicacion(){
        return this.ubicacion;
    }
    getTel(){
        return this.telefono ;
    }
    getAmb(){
        return this.cantAmbientes;
    }
    getAnti(){
        return this.antiguedad ;
    }
    getServicios(){
        return this.servicios ;
    }
    getMulti(){
        return this.multimedia= multimedia;
    }
    getTipo(){
        return this.tipo ;
    }
    getDisponibilidad(){
        return this.disponibilidad;
    } 
    getPropietario(){
        return this.propietario ;
    } 


}

