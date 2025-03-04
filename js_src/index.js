window.addEventListener("load", function () {
  var cover = document.querySelector("header");
  cover.style.opacity = 1.0;
});

// Scroll Member viewer
(function () {
  var memberWrap = document.querySelector("#team .member-wrap");
  var memberWrapOffsetTop = memberWrap.offsetTop;
  var members = memberWrap.querySelectorAll(".member-content");
  var memberHeight = members[0].offsetHeight;
  var memberCount = members.length;;
  var step = memberHeight * 1.2;
  var initDiffValue = -step*1.2;
  var lastDiffValue = (memberCount * step) + memberHeight;
  var activeClassName = "onMemberDesc";
  var mobileMaxWidth = 768;

  function toggleViewByScroll() {
    setTimeout(function () {
      var currentScrolly = window.scrollY - 20;
      var diff = (currentScrolly - memberWrapOffsetTop);

      var activeElement = document.querySelector("#team .onMemberDesc");
      if (activeElement) activeElement.classList.remove(activeClassName);

      var baseValue = (diff - initDiffValue);

      if (baseValue > 0 && baseValue < lastDiffValue) {
        var nth = Math.ceil(baseValue / step);
        if (nth <= memberCount) {
          var target = document.querySelector("#team .team-member:nth-child(" + nth + ") > .member-content");
          target.classList.add(activeClassName);
        }
      }
      //recursive
      toggleViewByScroll();
    }, 16);
  }

  function removeHoverEffect() {
    Array.prototype.slice.call(document.querySelectorAll(".member-hover-viewer")).forEach(function (v) {
      v.classList.remove("member-hover-viewer")
    });
  }

  if (window.innerWidth > mobileMaxWidth) return;
  removeHoverEffect();
  toggleViewByScroll();

})();


//image scroller
!(function () {

  var swipeNode = document.querySelector(".swipe");
  var btnNaviNode = document.querySelector(".buttonNavi");
  var resizeTimer = null;
  var startTime = null;
  var bRight = false;


  function hideNaviBtn() {
    var btnNavi = document.querySelector(".buttonNavi");
    btnNavi.style.display = "none";
  }


  function _isRightButtron(list, name) {
    return list.indexOf(name) > 0;
  }


  function getButtonClassNames() {
    var classNameList = Array.prototype.slice.call(btnNaviNode.querySelectorAll("button")).map(function (node) {
      return node.className;
    });
    return classNameList;
  }

  function isSwipeUIVisible() {
    var el = document.querySelector(".swipe");
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
  }


  function runScrollAnimation(maxValue, timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;
    var currentScrollLeft = swipeNode.scrollLeft;
    var currentValue = Math.min(progress / 10, 100);
    currentValue = (bRight) ? currentValue : currentValue * (-1);

    swipeNode.style.willChange = 'scroll-position';
    swipeNode.scrollLeft = currentScrollLeft + currentValue;

    if (progress < maxValue) {
      window.requestAnimationFrame(runScrollAnimation.bind(null, maxValue));
    }
  }

  function setTransformAnimation(distance, duration) {
    var node = swipeNode.querySelector(".swipe-imageslider");
    node.style.transform = "translateX(" + distance + "px)";
    setTimeout(function() {
      node.style.transform = "translateX(0px)";
    }, duration)
  }

  function execImageSwiperHint() {
    var scrollStartTime = new Date();
    var bInitialAnimation = false;
    window.addEventListener("scroll", function (e) {
      if (bInitialAnimation) return;
      if (!isSwipeUIVisible()) return;

      var time = new Date();
      var diff = time - scrollStartTime;
      if (diff < 100) return;

      setTransformAnimation(-50, 600);

      scrollStartTime = new Date();
      bInitialAnimation = true;
    });
  }


  // EventHandlers
  window.addEventListener('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {

      //$0.style.transform = "translateX(300px)";

    }, 300);
  });
  

  btnNaviNode.addEventListener("mousedown", function (e) {
    var buttonClassNameList = getButtonClassNames();
    var className = e.target.className;
    if(buttonClassNameList.indexOf(className) === -1) return;
    bRight = _isRightButtron(buttonClassNameList, className);
    startTime = null;
    requestAnimationFrame(runScrollAnimation.bind(null,500));
  })


  if (_.chkMobile())  {
    hideNaviBtn();
    execImageSwiperHint();
  } 
})();
 