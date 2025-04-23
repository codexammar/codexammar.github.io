// Scroll fade animation
const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 1s ease forwards";
        }
      });
    },
    { threshold: 0.2 }
  );
  
  document.querySelectorAll(".content").forEach(section => {
    observer.observe(section);
  });
  
  // Dark mode toggle
  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  