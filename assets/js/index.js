const div = document.querySelector('.container')
const selectTypes = document.querySelector('#typeOptions')
const cargarpokemones = (selecValue) => {
    const pokemones = fetch('https://pokeapi.co/api/v2/pokemon')
    let pokes = []
    let habilidadesTexto = ''
    let contador = 0
    let html = ''

    pokemones
        .then((response) => response.json())
        .then((data) => {

            pokes = data.results
            pokes.forEach(pokemon => {

                let habilidades = fetch(pokemon.url)
                habilidades.then((respuesta) => respuesta.json())
                    .then((miniData) => {

                        let abilities = miniData.abilities
                        let pokeimage = miniData.sprites.other.dream_world.front_default

                        abilities.forEach((item) => {

                            habilidadesTexto += ' ' + item.ability.name + ", "
                        })
                        habilidadesTexto = habilidadesTexto.slice(0, habilidadesTexto.length - 2)
                        contador = contador + 1

                        if (miniData.types.find((item) => item.type.name == selecValue) || selecValue == undefined) {

                            html = `    
                                <div class="card shadow-lg fondo-cartas m-2 text-white fst-italic fs-5 rounded-5" style="width:18rem">
                                    <div class="card-body" >
                                       <p class="letras-colorFondo p-2"><strong class="text-warning">Nombre del pokemon:</strong> ${pokemon.name}</p>                                      
                                       <p class="letras-colorFondo p-2"><strong class="text-warning">Habilidades:</strong>${habilidadesTexto}</p>
                                       <a class="letras-colorFondo p-2 text-warning" href="${pokemon.url}">Detalles</a><br>
                                       <img class="ms-5 mt-5" src="${pokeimage}" height="180" width="180">  
                                    </div>
                                </div>   `
                            div.insertAdjacentHTML('beforeend', html)
                        }
                        habilidadesTexto = ''

                        if (html == '' && contador == 20) {
                            let vacio = `
                                         <div class="fs-1 mensaje fw-bold">
                                         <img src="./assets/img/titulo-de-datos.gif" alt="" height="150" width="800" class="mb-5 rounded-5">
                                         </div>
                                         `
                            div.insertAdjacentHTML('beforeend', vacio)
                        }
                    })
            })

        })

        .catch((error) => console.log(error))
}


const types = fetch('https://pokeapi.co/api/v2/type/')
types.then((response) => response.json())
    .then((data) => {
        let tipos = data.results
        tipos.forEach((tipo) => {
            selectTypes.insertAdjacentHTML('beforeend', `<option value=${tipo.name}>${tipo.name}</option>`)
        })
    })

selectTypes.addEventListener('change', (e) => {
    div.replaceChildren('')
    if (e.target.value == 'Especies') {
        cargarpokemones()
    } else {
        cargarpokemones(e.target.value)
    }
})
cargarpokemones()










