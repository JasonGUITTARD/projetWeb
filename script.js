window.onload = init

let preferenceButton = document.getElementById("savePref").addEventListener("click", savePref)
let themeSelect = document.getElementById("theme")
let optDark = document.getElementById("optDark")
let optLight = document.getElementById("optLight")
let tableRadio = document.getElementById("tableRadio")
let gridRadio = document.getElementById("gridRadio")

function init() {
	let theme = localStorage.getItem("theme")
	let display = localStorage.getItem("display")

	if(theme == "dark"){
		optDark.setAttribute("selected", "selected")
		optLight.removeAttribute("selected")
	} else if(theme == "light"){
		optLight.setAttribute("selected", "selected")
		optDark.removeAttribute("selected")
	}

	if(display == "table") {
		tableRadio.checked = true
		gridRadio.checked = false
	} else if(display == "grid") {
		tableRadio.checked = false
		gridRadio.checked = true
	}
}

function savePref(e) {
	e.preventDefault()

	let display = tableRadio.checked ? "table" : gridRadio.checked ? "grid" : ''

	localStorage.setItem('theme', themeSelect.value)
	localStorage.setItem("display", display)
}