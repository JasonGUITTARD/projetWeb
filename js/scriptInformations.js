window.onload = init

function init() {
	let theme = localStorage.getItem("theme")

	if(theme)
		updateTheme(theme)

	fetch("../json/promo.json").then(response => response.json()).then(data => updateNumberStudent(data.apprenants))
}

function updateTheme(theme) {
	document.documentElement.setAttribute("data-bs-theme", theme)
}

function updateNumberStudent(data) {
	let numberStudent = document.getElementById("numberStudent")

	numberStudent.innerText += ` ${data.length.toString()}`
}