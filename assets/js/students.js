const apiKey = "a857b143-169f-4477-aefe-6a1b4a6f353f"
const currentId = localStorage.getItem('id')
const form = document.querySelector("form")
let updateMode = false
let currentStudentId = ""

browsePromos()

async function getPromos() {
    const response = await fetch(`http://146.59.242.125:3015/promos/${currentId}`, {
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
    listPromo.students.forEach(student => {
        displayStudent(student)
    });
}

async function displayStudent(student) {
    const divList = document.createElement("div")
    divList.id = student._id
    const divAvatar = document.createElement("div")
    divAvatar.classList = "divAvatar"
    divAvatar.appendChild(await getAvatar(currentId, student._id))
    divList.classList = "divStudent"
    const textDiv = document.createElement("div")
    textDiv.classList = "textDiv"
    const textfirstName = document.createElement("p")
    const textlastName = document.createElement("p")
    const textAge = document.createElement("p")
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
    textfirstName.textContent = `Prenom : ${student.firstName}`
    textlastName.textContent = `Nom : ${student.lastName}`
    textAge.textContent = `Age : ${student.age}`
    detailBtn.textContent = "Details"
    editBtn.textContent = "Modifier"
    deletedBtn.textContent = "Supprimer"
    divList.appendChild(divAvatar)
    divList.appendChild(textDiv)
    textDiv.appendChild(textlastName)
    textDiv.appendChild(textfirstName)
    textDiv.appendChild(textAge)
    divList.appendChild(divBtn)
    divBtn.appendChild(editBtn)
    divBtn.appendChild(deletedBtn)
    divBtn.appendChild(detailBtn)
    document.querySelector("#listContainer").appendChild(divList)
    deletedBtn.addEventListener("click", () => {
        deletedStudent(currentId, student._id)
        const deletedElement = document.getElementById(`${student._id}`)
        deletedElement.remove()
    })
        editBtn.addEventListener("click", () => {
        updateMode = true
        updateStudentModal()
        document.querySelector("#firstName").value = student.firstName
        document.querySelector("#lastName").value = student.lastName
        document.querySelector("#age").value = student.age
        currentStudentId = student._id
    })
    return divList
}

async function getAvatar(currentId, studentId) {
        const avatar = await fetch(`http://146.59.242.125:3015/promos/${currentId}/students/${studentId}/avatar`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    const avatarBlob = await avatar.blob()
    const avatarUrl = URL.createObjectURL(avatarBlob)
    const img = document.createElement("img")
    img.src = avatarUrl
    img.alt = "avatar"
    return img
}

async function deletedStudent(currentId, studentId) {
    const response = await fetch(`http://146.59.242.125:3015/promos/${currentId}/students/${studentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
}

async function createStudent() {
    let formData = new FormData(form)
    const response = await fetch(`http://146.59.242.125:3015/promos/${currentId}/students`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        body: formData
    })
    const student = await response.json()
    await displayStudent(student.data)
}

async function updateStudent(currentId, currentStudentId) {
    // const avatarimg = document.querySelector("#avatar").files[0]
    // console.log(avatarimg);
    let formData = new FormData(form)
    // formData.append("lastName", document.querySelector("#lastName").value)
    // formData.append("firstName", document.querySelector("#firstName").value)
    // formData.append("age", document.querySelector("#age").value)
    // if (avatarimg) {
    //     formData.append("avatar", document.querySelector("#avatar").files[0])
    // }
    console.log(formData);
    const response = await fetch(`http://146.59.242.125:3015/promos/${currentId}/students/${currentStudentId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        body: formData
    })
    const student = await response.json()
    const updateElement = document.getElementById(`${currentStudentId}`)
    console.log(student.data);
    updateElement.replaceWith(await displayStudent(student.data))
}

addBtn.addEventListener("click", () => {
    addstudentModal()
})

validBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (updateMode) {
        updateStudent(currentId, currentStudentId)
        updateMode = false
    } else {
        createStudent()
    }
    closeModal()
})