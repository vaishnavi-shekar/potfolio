/* ==========================================================================
   PORTFOLIO INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAIWorkflow();
    initSkillFilters();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                iconOpen.classList.add('hidden');
                iconClose.classList.remove('hidden');
            }
        });

        // Close mobile drawer when clicking links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }
}

/* --------------------------------------------------------------------------
   2. INTERACTIVE AI WORKFLOW STEPPER
   -------------------------------------------------------------------------- */
const workflowData = {
    1: {
        title: "01. Problem Definition & Intent Mapping",
        owner: "Human Led",
        desc: "Synthesizing constraints, business goals, and primary user intents. Defining the structural metrics of success prior to automated exploration."
    },
    2: {
        title: "02. Contextual Research & Benchmarking",
        owner: "Human + AI Co-Op",
        desc: "Using LLM research tools (Perplexity, Claude) to aggregate competitor UI patterns, WCAG compliance checklists, and user task models."
    },
    3: {
        title: "03. Rapid AI Design & Layout Exploration",
        owner: "AI Accelerated",
        desc: "Generating multi-variate component ideas, typography pairing options, design tokens, and CSS layout grids dynamically."
    },
    4: {
        title: "04. Strategic Human Design Decisions",
        owner: "Human Decision",
        desc: "Applying aesthetic judgment, accessibility auditing, brand positioning, and empathy filters to select optimal concepts."
    },
    5: {
        title: "05. High-Fidelity Figma Prototyping",
        owner: "Human Crafted",
        desc: "Structuring auto-layout frames, interactive component variants, design tokens, and screen transitions inside Figma."
    },
    6: {
        title: "06. Front-End Code Implementation",
        owner: "AI-Assisted Code",
        desc: "Scaffolding semantic HTML, CSS utility tokens, and vanilla JS logic with AI pair programming for rapid deployment."
    },
    7: {
        title: "07. Accessibility Testing & Iteration",
        owner: "Human Validated",
        desc: "Validating contrast ratios, keyboard DOM navigation, mobile screen sizes, and performance score optimization."
    }
};

function initAIWorkflow() {
    const buttons = document.querySelectorAll('#workflow-selector .wf-btn');
    const stepNum = document.getElementById('wf-step-num');
    const owner = document.getElementById('wf-owner');
    const title = document.getElementById('wf-title');
    const desc = document.getElementById('wf-desc');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const step = btn.getAttribute('data-step');
            
            // Update active states
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Render dynamic data
            if (workflowData[step]) {
                stepNum.textContent = `STAGE 0${step} OF 07`;
                owner.textContent = workflowData[step].owner;
                title.textContent = workflowData[step].title;
                desc.textContent = workflowData[step].desc;
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. SKILLS CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initSkillFilters() {
    const tabs = document.querySelectorAll('#skills-tabs .skill-tab');
    const cards = document.querySelectorAll('#skills-grid .skill-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. CASE STUDY MODAL SYSTEM
   -------------------------------------------------------------------------- */
const caseStudies = {
    aura: {
        title: "AURA — Premium Culinary Experience",
        subtitle: "Self-Initiated Web & UI/UX Concept",
        overview: "AURA is an end-to-end web concept for high-end dining, solving friction in table reservations and digital menu interactions.",
        problem: "Traditional restaurant websites suffer from unoptimized PDF menus, poor mobile responsiveness, and high reservation drop-off rates.",
        objective: "Design and implement a responsive, accessible web experience featuring dynamic menu filtering and an intuitive 3-step reservation flow.",
        sections: [
            { heading: "01. Target Audience", text: "Modern urban diners requiring fast mobile reservations and accessible menu navigation." },
            { heading: "02. Design System", text: "Custom typography pairing, dark muted palette, and standardized spacing grids designed in Figma." },
            { heading: "03. Implementation", text: "Built using semantic HTML5, CSS Grid, and vanilla JS for fast performance and accessibility." }
        ]
    },
    pulse: {
        title: "PULSE AI — Workspace Dashboard",
        subtitle: "Self-Initiated SaaS UI Concept",
        overview: "PULSE AI aggregates project telemetry, task status, and automated team insights into a clean dashboard interface.",
        problem: "Complex SaaS dashboards overload users with visual noise, making high-priority metrics difficult to parse quickly.",
        objective: "Create a minimalist dashboard system with strong visual hierarchy, flexible card components, and clear status indicators.",
        sections: [
            { heading: "01. Information Architecture", text: "Deconstructed telemetry data into categorized primary, secondary, and tertiary visual cards." },
            { heading: "02. Design Tokens", text: "Engineered strict color and contrast tokens ensuring readable data charts under WCAG standard." }
        ]
    },
    redesign: {
        title: "Academic Portal Usability Redesign",
        subtitle: "Self-Initiated UX Case Study",
        overview: "A UX audit and redesign concept streamlining course registration, assignment tracking, and grade monitoring.",
        problem: "Legacy educational portals feature confusing navigation trees and lack responsive mobile views.",
        objective: "Re-architect navigation patterns to enable 1-click access to core daily student tasks.",
        sections: [
            { heading: "01. UX Research Insights", text: "Identified top 3 daily student tasks: viewing schedules, submitting work, and checking announcements." },
            { heading: "02. Outcome", text: "Streamlined navigation hierarchy reducing user click-depth by 40% in prototype tests." }
        ]
    }
};

function openCaseStudy(key) {
    const modal = document.getElementById('case-study-modal');
    const content = document.getElementById('modal-content');
    const data = caseStudies[key];

    if (!data || !modal || !content) return;

    let sectionsHTML = data.sections.map(s => `
        <div class="space-y-2 border-t border-surface-border pt-4">
            <h4 class="font-bold text-content-main text-base">${s.heading}</h4>
            <p class="text-content-muted text-sm leading-relaxed">${s.text}</p>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="space-y-2">
            <span class="badge">${data.subtitle}</span>
            <h3 class="text-3xl font-extrabold text-content-main">${data.title}</h3>
        </div>
        
        <div class="space-y-4">
            <h4 class="text-xs font-mono text-accent-primary uppercase tracking-wider">01 // Overview</h4>
            <p class="text-content-muted text-sm leading-relaxed">${data.overview}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 rounded-xl bg-surface-2 border border-surface-border space-y-2">
                <h4 class="font-bold text-content-main text-sm">The Problem</h4>
                <p class="text-content-muted text-xs leading-relaxed">${data.problem}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-2 border border-surface-border space-y-2">
                <h4 class="font-bold text-content-main text-sm">Project Goal</h4>
                <p class="text-content-muted text-xs leading-relaxed">${data.objective}</p>
            </div>
        </div>

        ${sectionsHTML}

        <div class="pt-6 border-t border-surface-border flex justify-end">
            <button onclick="closeCaseStudy()" class="btn-secondary text-sm">Close Case Study</button>
        </div>
    `;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
}

function closeCaseStudy() {
    const modal = document.getElementById('case-study-modal');
    if (!modal) return;
    
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}