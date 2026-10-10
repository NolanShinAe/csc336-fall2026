let rootDiv = document.querySelector("#root");
let cartDiv = document.querySelector("#cart");
let selectedDiv = document.querySelector("#selected")
let dropdownDiv = document.querySelector("#dropdown");

let cart = [];
let selectedProducts = [];


let categoryData = ["console", "phone", "watch", "video-game"];

let sortData = [
    {value: "default", text: "Default"},
    {value: "low-high", text: "Price: Low - High"},
    {value: "high-low", text: "Price: High - Low"}
];

let products = [
    {
        name: "PS5",
        price: 599.00,
        description: "A ninth-generation home video game console developed by Sony Interactive Entertainment. An all-digital version of the PS5 console with no disc drive. Download and play digital games from PlayStation Store.",
        image: "ps5.png",
        category: "console"
    },
    {
        name: "XBOX Series X",
        price: 749.99,
        description: "Microsoft's flagship 9th-generation home video game console.",
        image: "xbox.png",
        category: "console"
    },
    {
        name: "Galaxy Z Flip8",
        price: 1199.99,
        description: "An Android-based foldable smartphone released by Samsung Electronics.",
        image: "galaxyzflip8.png",
        category: "phone"
    },
    {
        name: "iPhone Duo",
        price: 1999.00,
        description: "Apple's first foldable smartphone. The largest iPhone display ever. In a thin, foldable design. Reimagined iOS experiences for ultimate versatility. 48MP Dual Fusion camera system. And all-new ways to shoot from front to back.",
        image: "appleduow.png",
        category: "phone"
    },
    {
        name: "Pixel Watch 4",
        price: 449.99,
        description: "A round hybrid smartwatch made by Google that works only with Android phones running Android 11 or newer.",
        image: "googlepixel.png",
        category: "watch" 
    },
    {
        name: "Moto Watch",
        price: 129.99,
        description: "A budget-friendly and lifestyle-focused smartwatch made in partnership with Motorola.",
        image: "motowatch.png",
        category: "watch"  
    },
    {
        name: "Little Nightmares",
        price: 19.99,
        description: "Take on the role of Six, a lone child lost in a massive metal vessel known as the Maw, surrounded by dangerous, distorted versions of adults. You’ll need to do your best to escape in one piece or your fate will be worse than you ever dared dream.",
        image: "little.png",
        category: "video-game"
    },
    {
        name: "HITMAN World of Assassination",
        price: 69.99,
        description: "Enter the world of the ultimate assassin. HITMAN World of Assassination delivers the definitive stealth action experience, putting you in the shoes of Agent 47, a master assassin. Explore immersive locations, uncover hidden secrets, and eliminate targets with complete freedom of approach.",
        image: "hitman.png",
        category: "video-game"
    }
];





let categorySelect = document.createElement("select");
dropdownDiv.append(categorySelect);

let allProducts = document.createElement("option");
allProducts.value = "all";
allProducts.innerHTML = "All Products";
categorySelect.append(allProducts);

categoryData.forEach(function(category) {
    let optionElement = document.createElement("option");
    optionElement.value = category;
    optionElement.innerHTML = category;
    categorySelect.append(optionElement);
});


let sortSelect = document.createElement("select");
dropdownDiv.append(sortSelect);

sortData.forEach(function(sortProducts) {
    let optionElement = document.createElement("option");
    optionElement.value = sortProducts.value;
    optionElement.innerHTML = sortProducts.text;
    sortSelect.append(optionElement);
})



let addSelectedButton = document.createElement("button");
addSelectedButton.innerHTML = "Add Selected to Cart";
addSelectedButton.disabled = true;
selectedDiv.append(addSelectedButton);

function updateSelectButton() {
    if (selectedProducts.length === 0) {
        addSelectedButton.disabled = true;
        addSelectedButton.innerHTML = "Add Selected to Cart";
    } else {
        addSelectedButton.disabled = false;
        addSelectedButton.innerHTML = "Add " + selectedProducts.length + " Item(s) to Cart.";
    }
}

addSelectedButton.addEventListener("click", e => {
    selectedProducts.forEach(function(product) {
        cart.push(product);

        product.Pcheckbox.checked = false;
        product.Pcard.classList.remove("selected");
    });

    selectedProducts = [];

    renderCart();
    updateSelectButton();
});



function renderProduct(product) {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    rootDiv.append(productDiv);

    let productName = document.createElement("h1");
    productName.innerHTML = product.name;
    productDiv.append(productName);

    let productPrice = document.createElement("h2");
    productPrice.innerHTML = "$" + product.price.toFixed(2);
    productDiv.append(productPrice);

    let productCategory = document.createElement("h3");
    productCategory.innerHTML = product.category;
    productDiv.append(productCategory);

    let productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;
    productDiv.append(productDescription);

    let productImage = document.createElement("img");
    productImage.src = product.image;
    productDiv.append(productImage);

    let productCheckBox = document.createElement("input");
    productCheckBox.type = "checkbox";
    productDiv.append(productCheckBox);
    
    product.Pcheckbox = productCheckBox;
    product.Pcard = productDiv;

    productCheckBox.addEventListener("change", e => {
        productDiv.classList.toggle("selected", productCheckBox.checked);

        if (productCheckBox.checked) {
            selectedProducts.push(product);
        } else {
            selectedProducts = selectedProducts.filter(function(item) {
                return item !== product });
        };

        updateSelectButton ();
    });

    let addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = "Add to Cart";
    productDiv.append(addToCartButton);

    addToCartButton.addEventListener("click", e => {
        cart.push(product);
        renderCart();
    });
};



function displayProducts() {
    rootDiv.innerHTML = "";

    let displayedProducts = products;

    if (categorySelect.value !== "all") {
        displayedProducts = products.filter(function(product) {
            return product.category === categorySelect.value;
        });
    };

    let sortedProducts = displayedProducts.map(function(product) {
        return product;
    });

    if (sortSelect.value === "low-high") {
        sortedProducts.sort(function(a, b) {
            return a.price - b.price;
        });
    } else if (sortSelect.value === "high-low") {
        sortedProducts.sort(function(a, b) {
            return b.price - a.price;
        });
    };

    sortedProducts.forEach(renderProduct);
}



function renderCartItem(product) {
    let cartItem = document.createElement("p")
    cartItem.innerHTML = product.name + " - $" + product.price;
    cartDiv.append(cartItem);

}

function renderCart() {
    cartDiv.innerHTML = "<strong>Your Cart</strong>";

    cart.forEach(renderCartItem);

    let prices = cart.map(function(product) {
        return product.price;
    });

    let total = 0;
    for (let i = 0; i < prices.length; i++) {
        total += prices[i];
    }

    let divider = document.createElement("hr");
    cartDiv.append(divider);

    let displayTotal = document.createElement("p");
    displayTotal.innerHTML = "Total: $" + total.toFixed(2) + " (" + cart.length + " items)";
    cartDiv.append(displayTotal);
}



categorySelect.addEventListener("change", e => {
    displayProducts();
});

sortSelect.addEventListener("change", e => {
    displayProducts();
});



renderCart();
displayProducts();
