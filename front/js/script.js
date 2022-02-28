const idItems = document.getElementById("items");
console.log(idItems);
const apiUrl = "http://localhost:3000/api/products";
let listItem;
printListItems();
async function getListItems () {
    try {
        let listItems = await fetch(apiUrl);
        return await listItems.json();
    }
    catch(error) {
        console.log("error");
    }
}

async function printListItems() {
    await getListItems ()
    .then(function (listItems){
        const itemList = listItems;
        for (let item in itemList) {
            let itemLink = document.createElement("a");
            document.querySelector(".items").appendChild(itemLink);
            itemLink.href = `./product.html?id=${listItems[item]._id}`;

            let itemArticle = document.createElement("article");
            itemLink.appendChild(itemArticle);

            let itemImg = document.createElement("img");
            itemArticle.appendChild(itemImg);
            itemImg.src = listItems[item].imageUrl;
            itemImg.alt = listItems[item].altTxt;

            let itemTitle = document.createElement("h3");
            itemArticle.appendChild(itemTitle);
            itemTitle.classList.add("productName");
            itemTitle.textContent = `${listItems[item].name}`;

            let descriptionItem = document.createElement("p");
            itemArticle.appendChild(descriptionItem);
            descriptionItem.classList.add("productDescription");
            descriptionItem.textContent = `${listItems[item].description}`
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}
