import anime from 'animejs';
const charming = require('charming');

export default class Item {
	constructor(el) {
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.label = el.querySelector('.menu__item-label');
		charming(this.DOM.label);
		this.DOM.labelLetters = Array.from(this.DOM.label.querySelectorAll('span'));
		this.initEvents();
	}
	initEvents() {
		this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
			this.isActive = true;
			anime.remove(this.DOM.labelLetters);
			anime({
				targets: this.DOM.labelLetters,
				duration: 50,
				delay: (t,i) => (i+5)*10,
				easing: 'linear',
				opacity: [0,1]
			});	
		}, 50);

		this.mouseleaveFn = () => {
			clearTimeout(this.mouseTimeout);
			if( !this.isActive ) return;
			this.isActive = false;
		};

		this.DOM.el.addEventListener('mouseenter', this.mouseenterFn, {passive: true});
		this.DOM.el.addEventListener('touchstart', this.mouseenterFn, {passive: true});
		this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn, {passive: true});
		this.DOM.el.addEventListener('touchend', this.mouseleaveFn, {passive: true});
	}
}