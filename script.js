document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#0A0D12';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }

  /* ==========================================================================
     CASE STUDY MODAL CONTROLLER
     ========================================================================== */
  const openModalBtns = document.querySelectorAll('.open-case-study');
  const closeModalBtns = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking outside content box
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  /* ==========================================================================
     HERO STAGE MOUSE PARALLAX / MICRO-INTERACTION
     ========================================================================== */
  const heroStage = document.querySelector('.hero-visual-stage');
  const heroCards = document.querySelectorAll('.hero-card');

  if (heroStage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      heroCards.forEach((card) => {
        const speed = card.getAttribute('data-speed') || 0.03;
        card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });

    heroStage.addEventListener('mouseleave', () => {
      heroCards.forEach((card) => {
        card.style.transform = `translate(0px, 0px)`;
      });
    });
  }

  /* ==========================================================================
     INTERACTIVE AI NODE HIGHLIGHTS
     ========================================================================== */
  const aiBranchCards = document.querySelectorAll('.ai-branch-card');
  const aiCenterNode = document.querySelector('.ai-center-node');

  aiBranchCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (aiCenterNode) {
        aiCenterNode.style.boxShadow = '0 0 25px #00E699';
        aiCenterNode.style.transform = 'scale(1.05)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (aiCenterNode) {
        aiCenterNode.style.boxShadow = 'none';
        aiCenterNode.style.transform = 'scale(1)';
      }
    });
  });

});