
let products = []




const fetchProducts = ()=> {
  
const productContainer = document.getElementById("products");

fetch("http://localhost:5000/products")
  .then((res) => res.json())
  .then((data) => {
   // let products = [];
    if (data.message === "success") {
      products = data.data;
    } else if (data.message === "error") {
      products = data.data;
    } else {
      products = [];
    }

    products.map((item) => {      
      const div = document.createElement("div");
      div.innerHTML = `
    <div  class="border  rounded-xl w-full bg-base-100 card">
        <figure><img class="h-60 w-full" src="${item.image}" /></figure>
        <div class="card-body">
            <span class="product_id" > ${item.product_id} </span> 
            <h2 class="card-title">${item.product_name}</h2>
            <p class="font-bold text-rose-400"> Price: $<span class="price">${item.price}</span>/-</p>
            <div class="card-actions justify-end">
                 <button  class="btn btn-success buy-now btn-md">Buy Now</button>
            </div>
        </div>
    </div>           
  `;
    productContainer.appendChild(div);
    });
  
  })
  .then(()=> {
    const buyNowButtons = document.querySelectorAll(".buy-now");
    buyNowButtons.forEach((button) => {
      button.addEventListener("click", handleBuyNow);
    });
   // console.log(buyNowButtons)
  })
  .catch((err) => {
    console.log(err);
  });

}


function handleBuyNow(event) {
  const button = event.target;
  const parent = button.parentNode.parentNode
  const price = parseFloat( parent.querySelector(".price").innerText, 10)
  const priceFloat = parseFloat(price.toFixed(2));
  const productId = parent.querySelector('.product_id').innerText

  const cart = localStorage.getItem('js_cart')
  


};



 






fetchProducts();







