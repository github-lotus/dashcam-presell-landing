# VensoSmart Dashcam Landing Page

A high-converting single-page advertorial landing page for VensoSmart Dashcam promotion, designed for cold traffic acquisition and direct-response marketing.

## 🚗 Project Overview

This is a standalone HTML landing page that promotes a free VensoSmart Dashcam offer. The page is optimized for conversion with psychological triggers, social proof, and urgency elements.

## ✨ Key Features

- **Real-time countdown timer** that resets daily to create urgency
- **Dynamic stock counter** that decreases over time to show scarcity
- **Mobile-first responsive design** with sticky CTA bar
- **Interactive FAQ section** with accordion functionality
- **Animated elements** including pulse buttons and shine effects
- **Social proof elements** with testimonials and news logos

## 🏗️ Technical Architecture

### Single-File Application
- All HTML, CSS, and JavaScript contained in `index.html`
- Self-contained with CDN resources (Tailwind CSS, Google Fonts)
- No build process required - ready to deploy

### External Dependencies
- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **Google Fonts** - Inter and Oswald font families
- **External Images** - Unsplash URLs for testimonials and logos

### Performance Features
- Optimized images with WebP format
- CSS custom properties for consistent theming
- Minimal JavaScript for core functionality
- Mobile-optimized with sticky elements

## 🎯 Marketing Elements

### Conversion Optimization
- **Headline**: Brake-check fraud angle targeting driver safety concerns
- **Value Proposition**: $185.69 dashcam offered for free
- **Social Proof**: Customer testimonials and news outlet logos
- **Urgency**: Limited time countdown and stock scarcity
- **Trust Signals**: Money-back guarantee and secure checkout mentions

### Traffic Source Optimization
- Designed for **cold traffic** acquisition
- Direct-response copy in CTAs ("CLAIM FREE DASH CAM")
- Clear value proposition above the fold
- Multiple conversion points throughout the page

## 📁 Project Structure

```
dashcam/
├── index.html          # Main landing page (complete application)
├── images/             # Product and logo images
│   ├── dashcam.webp   # Main product image
│   ├── abcnews.png    # News outlet logos
│   ├── foxnews.png
│   └── newyorkpost.png
├── CLAUDE.md          # AI development guidelines
├── TASKLIST.md        # Project progress tracking
└── README.md          # This file
```

## 🚀 Quick Start

1. **Local Development**
   ```bash
   # Open the file directly in browser
   open index.html
   
   # Or serve with local server
   python -m http.server 8000
   ```

2. **Deploy to Web Server**
   - Upload `index.html` and `images/` folder to web server
   - Configure domain and SSL certificate
   - Set up tracking and analytics

## 🔧 Customization

### Brand Colors
Brand colors are defined as CSS custom properties in the `:root` selector:
```css
:root {
  --primary-color: #dc2626;
  --secondary-color: #1f2937;
  --accent-color: #fbbf24;
}
```

### CTA Configuration
All call-to-action buttons point to the same URL with tracking:
```javascript
const ctaUrl = "https://your-checkout-url.com?source=landing";
```

### Timer & Stock Settings
Countdown and stock logic can be modified in the JavaScript section:
```javascript
// Countdown resets daily at midnight
// Stock decreases based on time-based algorithm
```

## 📊 Performance Metrics

- **Page Load Speed**: Optimized for fast loading on mobile networks
- **Conversion Elements**: Multiple CTAs and urgency triggers
- **Mobile Optimization**: Responsive design with touch-friendly elements
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🔄 Version Control

This project follows structured Git workflow:
- **main**: Production-ready code
- **feature branches**: For new features or major updates
- **Commit standards**: Conventional commit format with clear descriptions

## 📈 Future Enhancements

- A/B testing framework for headline variations
- Advanced analytics integration
- Dynamic content personalization
- Multi-variant testing capabilities

## 📞 Support

For technical questions or customization requests, refer to the project documentation in `CLAUDE.md` or create an issue in this repository.

---

**VensoSmart Dashcam Landing Page** - Optimized for conversion and performance.