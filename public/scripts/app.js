const toggleThemeBtns = document.querySelectorAll(".toggle-theme");
const submenuOpenBtn = document.querySelector(".submenu-open-btn")
const submenu = document.querySelector(".submenu");
const navOpenBtn = document.querySelector(".nav-icon");
const navCloseBtn = document.querySelector(".nav-closeBtn");
const nav = document.querySelector(".nav");

const catrOpenBtn = document.querySelector(".cart-icon")
const cartCloseBtn = document.querySelector(".cart-closeBtn")
const cart = document.querySelector(".cart")

const overlay = document.querySelector(".overlay");


toggleThemeBtns.forEach(btn => 
    btn.addEventListener("click" , () => {
        if (localStorage.theme === "dark"){
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme" , "dark");
        }
    })
 )

 submenuOpenBtn.addEventListener("click" , (e)=>{
    e.currentTarget.parentElement.classList.toggle("text-orange-300")
    submenu.classList.toggle("submenu-open")
 })



 function closeNav() {
   nav.classList.remove("right-0");
   nav.classList.add("-right-64")
   overlay.classList.remove("overlay--open");
 }

 function closeCart(){
   cart.classList.remove("left-0");
   cart.classList.add("-left-64");
   overlay.classList.remove("overlay--open");
 }

 navOpenBtn.addEventListener("click" , () =>{
   nav.classList.remove("-right-64");
   nav.classList.add("right-0");
   overlay.classList.add("overlay--open");
   overlay.addEventListener("click" , closeNav );
})

catrOpenBtn.addEventListener("click" , ()=>{
   cart.classList.remove("-left-64");
   cart.classList.add("left-0");
   overlay.classList.add("overlay--open");
   overlay.addEventListener("click" , closeCart)
})

 navCloseBtn.addEventListener("click" , closeNav);
 cartCloseBtn.addEventListener("click" , closeCart);
 
