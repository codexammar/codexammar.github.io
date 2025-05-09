document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navContainer = document.querySelector(".navbar");
    const body = document.body;
    const html = document.documentElement;
    const subnav = document.getElementById("projects-subnav");
    const navLinks = document.querySelector(".nav-links");
    const pageContent = document.getElementById("pageContent");
    const projectsNavItem = document.querySelector('.nav-item.has-subnav');
    const projectsSection = document.getElementById("projects");
  
    // 🔁 Close mobile nav
    const removeNav = () => {
      body.classList.remove("nav-open");
      body.classList.add("nav-closing");
  
      setTimeout(() => {
        body.classList.remove("nav-closing");
        document.documentElement.style.scrollPaddingTop = "64px";
      }, 300);
    };
  
    // 🌙 Apply saved theme
    const applyTheme = (theme) => {
        html.classList.add("theme-transition");
      
        if (theme === "dark") {
          html.classList.add("dark-mode");
          themeToggle.textContent = "☀️";
        } else {
          html.classList.remove("dark-mode");
          themeToggle.textContent = "🌙";
        }
      
        // Remove transition flag after animation duration
        setTimeout(() => {
          html.classList.remove("theme-transition");
        }, 300);
    };      
  
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.classList.contains("dark-mode") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  
    // --- Subnav show/hide on hover
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
          removeNav();
          setTimeout(() => {
            const offset = 110;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }, 10);
          this.blur();
        }
      });
    });
  
    // --- Close hamburger on click outside
    document.addEventListener("click", (event) => {
      const isMobile = window.innerWidth <= 768;
      const isOpen = body.classList.contains("nav-open");
      const clickedInsideNav = navContainer.contains(event.target);
      if (isMobile && isOpen && !clickedInsideNav) {
        removeNav();
      }
    });

    // --- About section toggler ---
    const toggleBtn = document.getElementById("toggleAbout");
    const aboutText = document.getElementById("aboutText");

    toggleBtn.addEventListener("click", () => {
    const isExpanded = aboutText.classList.toggle("expanded");
    toggleBtn.textContent = isExpanded ? "Show Less" : "View More";
    });

    // Click to copy email
document.getElementById("copyEmailBtn")?.addEventListener("click", () => {
    const email = "syedammar.work@gmail.com";
    navigator.clipboard.writeText(email);
    const copyText = document.getElementById("copyText");
    copyText.textContent = "Copied!";
    setTimeout(() => (copyText.textContent = "Copy Email"), 2000);
  });
  
  // Live clock (EST)
  function updateClock() {
    const estTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Toronto",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    document.getElementById("clock").textContent = estTime;
  
    const now = new Date();
    const options = { timeZone: "America/Toronto", weekday: "short", hour: "numeric" };
    const torontoTime = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
  
    const day = torontoTime.find(part => part.type === "weekday").value;
    const hourPart = torontoTime.find(part => part.type === "hour").value;
    const dayPeriod = torontoTime.find(part => part.type === "dayPeriod").value;
    let hour = parseInt(hourPart);
    if (dayPeriod === "PM" && hour !== 12) hour += 12;
    if (dayPeriod === "AM" && hour === 12) hour = 0;
  
    const isWeekday = !["Sat", "Sun"].includes(day);
    const isWeekend = ["Sat", "Sun"].includes(day);
  
    const isAvailable =
      (isWeekday && hour >= 11 && hour < 22) ||
      (isWeekend && hour >= 12 && hour < 15);
  
    const badge = document.getElementById("availabilityBadge");
    if (isAvailable) {
      badge.textContent = "Available";
      badge.classList.add("available");
      badge.classList.remove("unavailable");
    } else {
      badge.textContent = "Unavailable";
      badge.classList.add("unavailable");
      badge.classList.remove("available");
    }
  }
  
  setInterval(updateClock, 1000);
  updateClock();  

  // Refer Me Button
    const referBtn = document.getElementById("referBtn");
    const referStatus = document.getElementById("referStatus");

    referBtn?.addEventListener("click", () => {
    // Download the resume
    const link = document.createElement("a");
    link.href = "assets/files/resume.pdf";
    link.download = "Ammar_Resume.pdf";
    link.click();

    // Copy to clipboard
    const contactInfo = `syedammar.work@gmail.com\n+1 416 809 4025\nhttps://codexammar.github.io`;
    navigator.clipboard.writeText(contactInfo).then(() => {
        referStatus.textContent = "Copied email + website. Resume downloaded ✅";
        setTimeout(() => (referStatus.textContent = ""), 3000);
    });
    });

    // Click to copy phone number
    document.getElementById("copyPhoneBtn")?.addEventListener("click", () => {
        const phone = "+1 416 809 4025";
        navigator.clipboard.writeText(phone);
        const copyPhoneText = document.getElementById("copyPhoneText");
        copyPhoneText.textContent = "Copied!";
        setTimeout(() => (copyPhoneText.textContent = "Copy Phone"), 2000);
    });  

    // Timeline scroll animation
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            entry.target.classList.add("show");
            }
        });
        },
        {
        threshold: 0.2, // fades in when 20% visible
        }
    );

    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`; // 0.2s delay between items
        observer.observe(item);
    });    
    
       

});
  
// NEW SKILLS RIPPLE EFFECT
// NEW FINAL SKILLS RIPPLE EFFECT
document.addEventListener('DOMContentLoaded', () => {
  const skillSection = document.getElementById('skills');
  const skillsGrid = Array.from(document.querySelectorAll('.skills-grid .skill'));

  // Define cleaned-up, reordered grids
  const skillSets = [
    [
      "Python", "JavaScript", "TensorFlow", "Docker", "MongoDB",
      "OpenCV", "React", "FastAPI", "Node.js", "TypeScript",
      "Unity3D", "SQL", "Supabase", "NetBeans", "Eclipse",
      "MATLAB", "SwaggerUI", "Git", "VS Code", "Zero Trust Architecture",
      "Database Security", "Web App Security", "JWT Authentication", "OAuth 2.0", "Real-Time Processing"
    ],
    [
      "Project Management", "Leadership", "Team Collaboration", "Agile", "Scrum",
      "Visual Studio", "Problem Solving", "Software Testing", "System Design", "Database Design",
      "Version Control", "GitHub", "Portfolio Building", "Content Writing", "Technical Presentations",
      "Linux", "Server Hardening", "Monitoring", "Logging", "Anomaly Detection",
      "Model Evaluation", "Resilience Engineering", "Cloud Security", "Azure", ""
    ],
    [
      "UI/UX", "Adobe Creative Suite", "DaVinci Resolve", "Visual Communication", "Technical Writing",
      "Public Speaking", "Organizational Skills", "Time Management", "Critical Thinking", "Creative Problem Solving",
      "Mentoring (Peer Tutor)", "Microsoft Office Suite", "Presentation Design", "Research Skills", "Independent Learning",
      "Curiosity-Driven Development", "Software Documentation", "Storytelling (Technical Context)", "Self-Management", "Adaptability",
      "Academic Writing", "Peer Collaboration", "Career Development", "Work Ethic", "Growth Mindset"
    ]
  ];

  let currentSet = 0;
  let animationTriggered = false;

  function rippleUpdate(skills) {
    const max = 5;
    let delay = 0;

    for (let d = 0; d <= (2 * (max - 1)); d++) {
      for (let row = 0; row < max; row++) {
        for (let col = 0; col < max; col++) {
          if (row + col === d) {
            const idx = (row * 5) + col;
            if (idx < skillsGrid.length) {
              setTimeout(() => {
                skillsGrid[idx].classList.remove('show'); // fade out old
                setTimeout(() => {
                  const newText = skills[idx] || "";
                  skillsGrid[idx].textContent = newText;
                  if (newText.trim() === "") {
                    skillsGrid[idx].classList.remove('show'); // hide bullet if empty
                  } else {
                    skillsGrid[idx].classList.add('show'); // fade in new text with bullet
                  }
                }, 150);
              }, delay * 120);
            }
          }
        }
      }
      delay++;
    }
  }

  function onScroll() {
    const rect = skillSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8 && !animationTriggered) {
      animationTriggered = true;
      rippleUpdate(skillSets[currentSet]);

      setInterval(() => {
        currentSet = (currentSet + 1) % skillSets.length;
        rippleUpdate(skillSets[currentSet]);
      }, 6000);
    }
  }

  window.addEventListener('scroll', onScroll);
});

