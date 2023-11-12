const autos = require('./autos');
const personas = require('./personas')

let concesionaria = {
    autos: autos,
    personas: personas,
    buscarAuto: function( patente ) {
        let busqueda = autos.find( auto => patente === auto.patente)
        return busqueda !== undefined ? busqueda : null
    },
    venderAuto: function( patente ) {
        let auto = this.buscarAuto( patente )
        console.log('------------------------')
        console.log('Auto vendido.')
        auto.vendido = true
        console.log(auto)
        console.log('------------------------')
    },
    autosParaLaVenta: function() {
        return this.autos.filter( auto => auto.vendido === false ) 
    },
    autosNuevos: function() {
        return this.autosParaLaVenta().filter( auto => auto.km < 100 )
    },
    listaDeVentas: function() {
        let autosVendidos = this.autos.filter( auto => auto.vendido === true )
        return autosVendidos.map( auto => auto.precio )
    },
    totalDeVentas: function() {
        return this.listaDeVentas().reduce( (acc, cur) => acc + cur) 
    },
    puedeComprar: function( patente, nombre ) {
        let persona = this.personas.find( persona => nombre === persona.nombre )
        let auto = this.buscarAuto(patente)
        let costoTotal = auto.precio <= persona.capacidadDePagoTotal
        let pagoCuota = persona.capacidadDePagoEnCuotas >= ( auto.precio / auto.cuotas )
        return costoTotal && pagoCuota
    },
    autosQuePuedeComprar: function( nombre ) {
        let autosDisponibles = this.autosParaLaVenta()
        return autosDisponibles.filter( auto => this.puedeComprar( auto.patente, nombre ) )
    }
}