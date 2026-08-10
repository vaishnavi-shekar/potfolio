/* ==========================================================================
   VAISHNAVI SHEKAR - PORTFOLIO INTERACTION ENGINE
   Smooth reveals, tabs switcher, interactive workflow, and accessible modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. SCROLL REVEAL ANIMATIONS (IntersectionObserver) --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* --- 2. MOBILE NAVIGATION TOGGLE --- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* --- 3. DESIGN SYSTEM INTERACTIVE TABS --- */
  const dsTabs = document.querySelectorAll('.ds-tab');
  const dsPanels = document.querySelectorAll('.ds-panel');

  dsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.getAttribute('data-tab');

      // Update Tab active states
      dsTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update Panel visibility
      dsPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });


  /* --- 4. AI WORKFLOW INTERACTIVE NODES --- */
  const wfNodes = document.querySelectorAll('.wf-node');
  const detailDisplay = document.getElementById('node-detail-display');

  wfNodes.forEach(node => {
    const handleHover = () => {
      wfNodes.forEach(n => n.classList.remove('highlight'));
      node.classList.add('highlight');
      const infoText = node.getAttribute('data-info');
      if (detailDisplay && infoText) {
        detailDisplay.textContent = infoText;
      }
    };

    node.addEventListener('mouseenter', handleHover);
    node.addEventListener('click', handleHover);
  });


  /* --- 5. CASE STUDY MODAL ENGINE --- */
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modals = document.querySelectorAll('.modal');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);

      if (targetModal) {
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });
  });

  // Close Modal handlers
  modals.forEach(modal => {
    const closeElements = modal.querySelectorAll('[data-close]');

    closeElements.forEach(el => {
      el.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  });

  // Escape key listener for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
    }
  });


  /* --- 6. NAVBAR SCROLL BACKGROUND ELEVATION --- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

});