const homeBtnSmall = document.getElementById("homeBtnSmall");
const productsBtnSmall = document.getElementById("productsBtnSmall");

homeBtnSmall.addEventListener("click", () => {
  document.getElementById("homeBtn").click();
});

productsBtnSmall.addEventListener("click", () => {
  document.getElementById("productsBtn").click();
});