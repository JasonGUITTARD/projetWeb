window.onload = init

let gridDiv = document.getElementById('gridDisplay')
let gridDisplayDiv = document.getElementById("gridDisplayDiv")
let tableDiv = document.getElementById('tableDisplay')
let apprenantTable = document.getElementById("apprenantsTable")
let modalDiv = document.getElementById('detailModal')

function init() {
	document.getElementById("table").addEventListener('change', updateDisplayTable)
	document.getElementById("grid").addEventListener('change', updateDisplayGrid)

	let display = localStorage.getItem("display")
	let theme = localStorage.getItem("theme")

	if(display) {
		document.getElementById(display).checked = true
		if(display == "table") {
			fetch('../json/promo.json').then(response => response.json()).then(data => {
				updateDisplayTable(data.apprenants)
				updateInformations(data)
			})
		} else if (display == "grid") {
			fetch('../json/promo.json').then(response => response.json()).then(data => {
				updateDisplayGrid(data.apprenants)
				updateInformations(data)
			})
		}
	}

	updateTheme(theme)
	
}

function updateTable(data) {
	let attributToAdd = [["data-bs-toggle", "modal"], ["data-bs-target", "#detailModal"]]

	data.forEach(element => {
		const clone = document.getElementById("templateListeApprenants").content.cloneNode(true)

		clone.querySelector('td[name]').innerText = element.name
		clone.querySelector('td[lastname]').innerText = element.lastname
		clone.querySelector('td[city]').innerText = element.city
		clone.querySelector('td[detail]').firstElementChild.id = element.id

		attributToAdd.forEach(element => {
			clone.querySelector('td[detail]').firstElementChild.setAttribute(element[0], element[1])
		})

		clone.querySelector('td[detail]').firstElementChild.addEventListener("click", setInformation)

		apprenantTable.appendChild(clone)
	});
}

async function setInformation(e) {
	let id = e.target.id
	let lastnameElement = document.querySelector("h3[lastname]")
	let nameElement = document.querySelector("h3[name]")
	let cityElement = document.querySelector("h3[city]")
	let storydiv = document.querySelector("div[story]")
	let avatarElement = document.querySelector("img[avatar]")

	let data = await fetch('../json/promo.json').then(response => response.json())
	let apprenantData = data.apprenants.find(element => element.id === parseInt(id))

	lastnameElement.innerText = apprenantData.lastname ? apprenantData.lastname : "Non renseigné"
	nameElement.innerText = apprenantData.name ? apprenantData.name : "Non renseigné"
	cityElement.innerText = apprenantData.city ? apprenantData.city : "Non renseigné"

	storydiv.innerHTML = ""
	avatarElement.setAttribute("src", "assets/Images/Avatar/avatar.webp")
	
	if(apprenantData.story.length > 0) {
		apprenantData.story.forEach(story => {
			let paragraph = document.createElement("p")
			paragraph.className = "my-1"
			paragraph.innerText = story
			storydiv.appendChild(paragraph)
		})
	} else {
		let paragraph = document.createElement("p")
		paragraph.innerText = "Aucune anecdotes renseigné"
		paragraph.className = "my-1"
		storydiv.appendChild(paragraph)
	}

	if(apprenantData.avatar && apprenantData.avatar.length > 0)
		avatarElement.setAttribute("src", apprenantData.avatar)
}

function updateGrid(data) {
	let attributToAdd = [["data-bs-toggle", "modal"], ["data-bs-target", "#detailModal"]]

	data.forEach(element => {
		const clone = document.getElementById("templateGridApprenants").content.cloneNode(true)

		if(element.avatar) {
			clone.querySelector('img').setAttribute('src', element.avatar)
			clone.querySelector('img').setAttribute('alt', `Photo représentant ${element.lastname} ${element.name}`)
		} else {
			clone.querySelector('img').setAttribute('alt', "Photo d'avatar basique en noir et blanc")
		}
		
		clone.querySelector('h5').innerText = `${element.lastname} ${element.name}`

		if(element.story.length > 0) 
			clone.querySelector('p').innerText = element.story[Math.floor(Math.random() * element.story.length)]
		else
			clone.querySelector('p').innerText = "Description du profil"

		attributToAdd.forEach(element => {
			clone.querySelector('a[detail]').setAttribute(element[0], element[1])
		})

		clone.querySelector('a[detail]').id = element.id
		clone.querySelector('a[detail]').addEventListener("click", setInformation)

		gridDiv.appendChild(clone)
	});
}

function updateDisplayGrid() {
	gridDisplayDiv.classList.remove('d-none')
	tableDiv.classList.add('d-none')
	fetch('../json/promo.json').then(response => response.json()).then(data => updateGrid(data.apprenants))
	resetDisplay(apprenantTable)
}

function updateDisplayTable() {
	gridDisplayDiv.classList.add('d-none')
	tableDiv.classList.remove('d-none')
	fetch('../json/promo.json').then(response => response.json()).then(data => updateTable(data.apprenants))
	resetDisplay(gridDiv)
}

function resetDisplay(element) {
	let childrenLength = element.children.length;
	if(element.id == "gridDisplay") {
		while(childrenLength > 0) {
			element.removeChild(element.lastElementChild)
			childrenLength = element.children.length;
		}
	} else {
		while(childrenLength > 1) {
			element.removeChild(element.lastElementChild)
			childrenLength = element.children.length;
		}
	}
}

function updateTheme(theme) {
	document.documentElement.setAttribute("data-bs-theme", theme)
}

function updateInformations(data) {
	document.querySelector("h1[nomPromo]").innerText = data.nomPromo
}