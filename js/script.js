// ==========================================
// AFFILIATE URL CONFIGURATION
// ==========================================
// Paste your approved affiliate tracking URL here.
const AFFILIATE_URL = "https://get-derila-ergo.com/article/derila-ergo-neck-pain-pd?&vndr=evf&evf=1&uid=7194&offid=78&affiliate_id=2174&source_id=denp1&sub1=denp1&sub2=denp1&sub3=denp1&sub4=dembo&sub5=dembo";

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Set Affiliate Links
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.setAttribute('href', AFFILIATE_URL);
        btn.setAttribute('rel', 'sponsored nofollow noopener noreferrer');
        btn.setAttribute('target', '_blank');
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close all
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
            
            // Open clicked if it was closed
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 4. Outbound Click Tracking (GTM/DataLayer)
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'affiliate_cta_click',
                'cta_location': btn.getAttribute('data-location') || 'unknown'
            });
        });
    });

    // 5. AUTO-PLAY VIDEOS ON SCROLL (Intersection Observer)
    const videos = document.querySelectorAll('.video-container video');
    
    // Options for the observer: play when 50% of the video is visible
    const observerOptions = {
        threshold: 0.5
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is on screen, play it
                entry.target.play().catch(error => {
                    console.log("Autoplay prevented by browser:", error);
                });
            } else {
                // Video is off screen, pause it
                entry.target.pause();
            }
        });
    }, observerOptions);

    // Attach the observer to each video
    videos.forEach(video => {
        videoObserver.observe(video);
    });

});
