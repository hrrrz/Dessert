/*=============== ADD SHADOW TO HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header');
    const SCROLL_THRESHOLD = 50;

    header.classList.toggle('shadow-header', window.scrollY >= SCROLL_THRESHOLD);
}

window.addEventListener('scroll', shadowHeader);

/*=============== SHOW SCROLL UP ===============*/

const showScrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);
}

window.addEventListener('scroll', showScrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]'); 

const scrollActive = () => {
    const scrollDown = window.scrollY; 

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight; 
        const sectionTop = section.offsetTop - 58;
        const sectionId = section.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (sectionsClass) {
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
        }
    });
}

window.addEventListener('scroll', scrollActive);


/*=============== SCROLL REVEAL ANIMATION===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
})

sr.reveal(`.home__data, .popular__container`)
sr.reveal(`.home__board`, {delay: 700, distance: '100px', origin: 'right'})
sr.reveal(`.home__cake`, {delay: 1400, distance: '100px', origin: 'bottom', rotate: {z: -90}})
sr.reveal(`.about__data, .recipe__list`, {origin: 'right'})
sr.reveal(`.about__img, .recipe__img`, {origin: 'left'})
sr.reveal(`.products__card`, {interval: 100})
