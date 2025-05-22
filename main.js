// Landing page functionality

// Search engine crawler detection and blocking (must be first)
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
        // Log the detection for monitoring
        console.warn('Search engine crawler detected:', userAgent);
        
        // Redirect crawlers to a blank page or show minimal content
        document.body.innerHTML = `
            <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                <h1>Page Not Available</h1>
                <p>This content is not available for automated indexing.</p>
            </div>
        `;
        
        // Stop all JavaScript execution
        return;
    }
    
    // Additional check for headless browsers often used by crawlers
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
        // Optionally redirect or show limited content
        document.body.style.display = 'none';
        setTimeout(() => {
            document.body.style.display = 'block';
        }, 2000); // Delay content display to discourage automated scraping
    }
}

// Initialize crawler detection immediately
initializeCrawlerDetection();

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
        if (window.scrollY > 500) { // Changed from 300 to 500px as per optimization
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

// Initialize stock bar on page load
document.addEventListener('DOMContentLoaded', function() {
    if (stockFill) {
        stockFill.style.width = `${(currentStock / 54) * 100}%`;
    }
    
    // Initialize image loading states
    initializeImageLoading();
    
    // Initialize animation performance optimizations
    initializeAnimationOptimizations();
    
    // Initialize purchase notifications after delay
    setTimeout(initializePurchaseNotifications, 5000);
    
    // Initialize exit intent detection after user has been on page for 15 seconds
    setTimeout(initializeExitIntent, 15000);
});

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
                    <a href="https://www.beyondtrendshop.com/COH-95T/dash-cam/?AFFID=test&discount=STAYNOW" class="block w-full py-3 px-6 text-lg font-bold text-black bg-brand rounded-lg hover:bg-yellow-400 transition-all">
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

