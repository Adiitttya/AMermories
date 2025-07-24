/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 3000,
    delay: 400,
    // reset: true //Animation repeat
})

sr.reveal('.home__data, .music__container, .footer__container')
sr.reveal('.home__cards', {delay: 600, distance: '100px', interval: 100})
sr.reveal('.countdown__timer', {interval: 200})
sr.reveal('.gallery__card', {interval: 200})

/*=============== IMAGE SLIDE ===============*/
let items = document.querySelectorAll('.home .home__bg .home__bg-image');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.home__cards .home__bg-image');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showHome();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showHome();
}
// auto run home
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showHome(){
    // remove home__bg-image active old
    let itemActiveOld = document.querySelector('.home .home__bg .home__bg-image.active');
    let thumbnailActiveOld = document.querySelector('.home__cards .home__bg-image.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new home__bg-image
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run home
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
// function setPositionThumbnail () {
//     let thumbnailActive = document.querySelector('.home__cards .home__bg-image.active');
//     let rect = thumbnailActive.getBoundingClientRect();
//     if (rect.left < 0 || rect.right > window.innerWidth) {
//         thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
//     }
// }

// click home__cards
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showHome();
    })
})

/*=============== COUNTDOWN ===============*/
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');

const formatTime = (time) => {
    return time < 0 ? '0${time}' : time;
  }

const updateCountDown = (deadline) => {
  const currentTime = new Date();
  const timeDifference = deadline - currentTime; //milliseconds
  
  // calculate days, hours, mins, secs from timeDifferencs
  let calSecs = Math.floor(timeDifference/ 1000) % 60;
  let calcMins = Math.floor(timeDifference / 1000 / 60) % 60;
  let calcHours = Math.floor(timeDifference / 1000 / 60 / 60) % 24;
  let calcDays = Math.floor(timeDifference / 1000 / 60 / 60 / 24);
  
  days.textContent = formatTime(calcDays);
  mins.textContent = formatTime(calcMins);
  hours.textContent = formatTime(calcHours);
  secs.textContent = formatTime(calSecs);
  consol.log(days);
}

const countDown = (targetDate) => {
  setInterval(() => updateCountDown(targetDate), 1000);
}

const targetDate = new Date("May 21 2026 00:00:01");
countDown(targetDate);

/*=============== SHOW MENU ===============*/
document.querySelectorAll('.gallery__container img').forEach(image =>{
    image.onclick = () =>{
        document.querySelector('.popup-image').style.display = 'block';
        document.querySelector('.popup-image img').src = image.getAttribute('src')
    }
});

document.querySelector('.popup-image i').onclick = () =>{
    document.querySelector('.popup-image').style.display = 'none';
}

/*=============== MUSIC ===============*/
const musicBars = document.querySelectorAll('.music__container');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popupClose');
const popupVideo = document.getElementById('popupVideo');

musicBars.forEach(bar => {
  bar.addEventListener('click', () => {
    const videoId = bar.dataset.videoId;
    popupVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    popup.style.display = 'flex';
  });
});

popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
  popupVideo.src = '';
});

// Close popup if clicked outside the video content
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
    popupVideo.src = '';
  }
});