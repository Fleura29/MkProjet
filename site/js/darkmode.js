function setColorMode(mode) {
    // Switch between light/dark theme. `mode` is a string value of either 'dark' or 'light'.
    var hljs_light = document.getElementById('hljs-light'),
        hljs_dark = document.getElementById('hljs-dark');
    document.documentElement.setAttribute('data-bs-theme', mode);
    updateNavbarTheme(mode);
    if (mode == 'dark') {
        hljs_light.disabled = true;
        hljs_dark.disabled = false;
    } else {
        hljs_dark.disabled = true;
        hljs_light.disabled = false;
    }
}

function updateModeToggle(mode) {
    // Update icon and toggle checkmarks of color mode selector.
    var menu = document.getElementById('theme-menu');
    document.querySelectorAll('[data-bs-theme-value]')
       .forEach(function(toggle) {
            if (mode == toggle.getAttribute('data-bs-theme-value')) {
                toggle.setAttribute('aria-pressed', 'true');
                toggle.lastElementChild.classList.remove('d-none');
                menu.firstElementChild.setAttribute('class', toggle.firstElementChild.getAttribute('class'));
            } else {
                toggle.setAttribute('aria-pressed', 'false');
                toggle.lastElementChild.classList.add('d-none');
            }
        });
}


function updateNavbarTheme(mode) {
    // Update the navbar theme based on the mode
    var container = document.querySelector('#menu');
    const logo_cbp_light = document.querySelector("#logo_cbp_light");
    const logo_cbp_dark = document.querySelector("#logo_cbp_dark");
    if (mode == 'dark') {
        container.classList.remove('menu-light');
        container.classList.add('menu-dark');
        logo_cbp_light.style.display = "none";
        logo_cbp_dark.style.display = "block";
    } else {
        container.classList.remove('menu-dark');
        container.classList.add('menu-light');
        logo_cbp_light.style.display = "block";
        logo_cbp_dark.style.display = "none";
    }
}

function onSystemColorSchemeChange(event) {
    // Update site color mode to match system color mode.
    setColorMode(event.matches ? 'dark' : 'light');
}

var mql = window.matchMedia('(prefers-color-scheme: dark)'),
    defaultMode = document.documentElement.getAttribute('data-bs-theme'),
    storedMode = localStorage.getItem('mkdocs-colormode');
if (storedMode && storedMode != 'auto') {
    setColorMode(storedMode);
    updateModeToggle(storedMode);
} else if (storedMode == 'auto' || defaultMode == 'auto') {
    setColorMode(mql.matches ? 'dark' : 'light');
    updateModeToggle('auto');
    mql.addEventListener('change', onSystemColorSchemeChange);
} else {
    setColorMode(defaultMode);
    updateModeToggle(defaultMode);
}

document.querySelectorAll('[data-bs-theme-value]')
    .forEach(function(toggle) {
        toggle.addEventListener('click', function (e) {
            var mode = e.currentTarget.getAttribute('data-bs-theme-value');
            localStorage.setItem('mkdocs-colormode', mode);
            if (mode == 'auto') {
                setColorMode(mql.matches ? 'dark' : 'light');
                mql.addEventListener('change', onSystemColorSchemeChange);
            } else {
                setColorMode(mode);
                mql.removeEventListener('change', onSystemColorSchemeChange);
            }
            updateModeToggle(mode);
        });
    });
