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

    try {
        if (cantidadJugadores > 0){
            startButton.setAttribute('class', 'btn btn-primary disabled')
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
            nombreBtn.setAttribute('for', 'nombreContainer')
            nombreBtn.addEventListener('click', function(event){
                event.preventDefault()
                crearJugadores()
                ingresarPartidos()
                nombreBtn.setAttribute('class', 'btn btn-primary disabled')
            })
            btnContainer.appendChild(nombreBtn)
            nombreContainer.appendChild(btnContainer)
        } else {
            throw new Error('Has ingresado un valor no válido, por favor, inténtalo de nuevo.')
        }
    } catch (err) { 
        let error1 = document.createElement('p')
        error1.textContent = err
        error1.setAttribute('class','errores')
        nombreContainer.appendChild(error1)
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
    const errorContainer = document.createElement('div')

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
    btnContainer.appendChild(partidosBtn)
    partidosContainer.appendChild(btnContainer)

    partidosBtn.addEventListener('click', function(event){
        try {
            if (!isNaN(preguntaPartidos.value)) {
                partidosTotales = parseInt(preguntaPartidos.value)
                event.preventDefault()
                seleccionarEstadisticas()
                errorContainer.innerHTML = ''
                partidosBtn.setAttribute('class', 'btn btn-primary disabled')
            } else {
                throw new  Error('Has ingresado un valor no válido, por favor, inténtalo de nuevo.')
            }
        } catch (err) {
            let error1 = document.createElement('p')
            error1.textContent = err
            error1.setAttribute('class','errores')
            errorContainer.appendChild(error1)
            questionContainer.appendChild(errorContainer)
        }
    })
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
    const errorContainer = document.createElement('div')
        const continuarBtn = document.createElement('button')
            continuarBtn.setAttribute('type', 'button')
            continuarBtn.setAttribute('class', 'btn btn-primary')
            continuarBtn.textContent = 'Continuar'
            continuarBtn.addEventListener('click', function() {
                let todosLosCamposTienenValor = inputs.every(input => input.value)
                let todosLosCamposSonPositivos = inputs.every(input => Number(input.value) >= 0)
                try {
                    if (todosLosCamposTienenValor && todosLosCamposSonPositivos) {
                        for (let i = 0; i < inputs.length; i++) {
                            let idPartido = i % partidosTotales
                            let idJugador = Math.floor(i / partidosTotales)
                            jugadoresTotales[idJugador].estadisticas[idPartido] = parseInt(inputs[i].value)
                        }
                        finalContainer.innerHTML = ''
                        loader()
                        mostrarResultados(mensaje)
                        errorContainer.innerHTML = ''
                        continuarBtn.setAttribute('class', 'btn btn-primary disabled')
                    } else {
                        throw new Error('Por favor, verifica haber llenado todos los campos y que los mismos sea valores positivos antes de continuar.')
                    }
                } catch (err) {
                    let error1 = document.createElement('p')
                    error1.textContent = err
                    error1.setAttribute('class','errores')
                    errorContainer.appendChild(error1)
                    resultadosContainer.appendChild(errorContainer)
                }
            })
            resultadosContainer.appendChild(continuarBtn)
}

const finalContainer = document.getElementById('resultado')
let promedioEstadistica

function loader(){
    const loader = document.createElement('div')
    loader.setAttribute('class', 'loader')
    finalContainer.setAttribute('class', 'loader-container')
    finalContainer.appendChild(loader)
}

function mostrarResultados(mensaje){
    setTimeout(() => {
        finalContainer.innerHTML = ''
        finalContainer.setAttribute('class', 'container-fluid')
        for (let i = 0; i < jugadoresTotales.length; i++){
            promedioEstadistica = jugadoresTotales[i].calcularPromedioEstadistica()
            const outputResultado = document.createElement('p')
            outputResultado.textContent = `El jugador ${jugadoresTotales[i].nombre} hizo un promedio de ${promedioEstadistica.toFixed(2)} ${mensaje} por partido`
            finalContainer.appendChild(outputResultado)
        }
    
        const btnContainer = document.getElementById('btnContainer3')
    
        const resetBtn = document.createElement('button')
        resetBtn.setAttribute('type', 'button')
        resetBtn.setAttribute('class', 'btn btn-success')
        resetBtn.textContent = 'Reiniciar Simulador'
        resetBtn.addEventListener('click', function() {
            reiniciarSimulador()
            resetBtn.setAttribute('class', 'btn btn-success disabled')
        })
    
        const endBtn = document.createElement('button')
        endBtn.setAttribute('type', 'button')
        endBtn.setAttribute('class', 'btn btn-danger')
        endBtn.textContent = 'Finalizar Simulador'
        endBtn.addEventListener('click', function() {
            finalizarSimulador()
        })
    
        const historialBtn = document.createElement('button')
        historialBtn.setAttribute('type', 'button')
        historialBtn.setAttribute('class', 'btn btn-light')
        historialBtn.textContent = 'Visitar Historial'
        historialBtn.addEventListener('click', function() {
            window.location = 'storage.html'
            historialBtn.setAttribute('class', 'btn btn-light disabled')
        })
    
        btnContainer.appendChild(historialBtn)
        btnContainer.appendChild(resetBtn)
        btnContainer.appendChild(endBtn)
        finalContainer.appendChild(btnContainer)
    }, 500);
}

function finalizarSimulador() {
    resultadosContainer.innerHTML = ''
    let finalizar = document.createElement('b')
    finalizar.textContent = '¡Gracias por usar este simulador!'
    resultadosContainer.appendChild(finalizar)
    guardarLocalStorage()
    Toastify({
        text: "Guardado en el Historial",
        className: "toastify-alert",
        offset: {
            x: 20,
            y: 100
        },
        duration: 4000,
        destination: "storage.html",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #833ab4, #1d1efd)",
        },
        onClick: function(){}
    }).showToast();
}

function reiniciarSimulador() {
    guardarLocalStorage()
    location.reload()
}

function guardarLocalStorage(){
    localStorage.setItem('jugadores', JSON.stringify(jugadoresTotales))
    localStorage.setItem('partidos', partidosTotales)
}
