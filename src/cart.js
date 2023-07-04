const paybtn = document.getElementById("pay_now");

const showTotalItem = () => {
  const cartData = JSON.parse(localStorage.getItem("js_cart")) || [];
  if (cartData) {
    if (cartData.length > 0) {
      const totalNumberOfProducts = cartData.reduce(
        (total, cart) => total + cart.quantity,
        0
      );
      console.log(totalNumberOfProducts);
      document.getElementById("totalItem").innerHTML = totalNumberOfProducts;
    }
  }

  const cartBody = document.getElementById("showCart");
  let subTotalArray = [];
  cartData.map((item, i) => {
    // console.log(item)
    const row = document.createElement("tr");
    const unitPrice = parseFloat(item.unitPrice);
    const quantity = parseFloat(item.quantity);
    const subTotal = (unitPrice * quantity).toFixed(2);
    subTotalArray.push(subTotal);
    row.innerHTML = `
                  <th>${i + 1}</th>
                  <td>${item.product_name}</td>
                  <td>${item.product_id}</td>
                  <td>${item.unitPrice}</td>
                  <td>${item.quantity}</td>
                  <td>${subTotal}</td>
                `;

    cartBody.appendChild(row);
  });

  // console.log(subTotalArray)

  const grandTotal = subTotalArray.reduce(
    (total, item) => total + parseFloat(item),
    0
  );
  const grandTotalFix = grandTotal.toFixed(2);

  // console.log(grandTotalFix);

  document.getElementById("total").innerText = grandTotalFix;

  localStorage.setItem("js_cart_grandTotal", grandTotalFix);
};

const showTotalPayable = () => {
  let payableAmount = 0;
  const getPayableAmount = localStorage.getItem("js_cart_grandTotal");
  document.getElementById("totalpayable").innerText = getPayableAmount;

  const gTotal = parseFloat(getPayableAmount)
  console.log(gTotal);

  if(gTotal === 0){
    // Set the 'disabled' attribute
    paybtn.setAttribute("disabled", true);

    // Remove the 'disabled' attribute

  }else {
        paybtn.removeAttribute("disabled");
  }

};

const clearCart = () => {
  const cartBody = document.getElementById("showCart");
  localStorage.removeItem("js_cart");
  localStorage.removeItem("js_cart_grandTotal");

  showTotalItem();
  showTotalPayable();
  localStorage.removeItem("js_cart_grandTotal");
  cartBody.innerHTML = "";
};


// selected in the top
paybtn.addEventListener("click", () => {
  clearCart();
  alert("payment successful");
});

document.getElementById("clear_cart").addEventListener("click", () => {
  clearCart();
});

// const disablePay = ()=> {
//   const grandTotal = document.getElementById("totalpayable").innerText
//   grand
// }

// disablePay()
showTotalItem();
showTotalPayable();
