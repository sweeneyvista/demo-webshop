const PRODUCTS = {
  apple: { name: "Apple", emoji: "🍏" },
  banana: { name: "Banana", emoji: "🍌" },
  lemon: { name: "Lemon", emoji: "🍋" },
};

function getBasket() {
  try {
    const basket = localStorage.getItem("basket");
    if (!basket) return {}; // Changed default return from [] to {}
    const parsed = JSON.parse(basket);
    // Ensure the result is an object/map for quantity tracking
    return typeof parsed === 'object' && parsed !== null ? parsed : {}; 
  } catch (error) {
    console.warn("Error parsing basket from localStorage:", error);
    return {}; // Changed default return from [] to {}
  }
}

function addToBasket(product) {
  const basket = getBasket();
  // Store quantity instead of pushing to an array
  basket[product] = (basket[product] || 0) + 1;
  localStorage.setItem("basket", JSON.stringify(basket));
}

function clearBasket() {
  localStorage.removeItem("basket");
}

function getBasketWithDetails() {
  const basket = getBasket();
  const summary = [];
  // Iterate over product keys (e.g., 'apple', 'banana')
  for (const productKey in basket) {
      const quantity = basket[productKey];
      const item = PRODUCTS[productKey];
      if (item && quantity > 0) {
          summary.push({ ...item, quantity: quantity, key: productKey });
      }
  }
  return summary;
}

function removeFromBasket(productKey) {
  const basket = getBasket();
  if (basket[productKey]) {
    delete basket[productKey];
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  renderBasket();
  renderBasketIndicator();
}

function renderBasket() {
  const basketDetails = getBasketWithDetails();
  const basketList = document.getElementById("basketList");
  const cartButtonsRow = document.querySelector(".cart-buttons-row");
  if (!basketList) return;
  basketList.innerHTML = "";

  if (basketDetails.length === 0) {
    basketList.innerHTML = "<li>No products in basket.</li>";
    if (cartButtonsRow) cartButtonsRow.style.display = "none";
    return;
  }

  basketDetails.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class='basket-emoji'>${item.emoji}</span> <span>${item.name} x${item.quantity}</span><span class="remove-item" data-product-key="${item.key}">Remove</span>`;
    basketList.appendChild(li);
  });

  if (cartButtonsRow) cartButtonsRow.style.display = "flex";

  const modal = document.getElementById("confirmationModal");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  let productKeyToRemove = null;

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      productKeyToRemove = e.target.dataset.productKey;
      modal.style.display = "block";
    });
  });

  confirmYes.onclick = function () {
    if (productKeyToRemove) {
      removeFromBasket(productKeyToRemove);
      productKeyToRemove = null;
    }
    modal.style.display = "none";
  };

  confirmNo.onclick = function () {
    productKeyToRemove = null;
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      productKeyToRemove = null;
      modal.style.display = "none";
    }
  };
}

function renderBasketIndicator() {
  const basket = getBasket();
  // Calculate total count from the quantities
  const totalCount = Object.values(basket).reduce((sum, quantity) => sum + quantity, 0); 
  
  let indicator = document.querySelector(".basket-indicator");
  if (!indicator) {
    const basketLink = document.querySelector(".basket-link");
    if (!basketLink) return;
    indicator = document.createElement("span");
    indicator.className = "basket-indicator";
    basketLink.appendChild(indicator);
  }
  
  if (totalCount > 0) { // Check the total count
    indicator.textContent = totalCount;
    indicator.style.display = "flex";
  } else {
    indicator.style.display = "none";
  }
}

// Call this on page load and after basket changes
if (document.readyState !== "loading") {
  renderBasketIndicator();
} else {
  document.addEventListener("DOMContentLoaded", renderBasketIndicator);
}

// Patch basket functions to update indicator
const origAddToBasket = window.addToBasket;
window.addToBasket = function (product) {
  origAddToBasket(product);
  renderBasketIndicator();
};
const origClearBasket = window.clearBasket;
window.clearBasket = function () {
  origClearBasket();
  renderBasketIndicator();
};