const apiKey = "a857b143-169f-4477-aefe-6a1b4a6f353f"
const addBtn = document.querySelector("#addBtn")
const validBtn = document.querySelector("#validBtn")
const editBtn = document.querySelector("#editBtn")
const filterInput = document.querySelector("#searchInput")

let updateMode = false
let filterMode = false
let currentId = ""

browsePromos()

async function getPromos() {
    const response = await fetch("http://146.59.242.125:3015/promos", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    const data = await response.json()
    return data
}

async function browsePromos() {
    const listPromo = await getPromos()
    listPromo.forEach(promo => {
        displayPromo(promo)
    });
}

async function deletedPromo(id) {
    const response = await fetch(`http://146.59.242.125:3015/promos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
}

function displayPromo(promo) {
    const divList = document.createElement("div")
    divList.id = promo._id
    divList.classList = "divPromo"
    const textDiv = document.createElement("div")
    textDiv.classList = "textDiv"
    const textname = document.createElement("p")
    const textBeginDate = document.createElement("p")
    const textEndDate = document.createElement("p")
    const textDescription = document.createElement("p")
    const divBtn = document.createElement("div")
    divBtn.classList = "divBtn"
    const editBtn = document.createElement("img")
    editBtn.id = "editBtn"
    editBtn.src = "../assets/img/stylo.png"
    const deletedBtn = document.createElement("img")
    deletedBtn.id = "deletedBtn"
    deletedBtn.src = "../assets/img/supprimer.png"
    const detailBtn = document.createElement("button")
    detailBtn.id = "detailBtn"
    textname.textContent = `Promo ${promo.name}`
    const startDate = new Date(promo.startDate)
    const endDate = new Date(promo.endDate)
    textBeginDate.textContent = `Date de rentrée : ${formatDate(startDate)}`
    textEndDate.textContent = `Date de départ : ${formatDate(endDate)}`
    textDescription.textContent = `Type de formation : ${promo.formationDescription}`
    detailBtn.textContent = "Details"
    editBtn.textContent = "Modifier"
    deletedBtn.textContent = "Supprimer"
    divList.appendChild(textDiv)
    textDiv.appendChild(textname)
    textDiv.appendChild(textBeginDate)
    textDiv.appendChild(textEndDate)
    textDiv.appendChild(textDescription)
    divList.appendChild(divBtn)
    divBtn.appendChild(editBtn)
    divBtn.appendChild(deletedBtn)
    divBtn.appendChild(detailBtn)
    document.querySelector("#listContainer").appendChild(divList)
    deletedBtn.addEventListener("click", () => {
        deletedPromo(promo._id)
        let deletedElement = document.getElementById(`${promo._id}`)
        deletedElement.remove()
    })
    editBtn.addEventListener("click", () => {
        updateMode = true
        updateModal()
        document.querySelector("#name").value = promo.name
        document.querySelector("#startDate").value = promo.startDate.split("T")[0]
        document.querySelector("#endDate").value = promo.endDate.split("T")[0]
        document.querySelector("#formationDescription").value = promo.formationDescription
        currentId = promo._id
    })
    detailBtn.addEventListener("click", () => {
        localStorage.setItem("id", promo._id)
        location.href = "../pageStudent.html"
    })
    return divList
}

async function createPromo() {
    let body = {
        "name": document.querySelector("#name").value,
        "startDate": document.querySelector("#startDate").value,
        "endDate": document.querySelector("#endDate").value,
        "formationDescription": document.querySelector("#formationDescription").value
    }
    const response = await fetch(`http://146.59.242.125:3015/promos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(body)
    })
    const promo = await response.json()
    displayPromo(promo.data)
}

async function updatePromo(id) {
    let body = {
        "name": document.querySelector("#name").value,
        "startDate": document.querySelector("#startDate").value,
        "endDate": document.querySelector("#endDate").value,
        "formationDescription": document.querySelector("#formationDescription").value
    }
    const response = await fetch(`http://146.59.242.125:3015/promos/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(body)
    })
    const promo = await response.json()
    let updateElement = document.getElementById(`${id}`)
    updateElement.replaceWith(displayPromo(promo.data))
}

addBtn.addEventListener("click", () => {
    addPromoModal()
})

validBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (updateMode) {
        updatePromo(currentId)
        updateMode = false
    } else {
        createPromo()
    }
    closeModal()
})

filterInput.addEventListener("input", async (e) => {
    const listPromo = await getPromos()
    const element = e.target.value.toLowerCase()
    const filterArray = listPromo.filter((promo) => promo.name.toLowerCase().includes(element))
    document.querySelector("#listContainer").innerHTML = ""
    filterArray.forEach(promo => {
        displayPromo(promo)
    });
})

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
    if (month.length < 2) {
        month = '0' + month
    }
    if (day.length < 2) {
        day = '0' + day
    }
    return [day, month, year].join('-');
}


