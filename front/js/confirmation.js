/**
 * Get the order Id from the URL
 * @return { String } id
 */
function getIdFromUrl() {
	const url = new URL(document.URL);
	const paramsUrl = new URLSearchParams(url.search);
	const id = paramsUrl.get("id");
	return id;
}
let orderConfirm = document.getElementById("orderId");
orderConfirm.textContent = getIdFromUrl();
