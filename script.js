// Track switching functionality
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const trackPanels = document.querySelectorAll('.track-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTrack = tab.dataset.track;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      trackPanels.forEach(panel => {
        if (panel.dataset.track === targetTrack) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Smooth scroll to content
      document.getElementById('track-content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#contact') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for scroll animation
  document.querySelectorAll('.section, .card, .module').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add parallax effect to hero background elements
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
          const before = hero.querySelector('::before');
          const after = hero.querySelector('::after');
          hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });

  // Add hover effect to metrics
  const metrics = document.querySelectorAll('.metric');
  metrics.forEach(metric => {
    metric.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    metric.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Tool cloud interactive effect
  const tools = document.querySelectorAll('.tool');
  tools.forEach((tool, index) => {
    tool.style.animationDelay = `${index * 0.05}s`;
    
    tool.addEventListener('click', function() {
      this.style.animation = 'pulse 0.4s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 400);
    });
  });

  // Add typing effect to hero title (optional - can be removed if too much)
  const heroTitle = document.querySelector('h1');
  if (heroTitle && window.innerWidth > 768) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    };
    
    setTimeout(typeWriter, 500);
  }
});

// Add pulse animation for tools
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
document.head.appendChild(style);
