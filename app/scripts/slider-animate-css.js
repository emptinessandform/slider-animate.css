function SliderAnimateCss(options) {
  var elem = this._elem = document.querySelector(options.elem);
  var elemItems = this._elemItems = Array.prototype.slice.call(elem.children);
  var next = this._next = document.querySelector(options.next);
  var prev = this._prev = document.querySelector(options.prev);
  this._animateCssJoin = options.animateCssJoin;
  this._animateCssLeave = options.animateCssLeave;
  this._startElem = options.start || 0;

  this._renderSlider();

  next.onclick = this._onArrowsClick.bind(this);
  prev.onclick = this._onArrowsClick.bind(this);
  
}
SliderAnimateCss.prototype._onArrowsClick = function (event) {
  if(event.target == this._next) {
    this.moveSlider(1)
  }
  if(event.target == this._prev) {
    this.moveSlider(-1)
  }
};
SliderAnimateCss.prototype._renderSlider = function () {
  var self = this;
  this._elemItems.forEach(function (elem, i) {
    if(elem == self._next || elem == self._prev) {
      return false;
    }
    if(i == self._startElem) {
      elem.setAttribute('data-slider-index', i);
      elem.setAttribute('data-slider-active', 'true');
      elem.classList.add('animated');
      return false;
    }
    elem.setAttribute('data-slider-index', i);
    elem.classList.add('animated');
    elem.style.display = 'none';
  })
};

SliderAnimateCss.prototype.moveSlider = function (step) {
  step = Number(step);

  var currentActive = this._elem.querySelector('[data-slider-active="true"');

  if(!this._elem.querySelector('[data-slider-index="' + (+currentActive.getAttribute('data-slider-index') + step) + '"]')) {
    return false;
  }

  this._hideSlide(currentActive);

  var newActive = this._elem.querySelector('[data-slider-index="' + (+currentActive.getAttribute('data-slider-index') + step)  + '"]');

  this._showSlide(newActive, currentActive);
};

SliderAnimateCss.prototype._hideSlide = function (slide) {
  slide.classList.remove(this._animateCssJoin);
  slide.classList.add(this._animateCssLeave);
  slide.setAttribute('data-slider-active', 'false');
  setTimeout(function () {
    slide.style.display = 'none';
  }, parseInt(getComputedStyle(slide).animationDuration ) * 1000);
};
SliderAnimateCss.prototype._showSlide = function (slide, currentActive) {
  var self = this;
  setTimeout(function () {
    slide.style.display = '';
    slide.classList.remove(self._animateCssLeave);
    slide.classList.add(self._animateCssJoin);
    slide.setAttribute('data-slider-active', 'true');
  }, parseInt(getComputedStyle(currentActive).animationDuration ) * 1000);
};