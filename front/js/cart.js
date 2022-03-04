const apiUrl = "http://localhost:3000/api/products";

async function getItemParams(id) {
	try {
		let listParams = await fetch(apiUrl + "/" + id);
		return await listParams.json();
	} catch (err) {
		console.error(err);
	}
}

function searchFromLocalStorage(idItem) {
	return JSON.parse(localStorage.getItem(idItem));
}

async function printCart() {
	try {
		for (let item in localStorage) {
			let cartItem = JSON.parse(localStorage.getItem(item));
			if (cartItem != null) {
				let listItemParams = await getItemParams(cartItem[0]);

				let articleItem = document.createElement("article");
				document.getElementById("cart__items").appendChild(articleItem);
				articleItem.className = "cart__item";

				let divImgItem = document.createElement("div");
				articleItem.appendChild(divImgItem);
				divImgItem.className = "cart__item__img";

				let imgItem = document.createElement("img");
				divImgItem.appendChild(imgItem);
				imgItem.src = listItemParams.imageUrl;
				imgItem.alt = listItemParams.altTxt;

				let divContentItem = document.createElement("div");
				articleItem.appendChild(divContentItem);
				divContentItem.className = "cart__item__content";

				let divDescriptionItem = document.createElement("div");
				divContentItem.appendChild(divDescriptionItem);
				divDescriptionItem.className = "cart__item__content";

				let titleItem = document.createElement("h2");
				divDescriptionItem.appendChild(titleItem);
				titleItem.textContent = listItemParams.name;

				let colorItem = document.createElement("p");
				divDescriptionItem.appendChild(colorItem);
				colorItem.textContent = cartItem[1];

				let priceItem = document.createElement("p");
				divDescriptionItem.appendChild(priceItem);
				priceItem.textContent = listItemParams.price;

				let divSettingsItem = document.createElement("div");
				divContentItem.appendChild(divSettingsItem);
				divSettingsItem.className = "cart__item__content__settings";

				let divQuantityItem = document.createElement("div");
				divSettingsItem.appendChild(divQuantityItem);
				divQuantityItem.className =
					"cart__item__content__settings__quantity";

				let quantityItem = document.createElement("p");
				divQuantityItem.appendChild(quantityItem);
				quantityItem.textContent = "Qté : ";

				let inputQuantityItem = document.createElement("input");
				divQuantityItem.appendChild(inputQuantityItem);
				inputQuantityItem.setAttribute("type", "number");
				inputQuantityItem.setAttribute("name", "itemQuantity");
				inputQuantityItem.setAttribute("min", "1");
				inputQuantityItem.setAttribute("max", "100");
				inputQuantityItem.setAttribute("class", "itemQuantity");
				inputQuantityItem.setAttribute("value", `${cartItem[2]}`);

				let divDeleteItem = document.createElement("div");
				divSettingsItem.appendChild(divDeleteItem);
				divDeleteItem.className =
					"cart__item__content__settings__delete";

				let deleteItem = document.createElement("p");
				divDeleteItem.appendChild(deleteItem);
				deleteItem.className = "deleteItem";
				deleteItem.textContent = "Supprimer";
			}
		}
		return 1;
	} catch (err) {
		console.error(err);
	}
}

async function printTotal() {
	try {
		let totalQuantity = 0;
		let totalPrice = 0;
		for (let item in localStorage) {
			let cartItem = JSON.parse(localStorage.getItem(item));
			if (cartItem != null) {
				let listItemParams = await getItemParams(cartItem[0]);
				totalQuantity += cartItem[2];
				totalPrice += totalQuantity * listItemParams.price;
			}
		}
		let totalQuantityItem = document.getElementById("totalQuantity");
		let totalPriceItem = document.getElementById("totalPrice");
		totalQuantityItem.textContent = totalQuantity;
		totalPriceItem.textContent = totalPrice;
	} catch (err) {
		console.error(err);
	}
}
printTotal();

async function deleteItem() {
	try {
		if (await printCart()) {
			let deleteButton = document.getElementsByClassName("deleteItem");
			for (let i = 0; i < deleteButton.length; i++) {
				deleteButton[i].addEventListener("click", () => {
					let id = Object.keys(localStorage)[i];
					localStorage.removeItem(id);
					location.reload();
				});
			}
		}
	} catch (err) {
		console.error(err);
	}
}
deleteItem();

setTimeout(function changeInput() {
	let input = document.getElementsByClassName("itemQuantity");
	for (let i = 0; i < input.length; i++) {
		input[i].addEventListener("change", (e) => {
			let id = Object.keys(localStorage)[i];
			let newValue = JSON.parse(Object.values(localStorage)[i]);
			newValue.pop();
			newValue.push(parseInt(e.target.value));
			localStorage.setItem(id, JSON.stringify(newValue));
			printTotal();
		});
	}
}, 2000);

const regexName =
	/^[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}([ '-]?[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]?[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+)+$/;
const regexMail =
	/(?:[a-z0-9!\#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!\#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const regexAddress =
	/^[0-9]{1,5}([ '-]?[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]?[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+)+$/;


let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
firstName.addEventListener("change", (e) => {
	let firstNameError = document.getElementById("firstNameErrorMsg");
	if (e.target.value.match(regexName)) {
		firstNameError.textContent = ""
	}
	else {
		firstNameError.textContent = "Veuillez corriger ce champs du formulaire";
	}

});
lastName.addEventListener("change", (e) => {
	let lastNameError = document.getElementById("lastNameErrorMsg");
	if (e.target.value.match(regexName)) {
		lastNameError.textContent = ""
	}
	else {
		lastNameError.textContent = "Veuillez corriger ce champs du formulaire";
	}

});
address.addEventListener("change", (e) => {
	let addressError = document.getElementById("addressErrorMsg");
	if (e.target.value.match(regexAddress)) {
		addressError.textContent = ""
	}
	else {
		addressError.textContent = "Veuillez corriger ce champs du formulaire";
	}

});
city.addEventListener("change", (e) => {
	let cityError = document.getElementById("cityErrorMsg");
	if (e.target.value.match(regexName)) {
		cityError.textContent = ""
	}
	else {
		cityError.textContent = "Veuillez corriger ce champs du formulaire";
	}

});
email.addEventListener("change", (e) => {
	let emailError = document.getElementById("emailErrorMsg");
	if (e.target.value.match(regexName)) {
		emailError.textContent = ""
	}
	else {
		emailError.textContent = "Veuillez corriger ce champs du formulaire";
	}

});