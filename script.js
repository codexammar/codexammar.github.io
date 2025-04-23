// Animate sections as you scroll
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
  