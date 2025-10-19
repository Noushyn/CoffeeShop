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
 
// Reusable product card rendering and dynamic population for products and best-selling
(() => {
  const productsGrid = document.querySelector('.products .container .grid');
  const bestSellingWrapper = document.querySelector('.best-selling .swiper .swiper-wrapper');
  if (!productsGrid && !bestSellingWrapper) return;

  const scriptSrc = (document.currentScript && document.currentScript.getAttribute('src')) || '';
  const assetPrefix = scriptSrc.includes('/public/') ? '../public' : '';
  const resolveAsset = (relativePath) => `${assetPrefix}/${relativePath}`;

  const productsData = [
    { id: 'p1', image: resolveAsset('images/products/p1.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: '175,000', oldPrice: null, offPercent: null, available: true },
    { id: 'p2', image: resolveAsset('images/products/p2.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: null, oldPrice: null, offPercent: null, available: false },
    { id: 'p3', image: resolveAsset('images/products/p3.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: '154,000', oldPrice: '175,000', offPercent: '12%', available: true },
    { id: 'p4', image: resolveAsset('images/products/p4.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: '175,000', oldPrice: null, offPercent: null, available: true },
    { id: 'p5', image: resolveAsset('images/products/p5.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: '154,000', oldPrice: '175,000', offPercent: '12%', available: true },
    { id: 'p6', image: resolveAsset('images/products/p6.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: null, oldPrice: null, offPercent: null, available: false },
    { id: 'p7', image: resolveAsset('images/products/p7.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: '175,000', oldPrice: null, offPercent: null, available: true },
    { id: 'p8', image: resolveAsset('images/products/p8.png'), title: 'قهوه ترک بن مانو مقدار 250 گرم\nخط دوم اسم طولانی', price: '175,000', oldPrice: null, offPercent: null, available: true },
  ];

  function createProductCardElement(product) {
    const offerBadge = product.offPercent
      ? `<span class="absolute top-1.5 right-1.5 block h-5/[24px] md:h-[30px]/[34px] text-xs md:text-base font-DanaDemiBold text-white bg-orange-300 dark:text-zinc-700 px-2.5 md:px-3.5 mb-5 rounded-full">${product.offPercent}</span>`
      : '';

    const priceBlock = product.available && product.price
      ? `<div class="flex gap-x-2 md:gap-x-2.5 mt-2 md:mt-2.5">
            <div class="text-teal-600 dark:text-emerald-500">
              <span class="font-DanaDemiBold text-base md:text-xl">${product.price} </span>
              <span class="text-xs md:text-sm tracking-tighter">تومان</span>
            </div>
            ${product.oldPrice ? `<div class="offer"><span class="font-Dana text-xs md:text-xl">${product.oldPrice} </span><span class="hidden xl:inline-block md:text-sm tracking-tighter">تومان</span></div>` : ''}
         </div>`
      : `<div class="mt-2 md:mt-2.5"><div class="text-red-400"><span class="font-Dana text-base md:text-xl">فعلا موجود نیست </span></div></div>`;

    const stars = `
      <div class="flex text-yellow-400">
        <svg class="size-4 md:size-6 ${!product.available ? 'text-gray-300 dark:text-gray-400' : ''}"><use href="#star"></use></svg>
        <svg class="size-4 md:size-6 "><use href="#star"></use></svg>
        <svg class="size-4 md:size-6 "><use href="#star"></use></svg>
        <svg class="size-4 md:size-6 "><use href="#star"></use></svg>
        <svg class="size-4 md:size-6 "><use href="#star"></use></svg>
      </div>`;

    const html = `
      <div class="p-2 md:p-5 bg-white dark:bg-zinc-700 rounded-2xl shadow-light">
        <div class="relative mb-2 md:mb-5">
          <img src="${product.image}" class="w-32 mx-auto md:w-auto" loading="lazy" alt="${product.id}">
          ${offerBadge}
        </div>
        <h5 class="font-DanaMedium text-sm md:text-xl h-10 md:h-14 text-zinc-700 dark:text-white line-clamp-2">${product.title.replace(/\n/g,'<br>')}</h5>
        ${priceBlock}
        <div class="flex items-center justify-between mt-2.5">
          <div class="flex items-center gap-x-2.5 md:gap-x-3">
            <span class="flex-center w-[26px] h-[26px] md:w-9 md:h-9 text-gray-400 bg-gray-100 dark:bg-zinc-800 hover:text-white hover:bg-teal-600 dark:hover:bg-emerald-500 rounded-full transition-all cursor-pointer">
              <svg class="size-4 md:size-[22px] transition-all"><use href="#shopping-cart"></use></svg>
            </span>
            <span class="flex-center w-[26px] h-[26px] md:w-9 md:h-9 text-gray-400  hover:text-teal-600  dark:hover:text-emerald-500 transition-all cursor-pointer">
              <svg class="size-4 md:size-6 transition-all"><use href="#arrows-right-left"></use></svg>
            </span>
          </div>
          ${stars}
        </div>
      </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    return wrapper.firstElementChild;
  }

  if (productsGrid) {
    productsGrid.innerHTML = '';
    productsData.forEach((p) => {
      productsGrid.appendChild(createProductCardElement(p));
    });
  }

  if (bestSellingWrapper) {
    bestSellingWrapper.innerHTML = '';
    productsData.slice(0, 6).forEach((p) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.appendChild(createProductCardElement(p));
      bestSellingWrapper.appendChild(slide);
    });
  }
})();

