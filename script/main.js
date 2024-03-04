const resultadosContainer = document.getElementById('resultadosContainer')

class Jugador {
    static id = 0
    constructor(nombre){
        this.nombre = nombre
        this.estadisticas = []
        this.id = ++Jugador.id
    }
    agregarEstadistica(mensaje, partido){
        const inputValor = document.createElement('input')  
        inputValor.setAttribute('type','number')
        inputValor.setAttribute('class','number')
        inputValor.setAttribute('placeholder', 'Ingrese estadística')
        inputValor.setAttribute('id',`estadisticasJugador${this.id}, partido ${partido + 1}`)
        inputValor.setAttribute('required', 'true')

        const labelValor = document.createElement('label')
        labelValor.textContent = `¿Cuántos ${mensaje} hizo el jugador ${this.nombre} en el partido ${partido + 1}?`
        labelValor.setAttribute('class', 'labelValor')

        resultadosContainer.appendChild(labelValor)
        resultadosContainer.appendChild(inputValor)
        return inputValor
    }

    // Función de orden superior aplicada en array de objetos (reduce).
    
    calcularPromedioEstadistica(){
        const totalEstadistica = this.estadisticas.reduce((acc, el) => acc + el, 0)
        return totalEstadistica / this.estadisticas.length || 0
    }
}

const main = document.getElementById('statsWeb')

const jugadoresTotales = []

const startButton = document.getElementById('playerConfig')
startButton.addEventListener('click', function(){
    event.preventDefault()
    playerConfig()
})

let cantidadJugadores

function playerConfig (){
    const inputCantidadJugadores = document.getElementById('cantidadJugadores')
    cantidadJugadores = parseInt(inputCantidadJugadores.value)

    if (cantidadJugadores > 0){
        const nombreContainer = document.getElementById('nombreContainer')
        nombreContainer.innerHTML = ''
        
        for (let i = 0; i < cantidadJugadores; i++){
            const preguntarNombre = document.createElement('input')
            preguntarNombre.setAttribute('type', 'text')
            preguntarNombre.setAttribute('class', 'text')
            preguntarNombre.setAttribute('placeholder', `Ingresa el nombre del jugador ${i+1}`)
            preguntarNombre.setAttribute('id', `nombreJugador ${i+1}`)
            preguntarNombre.setAttribute('required', 'true')

            const labelJugador = document.createElement('label')    
            labelJugador.textContent = `Ingresa el nombre del jugador ${i+1}`
            labelJugador.setAttribute('class', 'labelJugador')
            
            nombreContainer.appendChild(labelJugador)
            nombreContainer.appendChild(preguntarNombre)
        }
        const nombreBtn = document.createElement('button')
        nombreBtn.textContent = 'Continuar'
        nombreBtn.addEventListener('click', function(){
            event.preventDefault()
            crearJugadores()
            ingresarPartidos()
        })
        nombreContainer.appendChild(nombreBtn)
    }
}

function crearJugadores() {
    jugadoresTotales.length = 0
    for (let i = 0; i < cantidadJugadores; i++){
        const nombreInput = document.getElementById(`nombreJugador ${i+1}`)
        const jugador = new Jugador(nombreInput.value)
        jugadoresTotales.push(jugador)
    }
}

let partidosTotales
let preguntaPartidos

function ingresarPartidos(){
    
    let partidosContainer = document.getElementById('cantidadPartidos')
    const preguntaPartidos = document.createElement('input')
    

    preguntaPartidos.setAttribute('type', 'text')
    preguntaPartidos.setAttribute('class', 'text')
    preguntaPartidos.setAttribute('min', '1')
    preguntaPartidos.setAttribute('placeholder', 'Ingrese cantidad de partidos')
    preguntaPartidos.setAttribute('id', 'partidosTotales')
    preguntaPartidos.setAttribute('required', 'true')
    
    const labelPartidos = document.createElement('label')
    labelPartidos.textContent = 'Ingresa la cantidad de partidos a analizar'
    labelPartidos.setAttribute('class', 'labelPartidos')

    partidosContainer.appendChild(labelPartidos)
    partidosContainer.appendChild(preguntaPartidos)

    const partidosBtn = document.createElement('button')
    partidosBtn.textContent = 'Continuar'
    partidosBtn.addEventListener('click', function(){
        partidosTotales = parseInt(preguntaPartidos.value)
        event.preventDefault()
        seleccionarEstadisticas()
    })
    partidosContainer.appendChild(partidosBtn)
}

function seleccionarEstadisticas(){
    const opcionesContainer = document.getElementById('opcionesContainer')
    opcionesContainer.innerHTML = `<option value="">Selecciona una estadística</option>
                                    <option value="puntos">Puntos</option>
                                    <option value="rebotes">Rebotes</option>
                                    <option value="asistencias">Asistencias</option>`
    
    opcionesContainer.addEventListener('change', function(){
        const seleccion = opcionesContainer.value
        resultadosContainer.innerHTML = ''
        preguntarEstadisticas(seleccion)
    })   
}

function preguntarEstadisticas(mensaje) {
    let inputs = []
    for (let m = 0; m < partidosTotales; m++){
        for (let i = 0; i < cantidadJugadores; i++){
            inputs.push(jugadoresTotales[i].agregarEstadistica(mensaje, m))
        }
    }
    const continuarBtn = document.createElement('button')
        continuarBtn.textContent = 'Continuar'
        continuarBtn.addEventListener('click', function() {
            let todosLosCamposTienenValor = inputs.every(input => input.value);
            if (todosLosCamposTienenValor) {
                for (let i = 0; i < inputs.length; i++) {
                    let idPartido = i % partidosTotales;
                    let idJugador = Math.floor(i / partidosTotales);
                    jugadoresTotales[idJugador].estadisticas[idPartido] = parseInt(inputs[i].value);
                }
                mostrarResultados(mensaje);
            } else {
                alert('Por favor, completa todos los campos antes de continuar.');
            }
        })
    resultadosContainer.appendChild(continuarBtn)
}

function mostrarResultados(mensaje){
    for (let i = 0; i < jugadoresTotales.length; i++){
        const promedioEstadistica = jugadoresTotales[i].calcularPromedioEstadistica()
        const finalContainer = document.getElementById('resultado')
        const outputResultado = document.createElement('p')
        outputResultado.textContent = `El jugador ${jugadoresTotales[i].nombre} hizo un promedio de ${promedioEstadistica} ${mensaje} por partido`
        finalContainer.appendChild(outputResultado)
    }

    const btnContainer = document.getElementById('btnContainer')

    const resetBtn = document.createElement('button')
    resetBtn.textContent = 'Reiniciar Simulador'
    resetBtn.addEventListener('click', function() {
        reiniciarSimulador()
    })

    const endBtn = document.createElement('button')
    endBtn.textContent = 'Finalizar Simulador'
    endBtn.addEventListener('click', function() {
        finalizarSimulador()
    })

    btnContainer.appendChild(resetBtn)
    btnContainer.appendChild(endBtn)
}

function finalizarSimulador() {
    resultadosContainer.innerHTML = ''
    let finalizar = document.createElement('b')
    finalizar.textContent = '¡Gracias por usar este simulador!'
    resultadosContainer.appendChild(finalizar)
}

function reiniciarSimulador() {
    jugadoresTotales.length = 0;
    resultadosContainer.innerHTML = ''
    playerConfig();
}