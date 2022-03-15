const idItems = document.getElementById("items");
const apiUrl = "http://localhost:3000/api/products";

/**
 * Get the list of all items available from the API using fetch
 * @return { Promise }
 */
async function getListItems() {
	try {
		let listItems = await fetch(apiUrl);
		return await listItems.json();
	} catch (err) {
		console.error(err);
	}
}

/**
 * Print all items on the current page
 */
async function printListItems() {
	try {
		const itemList = await getListItems();
		for (let item in itemList) {
			let itemLink = document.createElement("a");
			document.querySelector(".items").appendChild(itemLink);
			itemLink.href = `./product.html?id=${itemList[item]._id}`;

			let itemArticle = document.createElement("article");
			itemLink.appendChild(itemArticle);

			let itemImg = document.createElement("img");
			itemArticle.appendChild(itemImg);
			itemImg.src = itemList[item].imageUrl;
			itemImg.alt = itemList[item].altTxt;

			let itemTitle = document.createElement("h3");
			itemArticle.appendChild(itemTitle);
			itemTitle.classList.add("productName");
			itemTitle.textContent = itemList[item].name;

			let descriptionItem = document.createElement("p");
			itemArticle.appendChild(descriptionItem);
			descriptionItem.classList.add("productDescription");
			descriptionItem.textContent = itemList[item].description;
		}
	} catch (err) {
		console.error(err);
	}
}

printListItems();
