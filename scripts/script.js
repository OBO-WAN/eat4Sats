function init() {
  // Abruf der Daten aus dem Local Storage beim F5
  if (localStorage.getItem("updateBTCProducts")) {
    getFromLocalStorage();
  }
  for (let i = 0; i < myBTCProducts.length; i++) {
    let myBTCProduct = myBTCProducts[i].name;
    let myBTCDescription = myBTCProducts[i].description;
    let myBTCPrice = myBTCProducts[i].price;
    renderCardsHTML(myBTCProduct, myBTCDescription, myBTCPrice, i);
  }
  renderBasketHTML();
  renderOverlayBasketHTML();
  renderBasket();
  document.getElementById("overlayBasket").style.display = "none";
}

function showCards(category) {
  document.getElementById("BTCDivs").innerHTML = "";
  for (let i = 0; i < myBTCProducts.length; i++) {
    let myBTCProduct = myBTCProducts[i].name;
    let myBTCDescription = myBTCProducts[i].description;
    let myBTCPrice = myBTCProducts[i].price;
    let myBTCPriceProduct = price.toFixed(2);
    if (myBTCProducts[i].category === category || category === "all") {
      renderCardsHTML(
        myBTCProduct,
        myBTCDescription,
        myBTCPrice,
        myBTCPriceProduct,
        i
      );
    }
  }
}

function renderBasket() {
  document.getElementById("stickyBasketContainer").classList.remove("displayNone");
  document.getElementById("contentBasket").classList.remove("displayNone");
  if (localStorage.getItem("updateBTCProducts")) {
    openBasket();
  }
  document.getElementById("basketProducts").innerHTML = ""; // Clear products
  document.getElementById("emptyBasketText").innerHTML = ""; // Clear text
  for (let i = 0; i < myBTCProducts.length; i++) {
    if (myBTCProducts[i].amount === 0) continue;
    addToBasketCalc(i);
  }
  sumBasket();
  syncMobileBasket();
}

function addToBasket(i) {
  myBTCProducts[i].amount++;
  addToLocalStorage();
  renderBasket();
}

function removeFromBasket(i) {
   if(myBTCProducts[i].amount>0){
    myBTCProducts[i].amount--;
    addToLocalStorage();
    renderBasket();
  }
}

function addToBasketCalc(i) {
  let amount = myBTCProducts[i].amount;
  let priceOfProduct = (myBTCProducts[i].price * amount).toFixed(2);
  let currentProduct = myBTCProducts[i].category;

  renderProductsHTML(i, priceOfProduct, currentProduct, amount);
  addToLocalStorage();
}

function sumBasket() {
  let sum = 0;
  for (let i = 0; i < myBTCProducts.length; i++) {
    sum += myBTCProducts[i].price * myBTCProducts[i].amount;
  }
  if (sum === 0) {
    document.getElementById("priceBasket")?.remove();
    document.getElementById("priceBasketOverlay")?.remove(); // new
    document.getElementById("emptyBasketText").innerHTML = `<p id="removeLine">Your shopping cart is still <b>empty</b></p>`;
    return;
  }
  if (sum < 5) sum += 5;
  document.getElementById("priceBasket")?.remove();
  sumBasketHTML(sum.toFixed(2));
  renderOverlayBasketHTML(sum.toFixed(2)); // new
  syncMobileBasket();
}

function addNoDisplay(endSum) {
  if (endSum > 30) {
    document.getElementById("costOfDelivery").classList.add("displayNone");
  }
  if (endSum == null || endSum === "5.00") {
    let priceBasketAmount = document.getElementById("finalSum");
    priceBasketAmount.classList.add("displayNone");
  } else {
    let emptyBasketText = document.getElementById("emptyBasketText");
    emptyBasketText.classList.add("displayNone");

    let emptyText = document.getElementById("removeLine");
    emptyText.classList.add("displayNone");
  }
}

function openBasket() {
  let basket = document.getElementById("overlayBasket");
  basket.classList.remove("displayNone");
  basket.classList.add("displayBlock");
  basket.style.display = "flex";
  if (window.innerWidth <= 700) {
    document.body.style.overflow = "hidden";
    syncMobileBasket(); // Changed/Added
  } else {
    document.body.style.overflow = "visible";
  }
}

function closeBasket() {
  document.body.style.overflow = "visible";
  document.getElementById("overlayBasket").classList.remove("displayBlock");
  document.getElementById("overlayBasket").classList.add("displayNone"); 
  let contentBasket = document.getElementById("contentBasket");
  if (contentBasket) {
    contentBasket.classList.add("displayNone");
  }
  let basket = document.getElementById("overlayBasket");
  // Close overlay
  basket.style.display = "none";
  document.body.style.overflow = "visible"; // scrolls
}

function addToLocalStorage() {
  let myBTCProductsAsText = JSON.stringify(myBTCProducts);
  localStorage.setItem("updateBTCProducts", myBTCProductsAsText);
}

function getFromLocalStorage() {
  let storageMyBTCProducts = localStorage.getItem("updateBTCProducts");
  try {
    if (storageMyBTCProducts) {
      myBTCProducts = JSON.parse(storageMyBTCProducts);
    }
  } catch (error) {
    console.error("Failed to parse local storage data:", error);
    localStorage.removeItem("updateBTCProducts");
  }
}

function basketEmpty() {
  for (let i = 0; i < myBTCProducts.length; i++) {
    if (myBTCProducts[i].amount == 0 || myBTCProducts[i].amount < 0) {
    } else {
      return;
    }
  }
  renderBasket();
  document.getElementById("priceBasket").classList.add("displayNone"); 
  document.getElementById("priceBasketOverlay").classList.add("displayNone"); // new
}

function toggleShipping() {
  let shippingCost = document.getElementById("costOfDelivery");
  if (shippingCost) {
    shippingCost.classList.toggle("displayFlex"); // Toggle visibility
    shippingCost.classList.toggle("displayNone"); // Ensure proper hiding/showing
  }
}

function orderButton() {
  document.getElementById('mobileOrderButton').classList.add('displayNone');
  document.getElementById('priceBasketOverlay').classList.add('displayNone');
  orderedProductHTML()

  //Remove the price section inside the overlay basket
  let priceBasketOverlay = document.getElementById("priceBasketOverlay");
  if (priceBasketOverlay) {
    priceBasketOverlay.remove();
  }

  // Reset Basket Items
  for (let i = 0; i < myBTCProducts.length; i++) {
    myBTCProducts[i].amount = 0;
  }
  addToLocalStorage();
  syncMobileBasket();
}

function syncMobileBasket() {
  let basketProductsMobile = document.getElementById("basketProducts_mobile");
  let basketProducts = document.getElementById("basketProducts");
  if (basketProductsMobile && basketProducts && window.innerWidth <= 700) {
    basketProductsMobile.innerHTML = basketProducts.innerHTML;
  }
}

window.addEventListener("resize", function() {
  if (window.innerWidth <= 700) { // Changed
    if (document.getElementById("overlayBasket").classList.contains("displayBlock")) {
      document.body.style.overflow = "hidden";
      syncMobileBasket(); // Added
    }
  } else {
    document.body.style.overflow = "visible";
  }
});

function reloadProducts() {
  renderBasketHTML();
  renderOverlayBasketHTML(sumBasket());
}


