const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".closeBtn")
const h2 = document.querySelector("h2")

closeBtn.addEventListener("click", closeModal)

function closeModal() {
    modal.style.display = "none"
}

function addPromoModal() {
    modal.style.display = "block"
    document.querySelector("#name").value = ""
    document.querySelector("#startDate").value = ""
    document.querySelector("#endDate").value = ""
    document.querySelector("#formationDescription").value = ""
    h2.textContent = "Ajoute une promo"
}

function updateModal() {
    modal.style.display = "block"
    document.querySelector("#name").value = ""
    document.querySelector("#startDate").value = ""
    document.querySelector("#endDate").value = ""
    document.querySelector("#formationDescription").value = ""
    h2.textContent = "Modifie la promo"
}

function addstudentModal() {
    modal.style.display = "block"
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#age").value = ""
    h2.textContent = "Ajoute un élève"
}

function updateStudentModal() {
    modal.style.display = "block"
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#age").value = ""
    h2.textContent = "Modifie l'élève"
}