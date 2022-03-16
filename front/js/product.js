const apiUrl = "http://localhost:3000/api/products";
/**
 * Get the Id of the item from the current URL
 * @return { String } id
 */
function getIdFromUrl() {
	const url = new URL(document.URL);
	const paramsUrl = new URLSearchParams(url.search);
	const id = paramsUrl.get("id");
	return id;
}

/**
 * Get all the paramaters from the item using fetch
 * @return { Promise }
 */
async function getItemParams() {
	const id = getIdFromUrl();
	try {
		let listParams = await fetch(apiUrl + "/" + id);
		return await listParams.json();
	} catch (err) {
		console.error(err);
	}
}

/**
 * Print all the item's parameters on the current page
 */
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

/**
 * Add the item to the cart and check the validity of the order
 */
function addToCart() {
	const idItem = getIdFromUrl();
	const colorItem = document.getElementById("colors").value;
	const quantityItem = parseInt(document.getElementById("quantity").value);
	if (!checkOrderValidity(colorItem, quantityItem)) {
		return 0;
	}
	//If idItem and colorItem are both new, add the order to the localStorage
	if (checkOrder(idItem, colorItem)) {
		const order = [idItem, colorItem, quantityItem];
		localStorage.setItem(idItem + colorItem, JSON.stringify(order));
		console.log("add New");
	//If idItem or colorItem already exist in localStorage, update the localStorage 
	//with the new value
	} else {
		const storage = localStorage.getItem(idItem + colorItem);
		const objectStorage = JSON.parse(storage);
		const order = [idItem, colorItem, quantityItem + objectStorage[2]];
		localStorage.setItem(idItem + colorItem, JSON.stringify(order));
		console.log("add Again");
	}
}

/**
 * Check if the item and its color we want to add to the cart already exist
 * @param { String } idItem
 * @param { String } colorItem
 * @return { Boolean }
 */
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

/**
 * Check if the order is valid
 * @param { String } colorItem
 * @param { Integer } quantityItem
 * @return { Boolean }
 */
function checkOrderValidity(colorItem, quantityItem) {
	if (colorItem == "" && quantityItem == "0") {
		alert("Veuillez choisir une couleur et une quantité valide");
		return false;
	} else if (colorItem == "") {
		alert("Veuillez choisir une couleur valide");
		return false;
	} else if (quantityItem == "0") {
		alert("Veuillez choisir une quantité valide");
		return false;
	} else {
		return true;
	}
}
