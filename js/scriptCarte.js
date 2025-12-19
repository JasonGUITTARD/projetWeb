window.onload = init()

let map = L.map("map").setView([46.866, 3.333], 6)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

//let marker = L.marker([51.508, -0.11]).bindPopup("<b>Hello world!</b><br>I am a popup.").addTo(map)

fetch('../json/promo.json').then(response => response.json()).then(data => setMarkers(data.apprenants))

function init() {
	let theme = localStorage.getItem("theme")

	if(theme)
		updateTheme(theme)

	fetch("../json/promo.json").then(response => response.json()).then(data => updateInformations(data))
}

function updateTheme(theme) {
	document.documentElement.setAttribute("data-bs-theme", theme)
}

function setMarkers(data) {
	data.forEach(element => {
		if(element.coord) {
			let lat = element.coord.latitude
			let lon = element.coord.longitude
			let student = `${element.lastname} ${element.name}`

			let marker = L.marker([lat, lon])
			marker.bindPopup(student)

			marker.addTo(map)
		}
	});
}

function updateInformations(data) {
	document.querySelector("h1[nomPromo]").innerText = data.nomPromo
}