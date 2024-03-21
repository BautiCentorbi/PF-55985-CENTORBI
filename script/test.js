const container = document.getElementById('listadoJugadores')

const jugadoresTotales = []

fetch("./data/players.json")
.then(response => response.json())
.then(data => {
    data.forEach(jugador => {
        const card = document.createElement('div')
        card.innerHTML = `<h4>Nombre del Jugador: <span>${jugador.nombre}</span></h4>
                        <h4>Puntos: <span>${jugador.puntos}</span></h4>
                        <h4>Rebotes: <span>${jugador.rebotes}</span></h4>
                        <h4>Asistencias: <span>${jugador.asistencias}</span></h4>`
        container.appendChild(card)
        card.setAttribute('class', 'playerCard')
        jugadoresTotales.push(jugador)
    })
})

const mainContent = document.getElementById('mainContent')
const promedioContainer = document.getElementById('promedioEquipo')

const btnCalcular = document.getElementById('calcularPromedio')
function botonCalcular(event) {
    event.preventDefault()
    const indicaciones = document.createElement('h3')
    indicaciones.textContent = 'Selecciona qué estadística de equipo deseas calcular'
    indicaciones.setAttribute('class', 'h3-test')
    mainContent.appendChild(indicaciones)
    seleccionarEstadisticas()
    btnCalcular.removeEventListener('click', botonCalcular)
}
btnCalcular.addEventListener('click', botonCalcular)

let seleccion

function seleccionarEstadisticas(){
    const opcionesContainer = document.createElement('select')
    opcionesContainer.setAttribute('class', 'form-select form-select-sm')
    opcionesContainer.innerHTML = `<option selected>Selecciona una estadística</option>
                                    <option value="puntos">Puntos</option>
                                    <option value="rebotes">Rebotes</option>
                                    <option value="asistencias">Asistencias</option>`
    
    opcionesContainer.addEventListener('change', function(){
        seleccion = opcionesContainer.value
        resultadoContainer.innerHTML = ''
        calcularPromedio(seleccion)
        console.log(seleccion);
    })
    mainContent.appendChild(opcionesContainer)
}

const resultadoContainer = document.getElementById('resultado')
const errorContainer = document.getElementById('errorContainer')

function calcularPromedio(seleccion) {
    const cantidadJugadores = jugadoresTotales.length

    let totalPuntos = 0
    let totalRebotes = 0
    let totalAsistencias = 0

    jugadoresTotales.forEach(jugador => {
        totalPuntos += jugador.puntos.reduce((acc, el) => acc + el, 0)
        totalRebotes += jugador.rebotes.reduce((acc, el) => acc + el, 0)
        totalAsistencias += jugador.asistencias.reduce((acc, el) => acc + el, 0)
    })

    let promedio = 0

    try {
        if (seleccion == 'puntos'){
            promedio = totalPuntos / cantidadJugadores
            console.log(promedio);
        } else if (seleccion == 'rebotes'){
            promedio = totalRebotes / cantidadJugadores
        } else if (seleccion == 'asistencias'){
            promedio = totalAsistencias / cantidadJugadores
        } else {
            throw new Error('Por favor, selecciona una opción válida');
        }
        const outputResultado = document.createElement('p')
        outputResultado.textContent = `El equipo hizo un promedio de: ${promedio.toFixed(2)} ${seleccion} por partido`
        resultadoContainer.appendChild(outputResultado)

        const resetBtn = document.createElement('button')
        resetBtn.setAttribute('type', 'button')
        resetBtn.setAttribute('class', 'btn btn-success')
        resetBtn.textContent = 'Reiniciar Simulador'
        resetBtn.addEventListener('click', function() {
            reiniciarSimulador()
        })
        resultadoContainer.appendChild(resetBtn)
        
    } catch (err) {
        let error1 = document.createElement('p')
        error1.textContent = err
        error1.setAttribute('class','errores')
        errorContainer.appendChild(error1)
        promedioContainer.appendChild(errorContainer)
    }
}

function reiniciarSimulador() {
    location.reload()
}


Toastify({
    text: 'Volver',
    className: "toastify-alert",
    offset: {
        x: 20,
        y: 120
    },
    duration: -1,
    destination: "index.html",
    newWindow: false,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: {
    background: "linear-gradient(to right, #833ab4, #1d1efd)",
    },
    onClick: function(){}
}).showToast();
