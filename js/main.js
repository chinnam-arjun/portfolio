/* ==========================================================================
   Chinnam Mallikarjuna Rao - Premium Portfolio Script
   Interactive logic:
   Theme | Particles | Typing | Scroll | Filters | Counters
   Contact Form | Mobile Menu | Modals | GitHub
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initParticleBackground();
  initTypingEffect();
  initScrollAnimations();
  initSkillsFilter();
  initProjectsFilter();
  initCertificatesFilter();
  initCounterAnimations();
  initContactForm();
  initMobileMenu();
  initModals();
  initSmoothScroll();
  loadGitHubProfile();
});

/* ==========================================================================
   1. Theme Switcher
   ========================================================================== */

function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");

  if (!themeBtn) return;

  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";

  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("portfolio_theme", newTheme);

    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById("theme-toggle");

  if (!themeBtn) return;

  themeBtn.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';

  themeBtn.setAttribute(
    "aria-label",
    theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"
  );
}

/* ==========================================================================
   2. Hero Particle Background
   ========================================================================== */

function initParticleBackground() {
  const canvas = document.getElementById("hero-canvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  let width = 0;
  let height = 0;
  let animationFrame;

  const isMobile = window.innerWidth <= 768;

  const particleCount = isMobile
    ? 25
    : Math.min(Math.floor(window.innerWidth / 18), 55);

  const particles = [];

  function resizeCanvas() {
    const parent = canvas.parentElement;

    if (!parent) return;

    const rect = parent.getBoundingClientRect();

    width = canvas.width = Math.floor(rect.width);
    height = canvas.height = Math.floor(rect.height);
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;

      this.radius = Math.random() * 1.5 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x <= 0 || this.x >= width) {
        this.vx *= -1;
      }

      if (this.y <= 0 || this.y >= height) {
        this.vy *= -1;
      }
    }

    draw() {
      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "rgba(139, 92, 246, 0.55)";
      ctx.fill();
    }
  }

  resizeCanvas();

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      particle.update();
      particle.draw();

      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];

        const dx = particle.x - other.x;
        const dy = particle.y - other.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        const maxDistance = 120;

        if (distance < maxDistance) {
          ctx.beginPath();

          ctx.moveTo(
            particle.x,
            particle.y
          );

          ctx.lineTo(
            other.x,
            other.y
          );

          ctx.strokeStyle =
            `rgba(59, 130, 246, ${0.5 * (1 - distance / maxDistance)})`;

          ctx.lineWidth = 0.5;

          ctx.stroke();
        }
      }
    }

    animationFrame = requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);

  animate();

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(animationFrame);
  });
}

/* ==========================================================================
   3. Typing Effect
   ========================================================================== */

function initTypingEffect() {
  const target = document.getElementById("typing-text");

  if (!target) return;

  const roles = [
    "Full-Stack Developer",
    "MERN Stack Developer",
    "Java Developer",
    "Spring Boot Developer",
    "AI & RAG Enthusiast",
    "Cloud & DevOps Learner",
    "Problem Solver"
  ];

  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    target.textContent = roles[0];
    return;
  }

  function type() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      characterIndex++;

      target.textContent =
        currentRole.substring(0, characterIndex);
    } else {
      characterIndex--;

      target.textContent =
        currentRole.substring(0, characterIndex);
    }

    let speed = deleting ? 40 : 75;

    if (!deleting && characterIndex === currentRole.length) {
      speed = 1800;
      deleting = true;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;

      roleIndex =
        (roleIndex + 1) % roles.length;

      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   4. Scroll Animation + Active Navigation
   ========================================================================== */

function initScrollAnimations() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    ".nav-link"
  );

  if (!sections.length) return;

  const updateActiveNav = () => {
    const scrollPosition =
      window.scrollY + 150;

    let currentSection = "";

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  updateActiveNav();
}

/* ==========================================================================
   5. Skills Filter
   ========================================================================== */

function initSkillsFilter() {
  const buttons = document.querySelectorAll(
    ".skills-tabs .tab-btn"
  );

  const cards = document.querySelectorAll(
    ".skill-card"
  );

  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      const filter =
        button.dataset.filter;

      cards.forEach(card => {
        const matches =
          filter === "all" ||
          card.dataset.category === filter;

        card.style.display =
          matches ? "flex" : "none";
      });
    });
  });

  const skillSection =
    document.getElementById("skills");

  if (!skillSection) return;

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const fills =
            entry.target.querySelectorAll(
              ".progress-fill"
            );

          fills.forEach(fill => {
            const percent =
              fill.dataset.percent || 0;

            fill.style.width =
              `${percent}%`;
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

  observer.observe(skillSection);
}

/* ==========================================================================
   6. Projects Filter
   ========================================================================== */

function initProjectsFilter() {
  const buttons = document.querySelectorAll(
    "#projects .project-filters .tab-btn"
  );

  const cards = document.querySelectorAll(
    "#projects .project-card"
  );

  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      const filter =
        button.dataset.filter;

      cards.forEach(card => {
        const matches =
          filter === "all" ||
          card.dataset.category === filter;

        card.style.display =
          matches ? "flex" : "none";
      });
    });
  });
}

/* ==========================================================================
   7. Certificate Filter
   ========================================================================== */

function initCertificatesFilter() {
  const buttons =
    document.querySelectorAll(
      "[data-cert-filter]"
    );

  const cards =
    document.querySelectorAll(
      ".cert-card"
    );

  const headers =
    document.querySelectorAll(
      ".cert-domain-header"
    );

  if (!buttons.length || !cards.length) {
    return;
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      const filter =
        button.dataset.certFilter;

      cards.forEach(card => {
        const category =
          card.dataset.certCategory;

        const featured =
          card.dataset.certFeatured === "true";

        let visible = false;

        if (filter === "all") {
          visible = true;
        } else if (filter === "featured") {
          visible = featured;
        } else {
          visible =
            category === filter;
        }

        card.style.display =
          visible ? "flex" : "none";
      });

      headers.forEach(header => {
        const category =
          header.dataset.certDomain;

        if (
          filter === "all" ||
          filter === category
        ) {
          header.style.display = "flex";
        } else {
          header.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   8. Statistics Counter
   ========================================================================== */

function initCounterAnimations() {
  const counters =
    document.querySelectorAll(
      ".stat-number"
    );

  const section =
    document.getElementById(
      "achievements"
    );

  if (!counters.length || !section) {
    return;
  }

  let animated = false;

  const observer =
    new IntersectionObserver(
      entries => {
        if (
          !entries[0].isIntersecting ||
          animated
        ) {
          return;
        }

        animated = true;

        counters.forEach(counter => {
          const target =
            Number(counter.dataset.target);

          if (Number.isNaN(target)) return;

          animateCounter(counter, target);
        });

        observer.unobserve(section);
      },
      { threshold: 0.4 }
    );

  observer.observe(section);
}

function animateCounter(
  element,
  target
) {
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const progress =
      Math.min(
        (currentTime - startTime) /
          duration,
        1
      );

    const eased =
      1 - Math.pow(1 - progress, 3);

    const current =
      Math.floor(target * eased);

    element.textContent =
      current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent =
        target;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   9. Contact Form - Formspree
   ========================================================================== */

function initContactForm() {
  const form =
    document.getElementById(
      "contact-form"
    );

  const submitBtn =
    document.getElementById(
      "form-submit-btn"
    );

  const statusAlert =
    document.getElementById(
      "form-status-alert"
    );

  if (!form || !submitBtn) return;

  form.addEventListener(
    "submit",
    async event => {
      event.preventDefault();

      const name =
        document
          .getElementById("form-name")
          ?.value.trim();

      const email =
        document
          .getElementById("form-email")
          ?.value.trim();

      const subject =
        document
          .getElementById("form-subject")
          ?.value.trim();

      const message =
        document
          .getElementById("form-message")
          ?.value.trim();

      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {
        showFormStatus(
          "Please fill in all required fields.",
          "error"
        );

        return;
      }

      const originalButton =
        submitBtn.innerHTML;

      submitBtn.disabled = true;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        const formData =
          new FormData(form);

        const response =
          await fetch(
            form.action,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept:
                  "application/json"
              }
            }
          );

        if (!response.ok) {
          throw new Error(
            "Form submission failed."
          );
        }

        form.reset();

        showFormStatus(
          `Thank you, ${escapeHTML(name)}! Your message has been sent successfully. I'll get back to you soon.`,
          "success"
        );

        showToast(
          "Message sent successfully!",
          "success"
        );

      } catch (error) {
        console.error(
          "Contact form error:",
          error
        );

        showFormStatus(
          "Sorry, your message could not be sent right now. Please try again or contact me directly by email.",
          "error"
        );

        showToast(
          "Unable to send message.",
          "error"
        );

      } finally {
        submitBtn.disabled = false;

        submitBtn.innerHTML =
          originalButton;
      }
    }
  );

  function showFormStatus(
    message,
    type
  ) {
    if (!statusAlert) return;

    statusAlert.style.display = "block";

    statusAlert.setAttribute(
      "role",
      "alert"
    );

    if (type === "success") {
      statusAlert.style.background =
        "rgba(16, 185, 129, 0.12)";

      statusAlert.style.border =
        "1px solid rgba(16, 185, 129, 0.35)";

      statusAlert.style.color =
        "#10b981";

      statusAlert.innerHTML = `
        <strong>
          <i class="fas fa-check-circle"></i>
          Message Sent
        </strong>
        <br>
        ${message}
      `;
    } else {
      statusAlert.style.background =
        "rgba(239, 68, 68, 0.12)";

      statusAlert.style.border =
        "1px solid rgba(239, 68, 68, 0.35)";

      statusAlert.style.color =
        "#ef4444";

      statusAlert.innerHTML = `
        <strong>
          <i class="fas fa-exclamation-circle"></i>
          Message Not Sent
        </strong>
        <br>
        ${message}
      `;
    }
  }
}

/* ==========================================================================
   10. Toast Notification
   ========================================================================== */

function showToast(
  message,
  type = "success"
) {
  const container =
    document.getElementById(
      "toast-container"
    );

  if (!container) return;

  const toast =
    document.createElement("div");

  toast.className =
    `toast toast-${type}`;

  const icon =
    type === "success"
      ? "fa-check-circle"
      : "fa-exclamation-circle";

  toast.innerHTML = `
    <i class="fas ${icon}"
       aria-hidden="true"></i>

    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* ==========================================================================
   11. Mobile Navigation
   ========================================================================== */

function initMobileMenu() {
  const hamburger =
    document.getElementById(
      "hamburger"
    );

  const mobileMenu =
    document.getElementById(
      "mobile-menu"
    );

  if (!hamburger || !mobileMenu) {
    return;
  }

  hamburger.setAttribute(
    "aria-expanded",
    "false"
  );

  hamburger.addEventListener(
    "click",
    () => {
      const isOpen =
        mobileMenu.classList.toggle(
          "open"
        );

      hamburger.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      hamburger.classList.toggle(
        "active",
        isOpen
      );
    }
  );

  const links =
    mobileMenu.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener(
      "click",
      () => {
        mobileMenu.classList.remove(
          "open"
        );

        hamburger.classList.remove(
          "active"
        );

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    );
  });
}

/* ==========================================================================
   12. Modal System
   ========================================================================== */

function initModals() {
  const overlay =
    document.getElementById(
      "modal-overlay"
    );

  const body =
    document.getElementById(
      "modal-body"
    );

  const closeBtn =
    document.getElementById(
      "modal-close"
    );

  if (!overlay || !closeBtn) {
    return;
  }

  function closeModal() {
    overlay.classList.remove(
      "open"
    );

    document.body.style.overflow = "";

    if (body) {
      body.innerHTML = "";
    }
  }

  function openModal(content) {
    if (body) {
      body.innerHTML = content;
    }

    overlay.classList.add("open");

    document.body.style.overflow =
      "hidden";
  }

  closeBtn.addEventListener(
    "click",
    closeModal
  );

  overlay.addEventListener(
    "click",
    event => {
      if (
        event.target === overlay
      ) {
        closeModal();
      }
    }
  );

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape" &&
        overlay.classList.contains("open")
      ) {
        closeModal();
      }
    }
  );

  /*
   * Certificate modal
   *
   * This displays the actual certificate information.
   * It does NOT create fake verification claims.
   */

  window.openCertModal = function (
    title,
    issuer,
    date,
    description,
    imageSrc = null,
    verificationUrl = null
  ) {
    const imageHTML =
      imageSrc
        ? `
          <div class="certificate-preview">
            <img
              src="${escapeAttribute(imageSrc)}"
              alt="${escapeAttribute(title)} certificate"
              loading="lazy"
            >
          </div>
        `
        : "";

    const verifyButton =
      verificationUrl
        ? `
          <a
            href="${escapeAttribute(
              verificationUrl
            )}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-sm"
          >
            <i class="fas fa-external-link-alt"></i>
            Verify Certificate
          </a>
        `
        : "";

    const content = `
      <div class="certificate-modal">

        ${imageHTML}

        <div class="certificate-info">

          <span class="section-badge">
            <i class="fas fa-award"></i>
            Certificate
          </span>

          <h3>
            ${escapeHTML(title)}
          </h3>

          <p class="certificate-issuer">
            ${escapeHTML(issuer)}
          </p>

          <p class="certificate-date">
            Issued: ${escapeHTML(date)}
          </p>

          <div class="certificate-description">
            <strong>
              <i class="fas fa-info-circle"></i>
              Skills / Topics
            </strong>

            <p>
              ${escapeHTML(description)}
            </p>
          </div>

          <div class="certificate-actions">
            ${verifyButton}

            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onclick="document.getElementById('modal-close').click()"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    `;

    openModal(content);
  };
}

/* ==========================================================================
   13. Smooth Scroll + Back To Top
   ========================================================================== */

function initSmoothScroll() {
  const backToTop =
    document.getElementById(
      "back-to-top"
    );

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  anchorLinks.forEach(link => {
    link.addEventListener(
      "click",
      event => {
        const targetID =
          link.getAttribute("href");

        if (
          !targetID ||
          targetID === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetID
          );

        if (!target) return;

        event.preventDefault();

        const navbarHeight =
          document.querySelector(
            ".navbar"
          )?.offsetHeight || 0;

        const targetPosition =
          target.getBoundingClientRect()
            .top +
          window.scrollY -
          navbarHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    );
  });

  if (!backToTop) return;

  const toggleBackToTop = () => {
    backToTop.style.display =
      window.scrollY > 400
        ? "flex"
        : "none";
  };

  window.addEventListener(
    "scroll",
    toggleBackToTop,
    { passive: true }
  );

  toggleBackToTop();

  backToTop.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );
}

/* ==========================================================================
   14. GitHub Profile
   ========================================================================== */

const GITHUB_USERNAME =
  "chinnam-arjun";

async function loadGitHubProfile() {
  const profileURL =
    `https://api.github.com/users/${GITHUB_USERNAME}`;

  try {
    const response =
      await fetch(profileURL);

    if (!response.ok) {
      throw new Error(
        `GitHub API returned ${response.status}`
      );
    }

    const data =
      await response.json();

    updateElement(
      "github-repos",
      data.public_repos
    );

    updateElement(
      "github-followers",
      data.followers
    );

    updateElement(
      "github-following",
      data.following
    );

    if (data.created_at) {
      const year =
        new Date(
          data.created_at
        ).getFullYear();

      updateElement(
        "github-year",
        year
      );
    }

    const profileLink =
      document.getElementById(
        "github-profile-link"
      );

    if (profileLink) {
      profileLink.href =
        data.html_url;

      profileLink.target =
        "_blank";

      profileLink.rel =
        "noopener noreferrer";
    }

    const graph =
      document.getElementById(
        "github-contribution-graph"
      );

    if (graph) {
      graph.src =
        `https://ghchart.rshah.org/${GITHUB_USERNAME}`;

      graph.alt =
        `${GITHUB_USERNAME} GitHub contribution graph`;
    }

  } catch (error) {
    console.error(
      "GitHub profile loading failed:",
      error
    );

    [
      "github-repos",
      "github-followers",
      "github-following",
      "github-year"
    ].forEach(id => {
      updateElement(id, "—");
    });
  }
}

/* ==========================================================================
   15. Utility Functions
   ========================================================================== */

function updateElement(
  id,
  value
) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}