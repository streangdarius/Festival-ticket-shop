"use strict";
const addUrl =
  "https://go--tickets-default-rtdb.europe-west1.firebasedatabase.app/items";
const getUrl =
  "https://go--tickets-default-rtdb.europe-west1.firebasedatabase.app/.json";
let product = {
  fields: { image: { fields: { file: {} } } },
  sys: {},
};

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
      let result = await fetch(getUrl);
      let data = await result.json();
      let products = data.items;
      let arrayProducts = Object.entries(products).map((e) =>
        Object.assign(e[1], { key: e[0] })
      );
      return arrayProducts;
    } catch (error) {
      console.log(error);
    }
  }
}

function cancel() {
  window.location.href = `./admin.html`;
}

function save() {
  product.fields.description = document.getElementById("description").value;
  product.fields.image.fields.file.url = document.getElementById("url").value;
  product.fields.price = document.getElementById("price").value;
  product.fields.title = document.getElementById("title").value;
  if (product.key) {
    fetch(`${addUrl}/${product.key}.json`, {
      method: "PUT",
      body: JSON.stringify(product),
    }).then(() => {
      window.location.href = `./admin.html`;
    });
  } else {
    fetch(`${addUrl}.json`, {
      method: "POST",
      body: JSON.stringify(product),
    }).then(() => {
      window.location.href = `./admin.html`;
    });
  }
}

function setEditDetails() {
  document.getElementById("description").value = product.fields.description;
  document.getElementById("url").value = product.fields.image.fields.file.url;
  document.getElementById("price").value = product.fields.price;
  document.getElementById("title").value = product.fields.title;
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const year = new Year();

  products.getProducts().then((products) => {
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get("id");
    if (productId != null) {
      product = products.find((item) => item.key == productId);
      setEditDetails();
    } else {
      product.sys.id = (products.length + 1).toString();
    }
  });

  year.newYear();
});
