let categoriesContainer = document.querySelector(".categories-container");
const products = document.getElementById("products");

const apiUrl = `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`;

function displayProducts(categories) {
    if (categories.length > 0) {
        categories.forEach((each) => {
            console.log(each);
            const productItem = document.createElement("li");
            each.category_products.map((product) => {
                const discountAmount = product.compare_at_price - product.price;
                const discountPercentage = Math.floor(
                    (discountAmount / product.compare_at_price) * 100
                );
               // console.log(categories);
                console.log(each.category_name);
                productItem.classList.add("product-item");
                products.appendChild(productItem);
                const container = document.createElement("div");
                container.classList.add("product-container");
                container.dataset.category = each.category_name;
                productItem.appendChild(container);
                const image = document.createElement("img");
                image.classList.add("image");
                image.src = product.image;
                container.appendChild(image);
                const productDataContainer = document.createElement("div");
                productDataContainer.classList.add("product-data");
                container.appendChild(productDataContainer);
                const badge = document.createElement("p");
                badge.textContent = product.badge_text;
                badge.classList.add("badge");
                productDataContainer.appendChild(badge);

                const title = document.createElement("h1");
                title.textContent = product.title;
                title.classList.add("title");
                productDataContainer.appendChild(title);
                const price = document.createElement("p");
                price.textContent = product.price;
                price.classList.add("price");
                productDataContainer.appendChild(price);
                const comparePrice = document.createElement("p");
                comparePrice.textContent = product.compare_at_price;
                comparePrice.classList.add("compare-price");
                productDataContainer.appendChild(comparePrice);
                const vendor = document.createElement("p");
                vendor.textContent = `Sold By ${product.vendor}`;
                vendor.classList.add("vendor");
                productDataContainer.appendChild(vendor);
                const discount = document.createElement("p");
                discount.textContent = `${discountPercentage}% Off`;
                discount.classList.add("discount");
                productDataContainer.appendChild(discount);
                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Add to Cart";
                addToCartButton.classList.add("add-to-cart");
                productDataContainer.appendChild(addToCartButton);
                
            });
        });
    }
}
async function getProductsData() {
    try {
        let response = await fetch(apiUrl);
        if (response.ok === true) {
            let jsonData = await response.json();
            const {
                categories
            } = jsonData;
            const categoriesList = categories.map((product) => product.category_name);
            categoriesList.forEach((each) => {
                const button = document.createElement("button");
                button.classList.add("button");
                button.textContent = each;
                categoriesContainer.appendChild(button);
            });
            const categoryButtons = document.querySelectorAll("button");
            //console.log(categoryButtons);
            categoryButtons.forEach((each) => {
                each.addEventListener("click", function(event) {
                    const selectedCatagory = event.target.textContent;
                    const aciveElement = document.querySelector(".active-class");
                    aciveElement ? aciveElement.classList.remove("active-class") : "";

                    event.target.classList.add("active-class");
                    const filters = categories.filter(
                        (each) => each.category_name === selectedCatagory
                    );
                    displayProducts(filters);
                    const allProducts = document.querySelectorAll(".product-container");
                   // console.log(allProducts);
                     let elements = Array.from(allProducts);

                   elements.forEach((each) => {
                        each.classList.add("hide-element");

                        if (each.dataset.category === selectedCatagory) {
                            console.log(each.dataset.category);
                            each.classList.remove("hide-element");
                            

                        }
                    });

                });
            });
           
        }
    } catch (e) {
        console.log(e);
    }
}
getProductsData();