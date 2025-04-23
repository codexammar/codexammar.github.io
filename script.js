document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navContainer = document.querySelector(".navbar");
    const body = document.body;
    const subnav = document.getElementById("projects-subnav");
    const navLinks = document.querySelector(".nav-links");
    const pageContent = document.getElementById("pageContent");
    const projectsNavItem = document.querySelector('.nav-item.has-subnav');
    const projectsSection = document.getElementById("projects");
  
    // 🔁 Unified close handler for nav
    const removeNav = () => {
      body.classList.remove("nav-open");
      body.classList.add("nav-closing");
  
      setTimeout(() => {
        body.classList.remove("nav-closing");
        document.documentElement.style.scrollPaddingTop = "64px";
      }, 300);
    };
  
    // --- Theme toggle logic ---
    const applyTheme = (theme) => {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
      } else {
        body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
      }
    };
  
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  
    // --- Subnav show/hide on hover (navbar + section)
    if (window.innerWidth > 768) {
        let subnavTimeout;
      
        const showSubnav = () => {
          if (!body.classList.contains("nav-open")) {
            clearTimeout(subnavTimeout);
            subnav.classList.add("show-subnav");
          }
        };
      
        const hideSubnav = () => {
          subnavTimeout = setTimeout(() => {
            subnav.classList.remove("show-subnav");
          }, 200);
        };
      
        projectsNavItem.addEventListener("mouseenter", showSubnav);
        projectsNavItem.addEventListener("mouseleave", hideSubnav);
        subnav.addEventListener("mouseenter", showSubnav);
        subnav.addEventListener("mouseleave", hideSubnav);
        projectsSection.addEventListener("mouseenter", showSubnav);
        projectsSection.addEventListener("mouseleave", hideSubnav);
    }      
  
    // --- Hamburger open/close
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = body.classList.contains("nav-open");
  
      if (!isOpen) {
        body.classList.add("nav-open");
        document.documentElement.style.scrollPaddingTop = "160px";
      } else {
        removeNav();
      }
    });
  
    // --- Anchor scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const target = document.querySelector(href);
  
        if (target) {
          e.preventDefault();
  
          // Close menu
          removeNav();
  
          setTimeout(() => {
            const offset = 110;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
  
            window.scrollTo({
              top,
              behavior: "smooth"
            });
          }, 10);
  
          this.blur(); // prevent focus layout shift
        }
      });
    });
  
    // --- Close mobile menu on outside click
    document.addEventListener("click", (event) => {
      const isMobile = window.innerWidth <= 768;
      const isOpen = body.classList.contains("nav-open");
      const clickedInsideNav = navContainer.contains(event.target);
  
      if (isMobile && isOpen && !clickedInsideNav) {
        removeNav();
      }
    });
  });
  