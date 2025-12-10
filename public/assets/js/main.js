/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {
    const userProfile = document.getElementById('userProfile');
    const userPopover = document.getElementById('userPopover');
    const popoverOverlay = document.getElementById('popoverOverlay');
    const logoutBtn = document.getElementById('logoutBtn');

    // Toggle popover
    userProfile.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePopover();
    });

    // Close popover when clicking overlay
    popoverOverlay.addEventListener('click', function () {
      closePopover();
    });

    // Close popover when clicking outside
    document.addEventListener('click', function (e) {
      if (!userProfile.contains(e.target)) {
        closePopover();
      }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handleLogout();
    });

    function togglePopover() {
      const isOpen = userPopover.classList.contains('show');

      if (isOpen) {
        closePopover();
      } else {
        openPopover();
      }
    }

    function openPopover() {
      userPopover.classList.add('show');
      popoverOverlay.classList.add('show');
      userProfile.classList.add('active');
    }

    function closePopover() {
      userPopover.classList.remove('show');
      popoverOverlay.classList.remove('show');
      userProfile.classList.remove('active');
    }

  });
  

  (async function activeNavbar() {
    const homePath = document.getElementById("home-nav");
    const productPath = document.getElementById("product-nav");
    const cartPath = document.getElementById("cart-nav");
    const cartCounter = document.getElementById("cart-counter");

    switch(window.location.pathname) {
      case "/":
        homePath.classList.add("active");
        break
      case "/products":
        productPath.classList.add("active");
        break
      case "keranjang":
        cartPath.classList.add("active", "btn");
        break
    };

    const result = await fetch('/keranjang/total', {
      method: "get",
      headers: {
        'content-type': 'application/json'
      }
    });

    const response = await result.json();

    return modifyCartCounter(response.total_cart)
  })()

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  function modifyCartCounter(count) {
    const cartCounter = document.getElementById('cart-counter');
  
    if(+count === 0) {
      return cartCounter.hidden = true;
    }
  
    cartCounter.hidden = false;
    return cartCounter.textContent = count;
  }
})();
