import './pages/index.css';
import Inputmask from "../inputmask.es6.js";

const popup = document.querySelector('.popup');
const getConsult = document.querySelector('.header__consult');
const orderCase = document.querySelectorAll('.cases__block');
const getConsultBurger = document.querySelector('.header__consult_burger');
const closeButton = document.querySelector('.popup__close-button');
const mailSended = document.querySelector('.form__thanks');
const mailSendedPopup = document.querySelector('.popup__thanks');
const popupForm = document.forms["popup-form"];
const slider = document.querySelector('.slider');

//бургер меню
function burger() {
	const burgerButton = document.querySelector('.header__burger-btn');
	const headerBurger = document.querySelector('.header__burger-type');
	
	burgerButton.addEventListener('click', function() {
		burgerButton.classList.toggle('header__burger-btn_active');
		headerBurger.classList.toggle('header__burger-type_active');
		slider.classList.toggle('slider_hidden');
	});
}

burger();

//плавная прокрутка
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		const blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
}

//функция открытия попапов
function openPopup() {
  popup.classList.add('popup_opened');
  mailSendedPopup.classList.remove('popup__thanks_opened');
	burgerButton.classList.remove('header__burger-btn_active');
	headerBurger.classList.remove('header__burger-type_active');
  document.addEventListener('keydown', closePopupEsc);
  popupForm.reset();
};

//закрытие попапа
const closePopup = function () {
  const popupOpened = document.querySelector('.popup_opened');
  if (popupOpened) {
    popupOpened.classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', closePopupEsc);
};

//закрытие попапа нажатием Esc
const closePopupEsc = function (event) {
  if(event.key === "Escape") {
		closePopup();
  };
};

//закрытие попапа кликом на оверлей 
const closePopupClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

//обработчики событий
getConsult.addEventListener('click', openPopup);
orderCase.forEach(el => {
	el.addEventListener("click", openPopup);
});
getConsultBurger.addEventListener('click', openPopup);
closeButton.addEventListener('mousedown', closePopup);
popup.addEventListener('mousedown', closePopupClickOverlay);

//маска телефона
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

//отправка формы с попапа
if (popupForm) {
  popupForm.addEventListener("submit", popupFormCheck);
}

function popupFormCheck(e) {
  e.preventDefault(); // блокируем input
  popupFormSubmit(); // если правильно - отправляем данные
  popupThanks(); //благодарим за обращение
}

async function popupFormSubmit() {
  const popupData = popupSerializeForm(popupForm); // получаем данные формы
  const response = await popupSendData(popupData); // отправляем данные на почту
  if (response.ok) {
    popupFormReset(); // сбрасываем поля формы
  } else {
    alert("Код ошибки: " + response.status); // если not OK - показываем код ошибки
  }
}

function popupSerializeForm() {
  // формируем данные формы
  return new FormData(popupForm);
}

async function popupSendData(popupData) {
  return await fetch("sendmail.php", {
    // отправляем в скрипт sendmail.php
    method: "POST", // методом POST
    body: popupData,
  });
}

// сброс полей формы
function popupFormReset() {
  popupForm.reset();
  }

// благодарим за обращение
const popupThanks = function() {
  mailSendedPopup.classList.add('popup__thanks_opened');
}

//отправка формы с контактов
const contactForm = document.forms["contact-form"];
if (contactForm) {
  contactForm.addEventListener("submit", contactFormCheck);
}

function contactFormCheck(e) {
  e.preventDefault(); // блокируем input
  contactFormSubmit(); // если правильно - отправляем данные
  contactThanks(); //благодарим за обращение
}

async function contactFormSubmit() {
  const contactData = contactSerializeForm(contactForm); // получаем данные формы
  const response = await contactSendData(contactData); // отправляем данные на почту
  if (response.ok) {
    contactFormReset(); // сбрасываем поля формы
  } else {
    alert("Код ошибки: " + response.status); // если not OK - показываем код ошибки
  }
}

function contactSerializeForm() {
  // формируем данные формы
  return new FormData(contactForm);
}

async function contactSendData(contactData) {
  return await fetch("sendmail.php", {
    // отправляем в скрипт sendmail.php
    method: "POST", // методом POST
    body: contactData,
  });
}

// сброс полей формы
function contactFormReset() {
  contactForm.reset();
  }

// благодарим за обращение
const contactThanks = function() {
  mailSended.classList.add('form__thanks_opened');
}

//анимация при загрузке
window.onload = function () {
	document.body.classList.add('animation_hiding');
	window.setTimeout(function () {
		document.body.classList.add('animation');
		document.body.classList.remove('animation_hiding');
	}, 600);
}

// выделение активного меню
document.querySelectorAll('.header__link_ref').forEach(link => {
  if(link.href === window.location.href){
    link.setAttribute('aria-current', 'page')
  }
})

//слайдер
function Sim(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.slider')
	};

	// Slider objects
	this.sldrList = this.sldrRoot.querySelector('.slider__list');
	this.sldrElements = this.sldrList.querySelectorAll('.slider__element');
	this.sldrElemFirst = this.sldrList.querySelector('.slider__element');
	this.leftArrow = this.sldrRoot.querySelector('.slider__arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('.slider__arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('.slider__dots');

	// Initialization
	this.options = Sim.defaults;
	Sim.initialize(this)
};

Sim.defaults = {

	// Default options for the slider
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,     // Автоматическое пролистывание
	interval: 5000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Sim.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText =
             'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText =
             'background-color:rgb(255, 127, 39); cursor:default;'
};

Sim.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; // Количество элементов

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= 1) {   // Отключить навигацию
		that.options.auto = false;
                that.options.arrows = false; that.options.dots = false;
		that.leftArrow.style.display = 'none';
                that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // показать первый элемент
		that.sldrElemFirst.style.opacity = '1';
	};

	if(!that.options.loop) {
		that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		// that.sldrList.addEventListener('mouseenter', function() {
    //                   clearInterval(that.autoScroll)
    //             }, false);
		// that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none';
                that.rightArrow.style.display = 'none'
	};

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let i=0; i<that.elemCount; i++) {
			sum += '<span class="slider__dot"></span>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll =
                       that.sldrRoot.querySelectorAll('.slider__dot');
		// Назначаем точкам обработчик события 'click'
		for(let n=0; n<that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function(){
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если n == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let i=1; i<that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};

new Sim();

