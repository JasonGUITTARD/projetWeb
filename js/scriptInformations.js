window.onload = init

function init() {
	let theme = localStorage.getItem("theme") || "light"

	if(theme)
		updateTheme(theme)

	fetch("../json/promo.json").then(response => response.json()).then(data => {
		updateNumberStudent(data.apprenants)
		updateInformations(data)
	})
}

function updateTheme(theme) {
	document.documentElement.setAttribute("data-bs-theme", theme)
}

function updateNumberStudent(data) {
	let numberStudent = document.getElementById("numberStudent")

	numberStudent.innerText += ` ${data.length.toString()}`
}

function updateInformations(data) {
	document.querySelector("strong[debutFormation]").innerText = data.debutFormation
	document.querySelector("strong[finFormation]").innerText = data.finFormation
	document.querySelector("div[description]").innerText = data.descriptionFormation
	document.querySelector("h1[nomPromo]").innerText = data.nomPromo
}