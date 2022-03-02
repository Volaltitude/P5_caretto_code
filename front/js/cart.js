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
	} catch (err) {
		console.error(err);
	}
}

printCart();

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
