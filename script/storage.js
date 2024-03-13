
const btnHistorial = document.getElementById('localBtn')
btnHistorial.addEventListener('click', function(event) {
    event.preventDefault()
    cargarLocalStorage()
})

function cargarLocalStorage() {
    const jugadoresGuardados = JSON.parse((localStorage.getItem('jugadores')))
    const historialContainer = document.getElementById('historialContainer')
    const partidosTotales = localStorage.getItem('partidos')

    historialContainer.innerHTML = ''
    
    jugadoresGuardados.forEach((jugador, index) => {
        const sumaEstadistica = jugador.estadisticas.reduce((total,valor) => total+valor, 0)
        const promedio = sumaEstadistica / partidosTotales
        const card = document.createElement('div')
        const btnClearPlayer = document.createElement('button')
        btnClearPlayer.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        btnClearPlayer.setAttribute('class', 'btn btn-warning')
        btnClearPlayer.addEventListener('click', function(event){
            event.preventDefault()
            borrarCalculo(index)
        })
        card.setAttribute('class', 'storageDiv')
        card.innerHTML = `<h3>Nombre del jugador: ${jugador.nombre}</h3>
                            <h4>Estadísticas del jugador: ${jugador.estadisticas}</h4>
                            <h4> Promedio del jugador: ${promedio}</h4>`
    historialContainer.appendChild(card)
    card.appendChild(btnClearPlayer)
    })

    const btnClearStorage = document.createElement('button')
    btnClearStorage.textContent = 'Borrar todo el historial'
    btnClearStorage.setAttribute('class', 'btn btn-danger')
    btnClearStorage.addEventListener('click', function(){
        localStorage.clear()
        historialContainer.innerHTML = ''
    })
    historialContainer.appendChild(btnClearStorage)
}

function borrarCalculo(index) {
    let jugadoresGuardados = JSON.parse((localStorage.getItem('jugadores')))
    jugadoresGuardados.splice(index, 1)
    localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados))
    cargarLocalStorage()
}


