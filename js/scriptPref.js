window.onload = init

let preferenceButton = document.getElementById("savePref").addEventListener("click", savePref)
let themeSelect = document.getElementById("theme")
let optDark = document.getElementById("optDark")
let optLight = document.getElementById("optLight")
let tableRadio = document.getElementById("table")
let gridRadio = document.getElementById("grid")

const toastLive = document.getElementById('notificationToast')

function init() {
	let theme = localStorage.getItem("theme") || "light"
	let display = localStorage.getItem("display") || "table"

	if(theme == "dark"){
		optDark.setAttribute("selected", "selected")
		optLight.removeAttribute("selected")
		updateTheme(theme)
	} else if(theme == "light"){
		optLight.setAttribute("selected", "selected")
		optDark.removeAttribute("selected")
		updateTheme(theme)
	}

	if(display)
		document.getElementById(display).checked = true

	fetch('/json/promo.json').then(response => response.json()).then(data => updateInformations(data))
}

function savePref(e) {
	e.preventDefault()

	let display = tableRadio.checked ? "table" : gridRadio.checked ? "grid" : ''

	localStorage.setItem('theme', themeSelect.value)
	localStorage.setItem("display", display)
	updateTheme(themeSelect.value)

	bootstrap.Toast.getOrCreateInstance(toastLive).show()
}

function updateTheme(theme) {
	document.documentElement.setAttribute("data-bs-theme", theme)
}

function updateInformations(data) {
	document.querySelector("h1[nomPromo]").innerText = data.nomPromo
}