window.onload = init

function init() {
	fetch('promo.json').then(response => response.json()).then(data => updateListe(data.apprenants))
}

function updateListe(data) {
	let apprenantTable = document.getElementById("apprenants")

	data.forEach(element => {
		const clone = document.getElementById("templateApprenants").content.cloneNode(true)

		clone.querySelector('td[name]').innerText = element.name
		clone.querySelector('td[lastname]').innerText = element.lastname
		clone.querySelector('td[city]').innerText = element.city

		apprenantTable.appendChild(clone)
	});
}