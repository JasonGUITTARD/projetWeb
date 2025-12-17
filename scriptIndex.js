window.onload = init

let gridDiv = document.getElementById('gridDisplay')
let tableDiv = document.getElementById('tableDisplay')
let apprenantTable = document.getElementById("apprenantsTable")

function init() {
	document.getElementById("table").addEventListener('change', updateDisplayTable)
	document.getElementById("grid").addEventListener('change', updateDisplayGrid)

	let display = localStorage.getItem("display")
	let theme = localStorage.getItem("theme")

	if(display) {
		console.log(display)
		document.getElementById(display).checked = true
		if(display == "table") {
			fetch('promo.json').then(response => response.json()).then(data => updateDisplayTable(data.apprenants))
		} else if (display == "grid") {
			fetch('promo.json').then(response => response.json()).then(data => updateDisplayGrid(data.apprenants))
		}
	}

	updateTheme(theme)
	
}

function updateTable(data) {


	data.forEach(element => {
		const clone = document.getElementById("templateListeApprenants").content.cloneNode(true)

		clone.querySelector('td[name]').innerText = element.name
		clone.querySelector('td[lastname]').innerText = element.lastname
		clone.querySelector('td[city]').innerText = element.city

		apprenantTable.appendChild(clone)
	});
}

function updateGrid(data) {

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

		gridDiv.appendChild(clone)
	});
}

function updateDisplayGrid() {
	gridDiv.classList.remove('d-none')
	tableDiv.classList.add('d-none')
	fetch('promo.json').then(response => response.json()).then(data => updateGrid(data.apprenants))
	resetDisplay(apprenantTable)
}

function updateDisplayTable() {
	gridDiv.classList.add('d-none')
	tableDiv.classList.remove('d-none')
	fetch('promo.json').then(response => response.json()).then(data => updateTable(data.apprenants))
	resetDisplay(gridDiv)
}

function resetDisplay(element) {
	let childrenLength = element.children.length;
	while(childrenLength > 1) {
		element.removeChild(element.lastElementChild)
		childrenLength = element.children.length;
	}
}

function updateTheme(theme) {
	document.body.setAttribute("data-bs-theme", theme)
}