const apiUrl = "http://localhost:3000/api/products";

function getIdFromUrl() {
	const url = new URL(document.URL);
	const paramsUrl = new URLSearchParams(url.search);
	const id = paramsUrl.get("id");
	return id;
}

async function getItemParams() {
	const id = getIdFromUrl();
	try {
		let listParams = await fetch(apiUrl + "/" + id);
		return await listParams.json();
	} catch (err) {
		console.error(err);
	}
}

async function printItemParams() {
	try {
		const listItemParams = await getItemParams();

		let itemImg = document.createElement("img");
		document.querySelector(".item__img").appendChild(itemImg);
		itemImg.src = listItemParams.imageUrl;
		itemImg.alt = listItemParams.altTxt;

		let itemName = document.getElementById("title");
		itemName.textContent = listItemParams.name;

		let itemPrice = document.getElementById("price");
		itemPrice.textContent = listItemParams.price;

		let itemDescription = document.getElementById("description");
		itemDescription.textContent = listItemParams.description;

		for (let i = 0; i < listItemParams.colors.length; i++) {
			let itemColor = document.createElement("option");
			document.getElementById("colors").appendChild(itemColor);
			itemColor.textContent = listItemParams.colors[i];
			itemColor.setAttribute("value", listItemParams.colors[i]);
		}
	} catch (err) {
		console.error(err);
	}
}

printItemParams();

const button = document.getElementById("addToCart");
button.addEventListener("click", addToCart);

function addToCart() {
	const idItem = getIdFromUrl();
	const colorItem = document.getElementById("colors").value;
	const quantityItem = parseInt(document.getElementById("quantity").value);
	if (checkOrder(idItem, colorItem)) {
		const order = [idItem, colorItem, quantityItem];
		localStorage.setItem(idItem, JSON.stringify(order));
		console.log("add New");
	} else {
		const storage = localStorage.getItem(idItem);
		const objectStorage = JSON.parse(storage);
		const order = [idItem, colorItem, quantityItem + objectStorage[2]];
		localStorage.setItem(idItem, JSON.stringify(order));
		console.log("add Again");
	}
}

function checkOrder(idItem, colorItem) {
	for (let id in localStorage) {
		let storageItem = localStorage.getItem(id);
		if (storageItem != null) {
			objectItem = JSON.parse(storageItem);
			if (idItem == objectItem[0] && colorItem == objectItem[1]) {
				return false;
			}
		}
	}
	return true;
}
