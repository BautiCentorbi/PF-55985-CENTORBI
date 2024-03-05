const resultadosContainer = document.getElementById('resultadosContainer')

class Jugador {
    static id = 0
    constructor(nombre){
        this.nombre = nombre
        this.estadisticas = []
        this.id = ++Jugador.id
    }
    agregarEstadistica(mensaje, partido){
        const inputDiv = document.createElement('div')
        inputDiv.setAttribute('class', 'input-group flex-nowrap')
        const inputValor = document.createElement('input')  
        inputValor.setAttribute('type','number')
        inputValor.setAttribute('class','form-control')
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

    calcularPromedioEstadistica(){
        const totalEstadistica = this.estadisticas.reduce((acc, el) => acc + el, 0)
        return totalEstadistica / this.estadisticas.length || 0
    }
}

const main = document.getElementById('statsWeb')

const jugadoresTotales = []

const startButton = document.getElementById('playerConfig')
startButton.addEventListener('click', function(event){
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
        const formContainer = document .createElement('div')
        
        for (let i = 0; i < cantidadJugadores; i++){
            const preguntarNombre = document.createElement('input')
            preguntarNombre.setAttribute('type', 'text')
            preguntarNombre.setAttribute('class', 'form-control')
            preguntarNombre.setAttribute('placeholder', `Ingresa el nombre del jugador ${i+1}`)
            preguntarNombre.setAttribute('id', `nombreJugador ${i+1}`)
            preguntarNombre.setAttribute('required', 'true')

            const labelJugador = document.createElement('label')    
            labelJugador.textContent = `Ingresa el nombre del jugador ${i+1}`
            labelJugador.setAttribute('class', 'labelJugador')
            
            formContainer.appendChild(labelJugador)
            formContainer.appendChild(preguntarNombre)
            nombreContainer.appendChild(formContainer)
        }
        const btnContainer = document.getElementById('btnContainer')
        const nombreBtn = document.createElement('button')
        nombreBtn.textContent = 'Continuar'
        nombreBtn.setAttribute('type', 'button')
        nombreBtn.setAttribute('class', 'btn btn-primary')
        nombreBtn.addEventListener('click', function(event){
            event.preventDefault()
            crearJugadores()
            ingresarPartidos()
        })
        btnContainer.appendChild(nombreBtn)
        nombreContainer.appendChild(btnContainer)
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
    const questionContainer = document.getElementById('questionContainer')
    const preguntaPartidos = document.createElement('input')
    const btnContainer = document.getElementById('btnContainer2')

    preguntaPartidos.setAttribute('type', 'text')
    preguntaPartidos.setAttribute('class', 'form-control')
    preguntaPartidos.setAttribute('min', '1')
    preguntaPartidos.setAttribute('placeholder', 'Ingrese cantidad de partidos')
    preguntaPartidos.setAttribute('id', 'partidosTotales')
    preguntaPartidos.setAttribute('required', 'true')
    
    const labelPartidos = document.createElement('label')
    labelPartidos.textContent = 'Ingresa la cantidad de partidos a analizar'
    labelPartidos.setAttribute('class', 'labelPartidos')

    questionContainer.appendChild(labelPartidos)
    questionContainer.appendChild(preguntaPartidos)
    partidosContainer.appendChild(questionContainer)

    const partidosBtn = document.createElement('button')
    partidosBtn.setAttribute('type', 'button')
    partidosBtn.setAttribute('class', 'btn btn-primary')
    partidosBtn.textContent = 'Continuar'
    partidosBtn.addEventListener('click', function(event){
        partidosTotales = parseInt(preguntaPartidos.value)
        event.preventDefault()
        seleccionarEstadisticas()
    })
    btnContainer.appendChild(partidosBtn)
    partidosContainer.appendChild(btnContainer)
}

function seleccionarEstadisticas(){
    const opcionesContainer = document.getElementById('opcionesContainer')
    opcionesContainer.setAttribute('class', 'form-select form-select-sm')
    opcionesContainer.innerHTML = `<option selected>Selecciona una estadística</option>
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
        continuarBtn.setAttribute('type', 'button')
        continuarBtn.setAttribute('class', 'btn btn-primary')
        continuarBtn.textContent = 'Continuar'
        continuarBtn.addEventListener('click', function() {
            let todosLosCamposTienenValor = inputs.every(input => input.value);
            if (todosLosCamposTienenValor) {
                for (let i = 0; i < inputs.length; i++) {
                    let idPartido = i % partidosTotales
                    let idJugador = Math.floor(i / partidosTotales)
                    jugadoresTotales[idJugador].estadisticas[idPartido] = parseInt(inputs[i].value)
                }
                mostrarResultados(mensaje)
            } else {
                alert('Por favor, completa todos los campos antes de continuar.')
            }
        })
    resultadosContainer.appendChild(continuarBtn)
}

const finalContainer = document.getElementById('resultado')
let promedioEstadistica

function mostrarResultados(mensaje){
    for (let i = 0; i < jugadoresTotales.length; i++){
        promedioEstadistica = jugadoresTotales[i].calcularPromedioEstadistica()
        const outputResultado = document.createElement('p')
        outputResultado.textContent = `El jugador ${jugadoresTotales[i].nombre} hizo un promedio de ${promedioEstadistica} ${mensaje} por partido`
        finalContainer.appendChild(outputResultado)
    }

    const btnContainer = document.getElementById('btnContainer3')

    const resetBtn = document.createElement('button')
    resetBtn.setAttribute('type', 'button')
    resetBtn.setAttribute('class', 'btn btn-success')
    resetBtn.textContent = 'Reiniciar Simulador'
    resetBtn.addEventListener('click', function() {
        reiniciarSimulador()
    })

    const endBtn = document.createElement('button')
    endBtn.setAttribute('type', 'button')
    endBtn.setAttribute('class', 'btn btn-danger')
    endBtn.textContent = 'Finalizar Simulador'
    endBtn.addEventListener('click', function() {
        finalizarSimulador()
    })

    btnContainer.appendChild(resetBtn)
    btnContainer.appendChild(endBtn)
    finalContainer.appendChild(btnContainer)
}

function finalizarSimulador() {
    resultadosContainer.innerHTML = ''
    let finalizar = document.createElement('b')
    finalizar.textContent = '¡Gracias por usar este simulador!'
    resultadosContainer.appendChild(finalizar)
    guardarLocalStorage()
}

function reiniciarSimulador() {
    guardarLocalStorage()
    location.reload()
}

function guardarLocalStorage(){
    localStorage.setItem('jugadores', JSON.stringify(jugadoresTotales))
    localStorage.setItem('partidos', partidosTotales)
}