/*=============== ADD SHADOW TO HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header');
    const SCROLL_THRESHOLD = 50;

    header.classList.toggle('shadow-header', window.scrollY >= SCROLL_THRESHOLD);
}

window.addEventListener('scroll', shadowHeader);

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper('.swiper', {
    loop: true,
    loopedSlides: 1,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
});

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

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        }else{
            sectionsClass.classList.remove('active-link')
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


sr.reveal(`.home__data , .popular__container, .footer`)
sr.reveal(`.home__plate`,{delay:700,distance:'100px',origin:'right'})
sr.reveal(`.home__cake`,{delay:1400,distance:'100px',origin:'bottom',rotate:{z:-90}})
sr.reveal(`.home__ingredient`,{delay:2000,interval:100})
sr.reveal(`.about__data, .recipe__list, .contact__data`,{origin:'right'})
sr.reveal(`.about__img, .recipe__img, .contact__image`,{origin:'left'})
sr.reveal(`.products__card`,{interval:100})

/*=============== GENERATE MODALS FROM DATA ===============*/
function generateModals() {
    recipesData.forEach(recipe => {
        const ingredientsHTML = recipe.ingredients.map(ing => `
            <div class="recipe-modal__ingredient">
                ${ing.img ? `<img src="${ing.img}" alt="${ing.name}" class="recipe-modal__ing-img">` : ''}
                    <div>
                        <h3 class="recipe-modal__ing-name">${ing.name}</h3>
                        <p class="recipe-modal__ing-desc">${ing.desc}</p>
                    </div>
            </div>`).join('')

        const stepsHTML = recipe.steps.map(step => `<li>${step}</li>`).join('')

        const modal = document.createElement('div')
        modal.className = 'recipe-modal'
        modal.id = recipe.id
        modal.innerHTML = `
            <div class="recipe-modal__overlay"></div>
            <div class="recipe-modal__content">
            <button class="recipe-modal__close"><i class="ri-close-large-line"></i></button>
            <h2 class="recipe-modal__title">${recipe.name}</h2>
            <p class="recipe-modal__country">${recipe.country}</p>
            <p class="recipe-modal__desc">${recipe.description}</p>
            <div class="recipe-modal__time">
                <span class="recipe-modal__time-item"><strong>Prep</strong> ${recipe.time.prep}</span>
                <span class="recipe-modal__time-item"><strong>Cook</strong> ${recipe.time.cook}</span>
                <span class="recipe-modal__time-item"><strong>Total</strong> ${recipe.time.total}</span>
            </div>
            <h3 class="recipe-modal__ing-title">Recipe</h3>
            <div class="recipe-modal__body">
                <div class="recipe-modal__list">${ingredientsHTML}</div>
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-modal__dish-img">
            </div>
            <div class="recipe-modal__section">
                <h3 class="recipe-modal__subtitle">Steps</h3>
                <ol class="recipe-modal__steps">${stepsHTML}</ol>
            </div>
            </div>`
        document.body.appendChild(modal)
    })
}

generateModals()

/*=============== RECIPE MODAL OPEN / CLOSE ===============*/
document.querySelectorAll('.products__card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById(card.dataset.modal).classList.add('active')
    })
})

document.addEventListener('click', e => {
    if (e.target.closest('.recipe-modal__overlay') || e.target.closest('.recipe-modal__close')) {
      e.target.closest('.recipe-modal').classList.remove('active')
    }
})

/*=============== RECIPE CHECKLIST ===============*/
document.addEventListener('click', e => {
    const ing  = e.target.closest('.recipe-modal__ingredient')
    const step = e.target.closest('.recipe-modal__steps li')
    if (ing)  ing.classList.toggle('done')
    if (step) step.classList.toggle('done')
})
