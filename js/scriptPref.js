window.onload = init

let preferenceButton = document.getElementById("savePref").addEventListener("click", savePref)
let themeSelect = document.getElementById("theme")
let optDark = document.getElementById("optDark")
let optLight = document.getElementById("optLight")
let tableRadio = document.getElementById("table")
let gridRadio = document.getElementById("grid")

function init() {
	let theme = localStorage.getItem("theme")
	let display = localStorage.getItem("display")

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
}

function savePref(e) {
	e.preventDefault()

	let display = tableRadio.checked ? "table" : gridRadio.checked ? "grid" : ''

	localStorage.setItem('theme', themeSelect.value)
	localStorage.setItem("display", display)
	updateTheme(themeSelect.value)
}

function updateTheme(theme) {
	document.documentElement.setAttribute("data-bs-theme", theme)
}