const form = document.getElementById('vehicleForm');
const summaryBox = document.getElementById('summaryBox');
const resultBox = document.getElementById('resultBox');
const predictBtn = document.getElementById('predictBtn');

function updateSummary() {
  const model = document.getElementById('model').value;
  const type = document.getElementById('type').value;
  const motorCapacity = document.getElementById('motorCapacity').value;
  const motorTypes = document.getElementById('motorTypes').value;
  const color = document.getElementById('color').value;
  const condition = document.getElementById('condition').value;
  const year = document.getElementById('year').value;
  const mileage = document.getElementById('mileage').value;

  let details = [];
  if (model) details.push(`${model}`);
  if (type) details.push(`${type}`);
  if (year) details.push(`${year}`);
  if (motorCapacity) details.push(`${motorCapacity}L`);
  if (motorTypes) details.push(`${motorTypes}`);
  if (color) details.push(`${color}`);
  if (condition) details.push(`${condition} condition`);
  if (mileage) details.push(`${parseInt(mileage).toLocaleString()} km`);

  const summaryText = document.getElementById("summaryContent");

  if (details.length > 0) {
    summaryText.textContent = details.join(' • ');
  } else {
    summaryText.textContent = "Please fill in the form to see vehicle summary";
  }

  summaryBox.style.display = 'block';
}

form.addEventListener('input', updateSummary);
form.addEventListener('change', updateSummary);

predictBtn.addEventListener('click', function () {
  this.classList.add('loading');
  this.textContent = '';

  setTimeout(() => {
    const randomPrice = Math.floor(Math.random() * 50000) + 10000;
    resultBox.innerHTML = `
          <h3 style="color: black;">Estimated Price</h3>
          <div style="font-size: 2rem; font-weight: bold; color: #28a745;">$${randomPrice.toLocaleString()}</div>
          <p style="font-size: 0.9rem; opacity: 0.8;">*Price estimate based on current market conditions</p>
        `;
    resultBox.style.display = 'block';
    this.classList.remove('loading');
    this.textContent = 'Predict Price';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 2000);
});

function clearAll() {
  const form = document.getElementById("vehicleForm");
  form.reset();

  // Reset summary box content
  const summaryBox = document.getElementById("summaryBox");
  summaryBox.innerHTML = `
    <h4>Vehicle Summary</h4>
    <p id="summaryContent">Please fill in the form to see vehicle summary</p>
  `;

  // Reset result box content
  const resultBox = document.getElementById("resultBox");
  resultBox.innerHTML = `
    <h4>Predicted Price</h4>
    <p id="resultContent"></p>
  `;
}

// Listen for changes on the form and update the summary box
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('vehicleForm');
  const summaryContent = document.getElementById('summaryContent');

  function updateSummary() {
    const model = document.getElementById('model').value;
    const type = document.getElementById('type').value;
    const motormotorCapacity = document.getElementById('motormotorCapacity').value;
    const motorTypes = document.getElementById('motorTypes').value;
    const color = document.getElementById('color').value;
    const condition = document.getElementById('condition').value;
    const year = document.getElementById('year').value;
    const mileage = document.getElementById('mileage').value;

    if (
      model || type || motormotorCapacity || motorTypes ||
      color || condition || year || mileage
    ) {
      summaryContent.innerHTML = `
              <strong>Model:</strong> ${model || '-'}<br>
              <strong>Type:</strong> ${type || '-'}<br>
              <strong>Engine Capacity:</strong> ${motormotorCapacity || '-'}<br>
              <strong>Engine Type:</strong> ${motorTypes || '-'}<br>
              <strong>Color:</strong> ${color || '-'}<br>
              <strong>Condition:</strong> ${condition || '-'}<br>
              <strong>Year:</strong> ${year || '-'}<br>
              <strong>Mileage:</strong> ${mileage || '-'} km
            `;
    } else {
      summaryContent.textContent = 'Please fill in the form to see vehicle summary';
    }
  }

  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);
});


// Navbar JavaScript Functionality
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const userMenuButton = document.getElementById('user-menu-button');
  const userDropdown = document.getElementById('user-dropdown');
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarUser = document.getElementById('navbar-user');
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Theme Management
  let isDarkMode = localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  function updateTheme() {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      themeToggleLightIcon.classList.remove('hidden');
      themeToggleDarkIcon.classList.add('hidden');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      themeToggleLightIcon.classList.add('hidden');
      themeToggleDarkIcon.classList.remove('hidden');
      localStorage.setItem('color-theme', 'light');
    }
  }

  // Initialize theme on page load
  updateTheme();

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      isDarkMode = !isDarkMode;
      updateTheme();
    });
  }

  // User Dropdown Functionality
  let isUserDropdownOpen = false;

  function toggleUserDropdown() {
    isUserDropdownOpen = !isUserDropdownOpen;

    if (isUserDropdownOpen) {
      userDropdown.classList.remove('hidden');
      userDropdown.classList.add('dropdown-enter');

      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        userDropdown.classList.remove('dropdown-enter');
        userDropdown.classList.add('dropdown-enter-active');
      });

      userMenuButton.setAttribute('aria-expanded', 'true');
    } else {
      userDropdown.classList.remove('dropdown-enter-active');
      userDropdown.classList.add('dropdown-exit-active');

      setTimeout(() => {
        userDropdown.classList.add('hidden');
        userDropdown.classList.remove('dropdown-exit-active');
      }, 200);

      userMenuButton.setAttribute('aria-expanded', 'false');
    }
  }

  // User menu button click event
  if (userMenuButton) {
    userMenuButton.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleUserDropdown();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (userMenuButton && userDropdown &&
      !userMenuButton.contains(e.target) &&
      !userDropdown.contains(e.target) &&
      isUserDropdownOpen) {
      toggleUserDropdown();
    }
  });

  // Close dropdown when pressing Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isUserDropdownOpen) {
      toggleUserDropdown();
      userMenuButton.focus(); // Return focus to button
    }
  });

  // Mobile Menu Functionality
  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
      navbarUser.classList.remove('hidden');
      navbarUser.classList.add('mobile-menu-enter');
      navbarToggle.classList.add('hamburger-active');

      requestAnimationFrame(() => {
        navbarUser.classList.remove('mobile-menu-enter');
        navbarUser.classList.add('mobile-menu-enter-active');
      });

      navbarToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-menu-active');
    } else {
      navbarUser.classList.remove('mobile-menu-enter-active');
      navbarUser.classList.add('mobile-menu-exit-active');
      navbarToggle.classList.remove('hamburger-active');

      setTimeout(() => {
        navbarUser.classList.add('hidden');
        navbarUser.classList.remove('mobile-menu-exit-active');
      }, 300);

      navbarToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-active');
    }
  }

  // Mobile menu toggle event
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function () {
      toggleMobileMenu();
    });
  }

  // Close mobile menu when clicking on navigation links (mobile only)
  if (navbarUser) {
    const navLinks = navbarUser.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768 && isMobileMenuOpen) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Handle window resize - close mobile menu if resizing to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
      // Reset mobile menu without animation
      navbarUser.classList.remove('mobile-menu-enter-active', 'mobile-menu-exit-active');
      navbarUser.classList.add('hidden');
      navbarToggle.classList.remove('hamburger-active');
      navbarToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-active');
      isMobileMenuOpen = false;
    }
  });

  // Active Navigation Link Management
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
        link.classList.add('text-blue-700', 'dark:text-blue-500');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('text-blue-700', 'dark:text-blue-500');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Initialize active link on page load
  setActiveNavLink();

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        if (isMobileMenuOpen) {
          toggleMobileMenu();
        }
      }
    });
  });

  // Keyboard Navigation Enhancement
  document.addEventListener('keydown', function (e) {
    // Tab navigation for dropdown items
    if (isUserDropdownOpen && e.key === 'Tab') {
      const dropdownItems = userDropdown.querySelectorAll('a');
      const firstItem = dropdownItems[0];
      const lastItem = dropdownItems[dropdownItems.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstItem) {
          e.preventDefault();
          userMenuButton.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastItem) {
          e.preventDefault();
          toggleUserDropdown();
        }
      }
    }
  });

  // Add loading state functionality (optional)
  function showLoading(element) {
    element.classList.add('loading');
  }

  function hideLoading(element) {
    element.classList.remove('loading');
  }

  // Expose functions globally if needed
  window.navbarFunctions = {
    toggleUserDropdown,
    toggleMobileMenu,
    updateTheme,
    showLoading,
    hideLoading,
    setActiveNavLink
  };

  // Initialize any additional features
  console.log('Navbar initialized successfully');
});



document.getElementById('predictBtn').addEventListener('click', function () {
  // Example payload (replace with your actual data)
  const payload = {
    model: vehicleForm.model.value,
    type: vehicleForm.type.value,
    condition: vehicleForm.condition.value,
    motormotorCapacity: vehicleForm.motorCapacity.value,
    motorTypes: vehicleForm.motorTypes.value,
    color: vehicleForm.color.value,
    year: vehicleForm.year.value,
    mileage: vehicleForm.mileage.value
  };

  fetch('http://localhost:8000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(res => {
      console.log('Data sent successfully', res);
      const predictedPrice = res.predicted_price ?? null;

      // Example DOM update
      document.getElementById('predictedPriceDisplay').textContent =
        predictedPrice !== null ? `$${predictedPrice}` : 'No price returned';

      // If you still want these functions:
      updateStepContentOnNext?.();
      if (typeof currentStep !== 'undefined') currentStep++;
    })
    .catch(err => {
      console.error('Error sending data', err);
    });
});
