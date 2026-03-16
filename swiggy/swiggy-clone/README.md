# Swiggy Clone - Complete Food Delivery Website

A pixel-perfect clone of Swiggy.com with modern design, animations, and full functionality.

## Features

✅ **Exact Swiggy Design**
- Orange (#FC8019) color scheme matching Swiggy's brand
- Modern, premium UI with smooth animations
- Responsive design for all devices
- Professional food photography placeholders

✅ **Header & Navigation**
- Sticky header with scroll effects
- Location selector with dropdown
- Search functionality
- Shopping cart with item counter
- Sign-in option

✅ **Hero Section**
- Animated delivery illustration
- Location search bar
- Popular cities quick links
- Gradient background with floating elements

✅ **Food Categories**
- 12+ food categories (Biryani, Pizza, Burger, Chinese, etc.)
- Horizontal slider with navigation buttons
- Hover animations and effects

✅ **Restaurant Listings**
- Top restaurant chains section
- All restaurants with filters
- Restaurant cards with:
  - Images
  - Ratings
  - Delivery time
  - Cuisine types
  - Location
  - Offer badges

✅ **Filters**
- Sort by options
- Fast Delivery
- Ratings 4.0+
- Pure Veg
- Price ranges
- Offers

✅ **Footer**
- Company information
- Contact links
- Legal pages
- City listings
- Social media icons
- App download buttons

## Technologies Used

- **HTML5** - Semantic markup with SEO optimization
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox
  - Custom properties (CSS variables)
  - Animations & transitions
  - Responsive design
  - Glassmorphism effects
- **JavaScript (Vanilla)** - No frameworks, pure JS:
  - Dynamic content rendering
  - Slider functionality
  - Filter system
  - Search functionality
  - Cart management
  - Scroll animations
  - Intersection Observer API

## File Structure

```
swiggy-clone/
├── index.html              # Main HTML file
├── styles.css              # Complete styling
├── script.js               # All JavaScript functionality
├── hero-image.png          # Hero section illustration
├── generate-images.html    # Tool to generate food images
├── google-play.png         # Google Play badge
├── app-store.png           # App Store badge
└── README.md               # This file
```

## How to Run

1. **Simple Method** - Just open `index.html` in your browser:
   ```bash
   open index.html
   ```

2. **With Local Server** (Recommended):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

3. **Generate Food Images**:
   - Open `generate-images.html` in your browser
   - Click "Download" on each image
   - Save them in the same folder as index.html

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-orange: #FC8019;
    --dark-text: #02060C;
    --light-text: #686B78;
    --border-color: #D4D5D9;
    --bg-light: #F0F0F5;
}
```

### Restaurant Data
Edit the arrays in `script.js`:
- `foodCategories` - Add/remove food categories
- `topRestaurants` - Modify top restaurant list
- `allRestaurants` - Update all restaurants

### Images
Replace placeholder images with real photos:
- Food categories: 120x120px
- Restaurant images: 280x180px
- Hero image: 600x600px

## Features Breakdown

### Interactive Elements
- ✅ Hover effects on all clickable items
- ✅ Smooth scroll animations
- ✅ Dynamic cart counter
- ✅ Filter toggle system
- ✅ Horizontal sliders with buttons
- ✅ Location search
- ✅ Responsive navigation

### Animations
- ✅ Fade-in on scroll
- ✅ Floating hero image
- ✅ Pulse effect on cart
- ✅ Scale on hover
- ✅ Smooth transitions
- ✅ Loading shimmer effect

### Responsive Design
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Performance

- Optimized CSS with minimal reflows
- Efficient JavaScript with event delegation
- Lazy loading ready
- No external dependencies
- Fast load times

## SEO Optimized

- ✅ Semantic HTML5 elements
- ✅ Meta tags for description
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Descriptive link text

## Future Enhancements

- [ ] Add backend integration
- [ ] User authentication
- [ ] Real-time order tracking
- [ ] Payment gateway
- [ ] Restaurant menu pages
- [ ] Reviews and ratings system
- [ ] Location-based filtering
- [ ] Dark mode toggle

## Credits

Design inspired by Swiggy.com
Created as a learning project to demonstrate modern web development skills.

## License

This is a educational project. All rights to the Swiggy brand belong to Swiggy.

---

**Note**: This is a front-end clone for educational purposes. For actual food delivery, please visit the official Swiggy website.
