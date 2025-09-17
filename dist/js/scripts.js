/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Close navbar when clicking outside of it (accessibility improvement)
    const navbarCollapse = document.body.querySelector('#navbarResponsive');
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', (event) => {
            // Check if navbar is expanded and toggler is visible (mobile view)
            const isNavbarExpanded = navbarCollapse.classList.contains('show');
            const isTogglerVisible = window.getComputedStyle(navbarToggler).display !== 'none';
            
            if (isNavbarExpanded && isTogglerVisible) {
                // Check if click is outside the navbar
                const isClickInsideNav = sideNav.contains(event.target);
                
                if (!isClickInsideNav) {
                    navbarToggler.click();
                }
            }
        });
    }

});
