const images = document.querySelectorAll(".img")

function clearActiveImage() {
    images.forEach(function(image) {
        image.classList.remove("active");
    });
}

images.forEach(function(image, index) {
    image.onclick = function (e) {
        e.stopPropagation() //important 
        if(images[index].classList.contains("active")){
            images[index].classList.remove("active")
        } else {
            clearActiveImage(index)
            images[index].classList.add("active")
        }
    }
})

window.addEventListener("click", () => {
    clearActiveImage()
})
