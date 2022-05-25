"use strict";
const tableDom = document.getElementById("tableDOM");
const url =
  "https://go--tickets-default-rtdb.europe-west1.firebasedatabase.app/.json";
const itemsUrl =
  "https://go--tickets-default-rtdb.europe-west1.firebasedatabase.app/items";

class Year {
  newYear() {
    const footerYearContent = document.querySelector(".footer-year");
    const currentYear = new Date();
    footerYearContent.innerText = `${currentYear.getFullYear()}`;
  }
}

class Products {
  async getProducts() {
    try {
      let result = await fetch(url);
      let data = await result.json();
      let products = data.items;
      let arrayProducts = Object.entries(products).map((e) =>
        Object.assign(e[1], { key: e[0] })
      );
      products = arrayProducts.map((item) => {
        const { title, price, description } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        const key = item.key;
        return { title, price, id, image, description, key };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `<tr>
      <td><img src="${product.image}" alt="" /></td>
      <td>${product.title}</td>
      <td>$${product.price}/ticket</td>
      <td>${product.description}</td>
      <td>
        <button title="Edit existing item" class="edit-button" onclick=edit("${product.key}")><i class="fas fa-edit"></i></button>
        <button title="Remove existing item" class="remove-button" onclick=remove("${product.key}")><i class="fas fa-eraser"></i></button>
      </td>
    </tr>`;
    });
    tableDom.innerHTML = result;
  }
}
function edit(id) {
  window.location.href = `./add-edit.html?id=${id}`;
}
function remove(id) {
  fetch(`${itemsUrl}/${id}.json`, {
    method: "DELETE",
  }).then(() => {
    const ui = new UI();
    const products = new Products();
    products.getProducts().then((products) => {
      ui.displayProducts(products);
    });
  });
}
function add() {
  window.location.href = `./add-edit.html`;
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  const year = new Year();
  year.newYear();
  products.getProducts().then((products) => {
    ui.displayProducts(products);
  });
});
