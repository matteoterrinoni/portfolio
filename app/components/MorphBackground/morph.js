/**
 * demo4.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
import anime from 'animejs';
	// equation of a line
	const lineEq = (y2, y1, x2, x1, currentVal) => {
		// y = mx + b
		const m = (y2 - y1) / (x2 - x1);
		const b = y1 - m * x1;

		return m * currentVal + b;
	}

	// from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (event) => {
		let e = event;
		let posx = 0;
		let posy = 0;
		if (!e) {
			e = window.event
		}
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		return {
			x : posx,
			y : posy
		};
	};

	// From https://davidwalsh.name/javascript-debounce-function.
	function debounce(func, wait, immediate) {
		let timeout;
		return function() {
			let context = this, args = arguments;
			let later = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			}
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				func.apply(context, args)
			}
		};
	}

	export default class MorphingBG {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.el.style.opacity = 0;
			this.DOM.el.style.transition = 'transform 2s ease-out';
			this.DOM.pathEl = this.DOM.el.querySelector('path');
			this.paths = this.DOM.pathEl.getAttribute('pathdata:id').split(';')
			this.paths.splice(this.paths.length, 0, this.DOM.pathEl.getAttribute('d'));
			this.win = {width: window.innerWidth, height: window.innerHeight};
			this.animate();
			this.initEvents();
		}
		animate() {
			anime.remove(this.DOM.pathEl);
			anime({
				targets: this.DOM.pathEl,
				duration: 10000,
				easing: [0.5,0,0.5,1],
				d: this.paths,
				loop: true
			});
		}
		initEvents() {
			// Mousemove event / Tilt functionality.
			const tilt = {
				tx: this.win.width / 5,
				ty: this.win.height / 5,
				rz: 8,
				sx: [0.5,1],
				sy: [0.5,1]
			}
			const onMouseMoveFn = (ev) => {
				requestAnimationFrame(() => {
					if ( !this.started ) {
						this.started = true;
						anime({
							targets: this.DOM.el,
							duration: 500,
							easing: 'linear',
							opacity: [0,1]
						});
					}
					else {
						const mousepos = getMousePos(ev);					
						const rotZ = 1 * tilt.rz / this.win.height * mousepos.y - tilt.rz;
						const scaleX = mousepos.x < this.win.width / 1 ?
							lineEq(tilt.sx[0],tilt.sx[1],this.win.width / 1,0,mousepos.x) :
							lineEq(tilt.sx[1],tilt.sx[0],this.win.width,this.win.width / 2,mousepos.x);
						const scaleY = mousepos.y < this.win.height / 1 ?
							lineEq(tilt.sy[0],tilt.sy[1],this.win.height / 1,0,mousepos.y) :
							lineEq(tilt.sy[1],tilt.sy[0],this.win.height,this.win.height / 2,mousepos.y);
						const transX = 1 * tilt.tx / this.win.width * mousepos.x - tilt.tx;
						const transY = 1 * tilt.ty / this.win.height * mousepos.y - tilt.ty;

						this.DOM.el.style.transform = `
							translate3d(${transX}px, ${transY}px,0) 
							rotate3d(0,0,1,${rotZ}deg) 
							scale3d(${scaleX},${scaleY},1)`;
					}
				});
			};

			// Window resize.
			const onResizeFn = debounce(() => {
				this.win = {
					width: window.innerWidth,
					height: window.innerHeight
				}
			}, 20);

			document.addEventListener('mousemove', onMouseMoveFn, {passive: true});
			document.addEventListener('touchstart', onMouseMoveFn, {passive: true});
			window.addEventListener('resize', () => onResizeFn(), {passive: true});
		}
	}

