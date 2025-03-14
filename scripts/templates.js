function renderCardsHTML(myBTCProduct, myBTCDescription, myBTCPrice, i) {
  return (document.getElementById("BTCDivs").innerHTML += `
        <div class="cards">
           <div class="h2Container">
              <h2>
              ${myBTCProduct} 
              </h2>
              <div class="shoppingBasket" onclick="addToBasket(${i}); openBasket();"></div>
           </div>
            <p>${myBTCDescription}</p>
            <p class="price">${myBTCPrice} ₿</p> 
       </div> 
      `);
}

function renderBasketHTML() {
  return (document.getElementById("stickyBasketContainer").innerHTML = /*html*/ `
    <div class="contentBasket" id="contentBasket"> 
      <div class="basketWrapper">
        <h3>Shopping Cart</h3>
        <div class="basketProduct" id="basketProducts"></div>
        <div class="basketText" id="emptyBasketText"></div>
        <!-- <div class="closeBasket" id="closeBasketButton" onclick="closeBasket()">
              <i class="fa-sharp fa-solid fa-circle-xmark fa-2xl" style="color: #ed0707;"></i>
        </div> -->
        </div>
        
    </div>
  `);
}

function renderProductsHTML(i, priceOfProduct, currentProduct, amount) {
  return (document.getElementById("basketProducts").innerHTML += /*html*/ `
    <div id="basketView${i}" style="display:flex">
      <div class="basketDishInfo">
        <b>${currentProduct}</b>
        <b>${priceOfProduct} ₿</b>
      </div>
      <div class="buttonAndAmount">
        <i class="fa-solid fa-minus" onclick="removeFromBasket(${i})" style="color: antiquewhite; cursor: pointer; font-size: xx-large;"></i>
        ${amount}
        <i class="fa-solid fa-plus" onclick="addToBasket(${i})" style="color: antiquewhite; cursor: pointer; font-size: xx-large;"></i>
      </div>
    </div>
  `);
}

function sumBasketHTML(endSum) {
  return (document.getElementById("contentBasket").innerHTML += /*html*/ `
    <div class="finalPriceDiv" id="priceBasket">
      <input class="toggle" type="checkbox" onchange="toggleShipping()">
      <div class="ShippingCostTitle" id="costOfDelivery">From 5.00₿ Delivery Free</div>
      <div class="total" id="finalSum">Total: ${endSum} ₿</div>
      <div onclick="orderButton()" class="buttonWrapper">
        <button class="orderButton">Order: ${endSum} ₿</button>
      </div>
        <div class="closeBasket" id="closeBasketButton" onclick="closeBasket()">
          <i class="fa-sharp fa-solid fa-circle-xmark fa-2xl" style="color: #ed0707;"></i>
        </div>
    </div>
  `);
}

function showMobileButton() {
  document.getElementById("mobileButton").innerHTML = /*html*/ ` 
    <div id="mobileOrderButton"></div>
    <div class="mobileOrderButton" onclick="openBasket()">
        <i class="fa-sharp fa-solid fa-basket-shopping fa-xs" ></i>
    </div>`;
}

function orderedProductHTML() {
  return (document.getElementById("contentBasket").innerHTML = /*html*/ `
    <div class="thanks" id="basketProducts">
        <h2 class="thanksH2">Thanks you for order!</h2> 
        <p class="thanksText">Your order will be shipped <b>very soon</b></p>
        <button class="close" onclick="reloadProducts()">Back to Products</button>
    </div>
  `);
}

function renderOverlayBasketHTML(endSum) {
  document.getElementById("overlayBasket").innerHTML = /*html*/ `
    <div class="contentBasket_Overlay" id="contentBasket"> 
      <div class="basketWrapper_Overlay">
        <h3 class="h3_Overlay">Shopping Cart</h3>
        <div class="basketProduct_Overlay" id="basketProducts_mobile"></div>

        <!--Only render priceBasketOverlay if endSum is valid -->
        ${endSum && !isNaN(endSum) ? `
        <div class="finalPriceDiv" id="priceBasketOverlay">
          <input class="toggle" type="checkbox" onchange="toggleShipping()">
          <div class="ShippingCostTitle" id="costOfDelivery">From 5.00₿ Delivery Free</div>
          <div class="total" id="finalSumOverlay">Total: ${endSum} ₿</div>
          <div onclick="orderButton()" class="buttonWrapper">
            <button class="orderButton">Order: ${endSum} ₿</button>
          </div>
        </div>` : ""}
        
        <!-- Close Button -->
        <div class="closeBasket" id="closeBasketButton" onclick="closeBasket()">
          <i class="fa-sharp fa-solid fa-circle-xmark fa-2xl" style="color: #ed0707;"></i>
        </div> 
      </div>
    </div>
  `;
}
