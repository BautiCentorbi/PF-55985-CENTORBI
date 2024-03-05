
const btnHistorial = document.getElementById('localBtn')
btnHistorial.addEventListener('click', function(event) {
    event.preventDefault()
    cargarLocalStorage()
})

function cargarLocalStorage() {
    const jugadoresGuardados = JSON.parse((localStorage.getItem('jugadores')))
    const historialContainer = document.getElementById('historialContainer')
    const partidosTotales = localStorage.getItem('partidos')
    
    jugadoresGuardados.forEach((jugador) => {
        const sumaEstadistica = jugador.estadisticas.reduce((total,valor) => total+valor, 0)
        const promedio = sumaEstadistica / partidosTotales
        const card = document.createElement('div')
        card.setAttribute('class', 'storageDiv')
        card.innerHTML = `<h3>Nombre del jugador: ${jugador.nombre}</h3>
                            <h4>Estadísticas del jugador: ${jugador.estadisticas}</h4>
                            <h4> Promedio del jugador: ${promedio}</h4>`
    historialContainer.appendChild(card)
    });
}




