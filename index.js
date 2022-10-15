const cards = document.querySelectorAll(".cards")
const visualizer = document.querySelector(".visualizer")
const close = visualizer.querySelector(".close")
const controllers = visualizer.querySelector(".controllers")
const back_controller = controllers.querySelector(".back")
const forward_controller = controllers.querySelector(".forward")
const indicators = visualizer.querySelector(".indicators")
const image = visualizer.querySelector(".v-image")
const temp_indicator = document.querySelector(".template-indicator")
let images_quant = cards[0].children.length
let visualizing = false

function open_visualizer(card){
    visualizing = true
    visualizer.classList.toggle("hidden")

    let imageToDisplay = card.target.dataset.image
    let img = document.createElement('img')
    img.setAttribute("src", `./img/${imageToDisplay}.jpg`)
    img.dataset.image = imageToDisplay
    image.appendChild(img)
}

function close_visualizer(){
    visualizing = false
    visualizer.classList.toggle("hidden")
    image.removeChild(image.children[0])
}

function update_image(forwards){
    let newImage
    let currentImage = parseInt(image.children[0].dataset.image)
    if(forwards){
        if(currentImage == images_quant){
            newImage = 1
        }else {
            newImage = currentImage + 1
        }
    }else {
        if(currentImage - 1 == 0){
            newImage = images_quant
        }else{
            newImage = currentImage - 1
        }
    }
    let img = document.createElement("img")
    img.setAttribute("src", `./img/${newImage}.jpg`)
    img.dataset.image = newImage
    image.removeChild(image.children[0])
    image.appendChild(img)

    update_indicators(currentImage, newImage)
}

function create_round(type){
    if(type){
        let tempClone = temp_indicator.content.cloneNode(true)
        let text = document.createTextNode("radio_button_checked")
        let span = tempClone.querySelector(".span")
        span.appendChild(text)

        return tempClone
    }else {
        let tempClone = temp_indicator.content.cloneNode(true)
        let text = document.createTextNode("radio_button_unchecked")
        let span = tempClone.querySelector(".span")
        span.appendChild(text)

        return tempClone
    }
}

function create_indicators(num){
    let fragment = document.createDocumentFragment()
    for(let i = 0; i < num; i++){
        let round = create_round(false)

        fragment.appendChild(round)
    }
    indicators.innerHTML = ""
    indicators.appendChild(fragment)
}

function update_indicators(current, newImage){
    let aux1 = create_round(false)
    indicators.replaceChild(aux1, indicators.children[current - 1])
    let aux2 = create_round(true)
    indicators.replaceChild(aux2, indicators.children[newImage - 1])
}

create_indicators(images_quant)

cards.forEach(card => {
    card.addEventListener("click", (e)=>{ 
        open_visualizer(e)
        create_indicators(images_quant)
        update_indicators(1, e.target.dataset.image)
    })
})

close.addEventListener("click", ()=>{ close_visualizer() })

back_controller.addEventListener('click', ()=>{ update_image(false) })

forward_controller.addEventListener('click', ()=>{ update_image(true) })

document.addEventListener('keydown', (e)=>{
    if(visualizing){
        console.log(e.code)
        if(e.code == "ArrowRight"){
            update_image(true)
        }
        else if(e.code == "ArrowLeft"){
            update_image(false)
        }
    }
})
