
const btnHistorial = document.getElementById('localBtn')
btnHistorial.addEventListener('click', function(event) {
    event.preventDefault()
    loader()
    cargarLocalStorage()
})

const historialContainer = document.getElementById('historialContainer')

function loader(){
    const loader = document.createElement('div')
    loader.setAttribute('class', 'loader')
    historialContainer.setAttribute('class', 'loader-container')
    historialContainer.appendChild(loader)
}

function cargarLocalStorage() {
    setTimeout(() => {
        document.removeChild
        historialContainer.setAttribute('class', 'storageContainer')
        const jugadoresGuardados = JSON.parse((localStorage.getItem('jugadores')))
        const partidosTotales = localStorage.getItem('partidos')

        historialContainer.innerHTML = ''
        try {
            if(!jugadoresGuardados || jugadoresGuardados.length === 0) {
                const btnVolver = document.createElement('button')
                btnVolver.textContent = 'Realizar un cálculo'
                btnVolver.setAttribute('class', 'btn btn-secondary')
                btnVolver.addEventListener('click', function(){
                    window.location = 'main.html'
                    historialContainer.innerHTML = ''
                })
                historialContainer.appendChild(btnVolver)
                throw new Error('No hay elementos guardados, intenta relizando un cálculo para poder realizar esta acción.')

            } else {
                jugadoresGuardados.forEach((jugador, index) => {
                    const sumaEstadistica = jugador.estadisticas.reduce((total,valor) => total+valor, 0)
                    const promedio = sumaEstadistica / partidosTotales
                    const card = document.createElement('div')
                    const btnClearPlayer = document.createElement('button')
                    
                    clearTimeout(cargarLocalStorage())
                    
                    btnClearPlayer.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
                    btnClearPlayer.setAttribute('class', 'btn btn-warning')
                    btnClearPlayer.addEventListener('click', function(event){
                        event.preventDefault()
                        borrarCalculo(index)
                    })
                    card.setAttribute('class', 'playerCard')
                    card.innerHTML = `<h4>Nombre del jugador: <span>${jugador.nombre}</span></h4>
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
        } catch (err) {
            let error1 = document.createElement('p')
            error1.textContent = err
            error1.setAttribute('class','errores')
            historialContainer.appendChild(error1)
        }
    }, 2000);
}

function borrarCalculo(index) {
    let jugadoresGuardados = JSON.parse((localStorage.getItem('jugadores')))
    jugadoresGuardados.splice(index, 1)
    localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados))
    cargarLocalStorage()
}


