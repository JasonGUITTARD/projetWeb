window.onload = init

function init() {
	let theme = localStorage.getItem("theme")

	if(theme)
		updateTheme(theme)
}

function updateTheme(theme) {
	document.body.setAttribute("data-bs-theme", theme)
}