"use strict";

// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Selecting Elements

// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

const header = document.querySelector(".header");

// const allSections = document.querySelectorAll("section")
// console.log(allSections)

// document.getElementById("section--1")

// const allBtns = document.getElementsByTagName('button');
// console.log(allBtns);

//Create and Insert Elements
const message = document.createElement("div");

message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality"

message.innerHTML = `We use cookies for improved functionality and 
analytics.<button class="btn btn--close-cookie">Got it </button>`;

header.append(message); //After header element
// header.after(message);

/* Since the same element cannot exist in DOM multiple times, In order to do it, We have to Clone it.

header.append(message.cloneNode(true)) Shadow-Clone Jutsu */

// header.prepend(message);  //before element
// header.before(message) //Creates a sibling to the header element

//Delete Elements

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove(); /* .remove is recent , earlier we had to go to the parentElement the remove child 
    message.parentElement.removeChild(message); */
  });

//Styling , Attributes and classes
message.style.backgroundColor = "#37383d";
message.style.width = "80%";

console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).width);

message.style.height =
  parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//CSS Variable (custom properties)

//set Property , get Property

// document.documentElement.style.setProperty('--color-primary','#960019')

//Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);

console.log(logo.className); //Use ClassName instead of class

console.log(logo.designer); //Not a standard property , it will return undefined.

//get attribute
console.log(logo.getAttribute("designer"));

//set attribute
logo.setAttribute("designer", "NNN");
console.log(logo.getAttribute("designer"));

//Absolute URL and Relative URL  //same with links
console.log(logo.src); //Absolute url

console.log(logo.getAttribute("src")); //relative url

//Data Attribute
console.log(logo.dataset.versionNumber); //3.0 always used with dataset

//Classes
logo.classList.add("j", "k");
logo.classList.remove("j", "k");
logo.classList.toggle("j", "k");
logo.classList.contains("j", "k"); //not includes

// logo.className = 'xyz' RECOMMENDED NOT TO USE AS IT CAN OVERWRITE ALL CLASSES



//types of event and event handler - from MDN

//Event bubbling and capturing - Event Propagation

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   // this.style.backgroundColor = randomColor();
//   console.log("link", e.target, e.currentTarget);

//   //Stop Propagation
//   // e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   // this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });

// /* the event actually happens on the document roots and then travel to the target element i.e .nav-link 
// and from there it bubbles up i.e from target element it goes to its parent elements i.e .nav-links 
// */

// document.querySelector(".nav").addEventListener("click", function (e) {
//   // this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// });

//Event Delegation  Page Navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href"); 
//     console.log(id);

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     });

//   });
// });  

//It will effect the performance as its only scalable for 2-3 nav link , 
// instead we can use event Delegation , i.e 


//adding event listener to a common parent 
document.querySelector(".nav__links").addEventListener('click', function(e){
  e.preventDefault();
  // console.log(e.target)

  //Working with the element inside the parent i.e determine the event which originate the event
  //Matching Strategy 
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute("href"); 
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});


//Building a tabbed component 

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

 tabContainer.addEventListener('click',function(e){

  let clicked = e.target.closest('.operations__tab');
  if(!clicked) return;

  //Tab removed active 
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active Tab 
  clicked.classList.add('operations__tab--active');

  //Activating Content 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
 })

 //Lazy Loading Img 

 const imgTargets = document.querySelectorAll('img[data-src]');

 const loadImg = function(entries,observer){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;
  
  entry.target.src = entry.target.dataset.src ; 
  entry.target.classList.remove('lazy-img');

  observer.unobserve(entry.target);
 };

 const imgObserver = new IntersectionObserver(loadImg , {
  root: null ,
  threshold: 0,
  rootMargin: '200px',
 });

 imgTargets.forEach(img => imgObserver.observe(img));






//Slider Component
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currSlide = 0;

const maxSlide = slides.length ; 

const gotoSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
}

gotoSlide(0);

const nextSlide = function(){
  if(currSlide == maxSlide - 1){
    currSlide = 0;
  }
  else{
    currSlide++ ; 
  } 

  gotoSlide(currSlide);
}
// -100%, 0% , 100% , 200% , 300%


const previousSlide = function(){
  if(currSlide === 0){
    currSlide = maxSlide - 1;
  }
  else{
    currSlide -- ;
  }

  gotoSlide(currSlide);
}


//Next Slide 
btnRight.addEventListener('click', nextSlide);

//previous slide 
btnLeft.addEventListener('click', previousSlide);

//on keypress 
document.addEventListener('keydown' , function(e){
  if(e.key === "arrowRight" && e.key === "arrowUp"){
    nextSlide();
  }
  else(e.key === "arrowLeft" && e.key === "arrowDown")
  {
    previousSlide();
  }
})


document.addEventListener('DOMContentLoaded',function(e){
  console.log("Page Loaded",e);
})

window.addEventListener('load',function(e){
  console.log(e)
})

