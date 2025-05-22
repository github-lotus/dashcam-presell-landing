// Landing page functionality

// Search engine crawler detection and blocking
function initializeCrawlerDetection() {
    const crawlerPatterns = [
        /googlebot/i,
        /bingbot/i,
        /slurp/i,
        /duckduckbot/i,
        /baiduspider/i,
        /yandexbot/i,
        /facebookexternalhit/i,
        /twitterbot/i,
        /linkedinbot/i,
        /pinterest/i,
        /whatsapp/i,
        /telegrambot/i,
        /applebot/i,
        /amazonbot/i
    ];
    
    const userAgent = navigator.userAgent;
    const isCrawler = crawlerPatterns.some(pattern => pattern.test(userAgent));
    
    if (isCrawler) {
        console.warn('Search engine crawler detected:', userAgent);
        // Hide content instead of destroying it
        document.body.style.visibility = 'hidden';
        return; // Exit early
    }
    
    // Additional check for headless browsers
    const isHeadless = (
        navigator.webdriver ||
        window.navigator.webdriver ||
        window.callPhantom ||
        window._phantom ||
        navigator.userAgent.indexOf('HeadlessChrome') !== -1 ||
        navigator.userAgent.indexOf('PhantomJS') !== -1
    );
    
    if (isHeadless) {
        console.warn('Headless browser detected');
        document.body.style.visibility = 'hidden';
    }
}

// TikTok Pixel Event Tracking for Dashcam Funnel

// Robust TikTok pixel loading check with retry mechanism
function waitForTikTokPixel(callback, maxAttempts = 20) {
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        if (typeof ttq !== 'undefined') {
            clearInterval(checkInterval);
            console.log('TikTok pixel loaded successfully after ' + attempts + ' attempts');
            callback();
        } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            console.error('TikTok pixel failed to load after ' + maxAttempts + ' attempts');
            // Still try to initialize in case pixel loads later
            callback();
        }
    }, 500); // Check every 500ms
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize TikTok tracking
    waitForTikTokPixel(initializeTikTokTracking);
    
    // Initialize crawler detection after delay
    setTimeout(initializeCrawlerDetection, 5000);
    
    // Initialize other features
    if (stockFill) {
        stockFill.style.width = `${(currentStock / 54) * 100}%`;
    }
    
    setupFAQAccordion();
    standardizeStockNumbers();
    initializeImageLoading();
    initializeAnimationOptimizations();
    
    // Initialize purchase notifications after delay
    setTimeout(initializePurchaseNotifications, 5000);
    
    // Initialize exit intent detection after user has been on page for 15 seconds
    setTimeout(initializeExitIntent, 15000);
});

function initializeTikTokTracking() {
    // Check if TikTok pixel is loaded
    if (typeof ttq === 'undefined') {
        console.warn('TikTok pixel not loaded - attempting delayed initialization');
        // Try again after 2 seconds
        setTimeout(() => {
            if (typeof ttq !== 'undefined') {
                initializeTikTokTracking();
            }
        }, 2000);
        return;
    }

    console.log('Initializing TikTok tracking...');
    
    try {
        // ViewContent is now fired in HTML, so we don't need it here
        
        // Identify anonymous user for better attribution
        identifyUser();
        
        // Set up all tracking
        setupCTATracking();
        setupEngagementTracking();
        
        console.log('TikTok tracking initialized successfully');
    } catch (error) {
        console.error('Error initializing TikTok tracking:', error);
    }
}

function setupCTATracking() {
    const baseUrl = 'https://www.dobf67dfstrk.com/2FMZLP/3RC4RS9/?uid=1497';
    const ctaButtons = document.querySelectorAll('a[href*="beyondtrendshop.com"], a[href*="dobf67dfstrk.com"], .pulse-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent immediate navigation
            console.log('CTA clicked');
            
            const finalUrl = buildAffiliateURL(baseUrl, index);
            
            // Track TikTok conversion
            if (typeof ttq !== 'undefined') {
                ttq.track('InitiateCheckout', {
                    "contents": [{
                        "content_id": "vensosmart-dashcam-2025", 
                        "content_type": "product", 
                        "content_name": "VensoSmart Dash Cam",
                        "quantity": 1,
                        "price": 0.00
                    }],
                    "value": 33,
                    "currency": "USD"
                }, {
                    "event_id": generateEventId('initiate_checkout')
                });
                
                // Navigate after a short delay to ensure tracking fires
                setTimeout(() => {
                    window.location.href = finalUrl;
                }, 300);
            } else {
                // If pixel not loaded, navigate immediately
                window.location.href = finalUrl;
            }
        });
    });
}

function buildAffiliateURL(baseUrl, ctaIndex) {
    const stored = JSON.parse(localStorage.getItem('url_params') || '{}');
    const current = Object.fromEntries(new URLSearchParams(window.location.search));
    const allParams = {...stored, ...current};
    
    const url = new URL(baseUrl);
    
    // Add SubIDs
    url.searchParams.set('sub1', allParams.sub1 || allParams.campaign_id || 'direct');
    url.searchParams.set('sub2', allParams.sub2 || allParams.adgroup_id || 'unknown');
    url.searchParams.set('sub3', allParams.sub3 || allParams.creative_id || `cta_${ctaIndex + 1}`);
    url.searchParams.set('sub4', allParams.sub4 || allParams.tt_clid || allParams.ttclid || `fallback_${Date.now()}`);
    url.searchParams.set('sub5', allParams.sub5 || `${getDeviceType()}_feed_${getEngagement()}`);
    
    // Add ALL UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(utm => {
        if (allParams[utm]) {
            url.searchParams.set(utm, allParams[utm]);
        }
    });
    
    // Add any additional parameters from TikTok
    ['campaign_name', 'creative_name', 'device_type', 'placement'].forEach(param => {
        if (allParams[param]) {
            url.searchParams.set(param, allParams[param]);
        }
    });
    
    return url.toString();
}

function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone/i.test(ua)) return 'mobile';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    return 'desktop';
}

function getEngagement() {
    const time = Math.round((Date.now() - window.performance.timing.navigationStart) / 1000);
    const scroll = Math.round((window.scrollY / document.body.scrollHeight) * 100);
    return `t${Math.min(time, 999)}_s${Math.min(scroll, 100)}`;
}

function setupEngagementTracking() {
    // Track 75% scroll depth for engaged users
    let scrollTracked = false;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (!scrollTracked && scrollPercent >= 75) {
            scrollTracked = true;
            
            if (typeof ttq !== 'undefined') {
                ttq.track('ViewContent', {
                    "contents": [{
                        "content_id": "engaged-user-75-scroll",
                        "content_type": "product",
                        "content_name": "75% Page Scroll Engagement"
                    }],
                    "value": 0,
                    "currency": "USD"
                }, {
                    "event_id": generateEventId('scroll_75')
                });
                
                console.log('75% scroll tracked');
            } else {
                console.warn('TikTok pixel not available for scroll tracking');
            }
        }
    });

    // Track FAQ interactions
    const faqItems = document.querySelectorAll('.faq-item details');
    faqItems.forEach((item, index) => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                const questionText = this.querySelector('summary').textContent.trim();
                
                if (typeof ttq !== 'undefined') {
                    ttq.track('Search', {
                        "contents": [{
                            "content_id": `faq-${index + 1}`,
                            "content_type": "product",
                            "content_name": "FAQ Interaction"
                        }],
                        "search_string": questionText.substring(0, 50), // Limit length
                        "value": 0,
                        "currency": "USD"
                    }, {
                        "event_id": generateEventId('faq_interaction')
                    });
                    
                    console.log('FAQ interaction tracked:', questionText.substring(0, 30));
                }
            }
        });
    });

    // Track time on page milestones
    setTimeout(() => {
        if (typeof ttq !== 'undefined') {
            ttq.track('ViewContent', {
                "contents": [{
                    "content_id": "time-milestone-30s",
                    "content_type": "product",
                    "content_name": "30 Second Page Engagement"
                }],
                "value": 0,
                "currency": "USD"
            }, {
                "event_id": generateEventId('time_30s')
            });
        }
    }, 30000);

    setTimeout(() => {
        if (typeof ttq !== 'undefined') {
            ttq.track('ViewContent', {
                "contents": [{
                    "content_id": "time-milestone-120s",
                    "content_type": "product",
                    "content_name": "2 Minute Page Engagement"
                }],
                "value": 0,
                "currency": "USD"
            }, {
                "event_id": generateEventId('time_120s')
            });
        }
    }, 120000);
}

// Utility functions for TikTok tracking
function generateEventId(eventType) {
    return `${eventType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getTikTokClickId() {
    // Extract TikTok click ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ttclid') || urlParams.get('tt_clid') || '';
}

function identifyUser() {
    if (typeof ttq === 'undefined') return;
    
    // Generate consistent external ID for anonymous users
    let externalId = localStorage.getItem('ttq_external_id');
    if (!externalId) {
        externalId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('ttq_external_id', externalId);
    }
    
    // Simple hash function for client-side hashing
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }
    
    ttq.identify({
        "external_id": simpleHash(externalId)
    });
    
    console.log('User identified with external_id');
}

// Track purchase notifications clicks
function trackPurchaseNotificationInteraction() {
    if (typeof ttq !== 'undefined') {
        ttq.track('ViewContent', {
            "contents": [{
                "content_id": "social-proof-interaction",
                "content_type": "product",
                "content_name": "Purchase Notification Interaction"
            }],
            "value": 0,
            "currency": "USD"
        }, {
            "event_id": generateEventId('social_proof')
        });
    }
}

console.log('TikTok tracking script loaded');

// Debug function to check TikTok pixel status
window.checkTikTokPixel = function() {
    console.log('=== TikTok Pixel Status Check ===');
    console.log('ttq defined:', typeof ttq !== 'undefined');
    if (typeof ttq !== 'undefined') {
        console.log('ttq object:', ttq);
        console.log('ttq methods:', Object.keys(ttq));
    }
    console.log('Crawler detection active:', document.body.style.visibility === 'hidden');
    console.log('================================');
};

// Register Service Worker for caching and offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Show sticky CTA on scroll
window.addEventListener('scroll', function() {
    const stickyCta = document.querySelector('.sticky-cta');
    if (stickyCta) {
        if (window.scrollY > 500) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }
});

// Countdown Timer
function updateCountdown() {
    try {
        const now = new Date();
        const hours = 23 - now.getHours();
        const minutes = 59 - now.getMinutes();
        const seconds = 59 - now.getSeconds();
        
        const countdownEl = document.querySelector('.countdown span');
        if (countdownEl) {
            countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    } catch (error) {
        console.warn('Countdown timer error:', error);
    }
}

// Initialize countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Stock counter with improved realism
let currentStock = 54;
const stockElements = document.querySelectorAll('#remaining-count, #remaining-count-2, #final-count');
const stockFill = document.querySelector('.stock-fill');

function updateStock() {
    try {
        // More realistic stock decrease - based on time of day and random factors
        const now = new Date();
        const hour = now.getHours();
        
        // Higher chance during peak hours (9-11am, 2-4pm, 7-9pm)
        let decreaseChance = 0.2;
        if ((hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21)) {
            decreaseChance = 0.4;
        }
        
        if (Math.random() < decreaseChance && currentStock > 1) {
            currentStock -= Math.random() < 0.8 ? 1 : 2; // Occasionally decrease by 2
            if (currentStock < 1) currentStock = 1; // Never go to 0
            
            stockElements.forEach(el => {
                if (el) el.textContent = currentStock;
            });
            
            if (stockFill) {
                stockFill.style.width = `${(currentStock / 54) * 100}%`;
            }
        }
    } catch (error) {
        console.warn('Stock counter error:', error);
    }
}

// Update stock every 25-35 seconds (randomized interval)
function startStockUpdates() {
    const randomInterval = 25000 + Math.random() * 10000; // 25-35 seconds
    setTimeout(() => {
        updateStock();
        startStockUpdates(); // Restart with new random interval
    }, randomInterval);
}

startStockUpdates();

// FAQ Accordion - Only one open at a time
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item details');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
}

// Standardize all stock numbers
function standardizeStockNumbers() {
    const stockElements = document.querySelectorAll('#remaining-count, #remaining-count-2, #final-count, .stock-display');
    stockElements.forEach(el => {
        if (el) el.textContent = '54';
    });
}

// Image loading state management
function initializeImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        const container = img.parentElement;
        if (container) {
            container.classList.add('image-loading');
            
            // Handle image load success
            img.addEventListener('load', function() {
                container.classList.add('loaded');
            });
            
            // Handle image load error
            img.addEventListener('error', function() {
                container.classList.add('loaded');
                console.warn('Failed to load image:', img.src);
            });
            
            // If image is already cached, mark as loaded
            if (img.complete && img.naturalHeight !== 0) {
                container.classList.add('loaded');
            }
        }
    });
}

// Animation performance optimizations
function initializeAnimationOptimizations() {
    // Only run if intersection observer is supported and user doesn't prefer reduced motion
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Pause animations when elements are not visible
    const animatedElements = document.querySelectorAll('.pulse-button, .marquee');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Pause animations on page visibility change
    document.addEventListener('visibilitychange', function() {
        const animationElements = document.querySelectorAll('.pulse-button, .marquee');
        animationElements.forEach(el => {
            if (document.hidden) {
                el.style.animationPlayState = 'paused';
            } else {
                el.style.animationPlayState = 'running';
            }
        });
    });
}

// Recent purchase notifications
function initializePurchaseNotifications() {
    const names = [
        { name: "Michael R.", location: "Austin, TX" },
        { name: "Sarah K.", location: "Phoenix, AZ" },
        { name: "David L.", location: "Atlanta, GA" },
        { name: "Jennifer M.", location: "Denver, CO" },
        { name: "Robert W.", location: "Seattle, WA" },
        { name: "Lisa P.", location: "Miami, FL" },
        { name: "James T.", location: "Chicago, IL" },
        { name: "Amanda S.", location: "Portland, OR" }
    ];
    
    let notificationCount = 0;
    const maxNotifications = 3; // Limit to avoid annoyance
    
    function showPurchaseNotification() {
        if (notificationCount >= maxNotifications) return;
        
        const randomCustomer = names[Math.floor(Math.random() * names.length)];
        const timeAgo = Math.floor(Math.random() * 30) + 5; // 5-35 minutes ago
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'purchase-notification fixed bottom-20 left-4 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg z-40 max-w-xs transform translate-x-[-100%] transition-transform duration-500';
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-black text-xs font-bold">
                    ${randomCustomer.name.charAt(0)}
                </div>
                <div class="flex-1 text-xs">
                    <p class="text-white font-medium">${randomCustomer.name} from ${randomCustomer.location}</p>
                    <p class="text-gray-400">Just claimed their FREE dash cam • ${timeAgo}m ago</p>
                </div>
                <button class="text-gray-500 hover:text-white text-lg leading-none" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translate-x-0';
        }, 100);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translate-x-[-100%]';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
        
        notificationCount++;
    }
    
    // Show first notification after 10-20 seconds
    setTimeout(showPurchaseNotification, 10000 + Math.random() * 10000);
    
    // Show subsequent notifications every 45-90 seconds
    setInterval(() => {
        if (notificationCount < maxNotifications && !document.hidden) {
            showPurchaseNotification();
        }
    }, 45000 + Math.random() * 45000);
}

// Exit intent detection
function initializeExitIntent() {
    let exitIntentShown = false;
    let mouseLeaveTimer;
    
    function showExitIntent() {
        if (exitIntentShown) return;
        exitIntentShown = true;
        
        // Create exit intent modal
        const modal = document.createElement('div');
        modal.className = 'exit-intent-modal fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full text-center transform scale-95 transition-transform duration-300">
                <div class="text-4xl mb-4">⚠️</div>
                <h3 class="text-2xl font-bold text-white mb-3">WAIT! Don't Leave Empty-Handed</h3>
                <p class="text-gray-300 mb-4">You're just one click away from protecting yourself from insurance fraud!</p>
                <div class="bg-accent/20 border border-accent/30 rounded-lg p-4 mb-4">
                    <p class="text-accent font-bold text-sm">🚨 SPECIAL EXIT OFFER</p>
                    <p class="text-white text-lg font-bold">Extra 20% OFF Shipping</p>
                    <p class="text-gray-400 text-sm">Use code: STAYNOW</p>
                </div>
                <div class="space-y-3">
                    <a href="https://www.dobf67dfstrk.com/2FMZLP/3RC4RS9/?uid=1497" class="block w-full py-3 px-6 text-lg font-bold text-black bg-brand rounded-lg hover:bg-yellow-400 transition-all">
                        💥 CLAIM WITH DISCOUNT NOW
                    </a>
                    <button onclick="this.closest('.exit-intent-modal').remove()" class="block w-full py-2 px-6 text-sm text-gray-400 hover:text-white transition-colors">
                        No thanks, I'll take my chances
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.querySelector('.bg-gray-900').style.transform = 'scale(1)';
        }, 100);
        
        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Track mouse movement for exit intent
    document.addEventListener('mouseleave', function(e) {
        // Only trigger if mouse leaves through the top
        if (e.clientY <= 0) {
            clearTimeout(mouseLeaveTimer);
            mouseLeaveTimer = setTimeout(() => {
                if (!exitIntentShown && !document.hidden) {
                    showExitIntent();
                }
            }, 100);
        }
    });
    
    // Alternative trigger after 60 seconds if no exit intent
    setTimeout(() => {
        if (!exitIntentShown && !document.hidden) {
            showExitIntent();
        }
    }, 60000);
}