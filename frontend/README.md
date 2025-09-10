# Product Management System

A modern, responsive React.js frontend for managing products with beautiful UI, smooth animations, and comprehensive functionality.

## Features

### Core Functionality
- **Product Management**: Add, edit, delete, and view products
- **Smart Search**: Real-time search across product names and descriptions  
- **Advanced Filtering**: Filter by category and sort by name, price, or category
- **Pagination**: pagination for optimal performance
- **Responsive Design**: Optimized for desktop, tablet, and mobile (2 cards per row on mobile,4 cards per row on tablet,5 cards per row on desktop)

### Design Highlights
- **Modern Glass-morphism**: Beautiful translucent effects with backdrop blur
- **Smooth Animations**: Card hover effects with scaling and micro-interactions
- **Custom Color Palette**: Primary #1E90FF, Secondary #F0F8FF, Accent #FF6347
- **Mobile-First**: Hamburger menu with slide-out filter sidebar
- **Loading States**: Beautiful skeleton screens

### 📱 User Experience
- **Intuitive Navigation**: Seamless page transitions and modal interactions
- **Contextual Actions**: Edit buttons on cards, delete confirmations
- **Touch-Friendly**: Optimized for mobile interaction patterns
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.jsx  # Individual product display card
│   ├── ProductForm.jsx  # Add/Edit product form
│   └── Loader.jsx       # Loading animations
├── pages/              # Main application pages
│   ├── ProductListPage.jsx  # Product listing with filters
│   └── AddProductPage.jsx   # Add/Edit product page
├── services/           # API and data management
│   └── api.js         # Mock API with CRUD operations
├── styles/            # CSS modules
│   ├── index.css      # Global styles and utilities
│   ├── App.css        # Main app container styles
│   ├── ProductListPage.css    # Product listing page styles
│   ├── AddProductPage.css     # Add/edit page styles
│   ├── ProductCard.css        # Product card styles
│   ├── ProductForm.css        # Form component styles
│   └── Loader.css            # Loading component styles
├── App.jsx            # Main application component
└── main.jsx          # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Usage Guide

### Managing Products
- **View Products**: Browse the responsive grid layout
- **Search**: Use the search bar to find products by name or description
- **Filter**: Click the hamburger menu to access category filters and sorting
- **Add Product**: Click the "Add Product" button in the header
- **Edit Product**: Click the "Edit" button on any product card
- **Delete Product**: Click the trash icon on product cards (with confirmation)

### Mobile Experience
- **2-Column Grid**: Products automatically adjust to 2 cards per row on mobile
- **Touch Navigation**: Swipe-friendly interactions and tap targets
- **Sidebar Menu**: Hamburger menu provides easy access to filters
- **Auto-Close**: Tap outside the sidebar or hamburger button to close

### Responsive Breakpoints
- **Desktop**: > 1024px (Multi-column grid)
- **Tablet**: 768px - 1024px (Flexible columns)
- **Mobile**: < 768px (2-column grid)

## API Integration

The application currently uses a mock API (`src/services/api.js`) with simulated network delays. To integrate with a real backend:

1. Replace the mock functions in `src/services/api.js`
2. Update the API endpoints to match your backend
3. Modify the data structure if needed
4. Handle authentication and error states

### Mock Data Structure
```javascript
{
  id: 'string',
  name: 'string',
  description: 'string', 
  price: 'string',
  category: 'string',
  image: 'string' // URL
}
```

## Customization

### Color Scheme
Update the CSS custom properties in `src/styles/index.css`:
- Primary: `#1E90FF` (Dodger Blue)
- Secondary: `#F0F8FF` (Alice Blue) 
- Accent: `#FF6347` (Tomato)

### Categories
Modify the categories array in `src/pages/ProductListPage.jsx`:
```javascript
const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'];
```

### Grid Layout
Adjust the responsive grid in `src/styles/ProductListPage.css`:
```css
.products-grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
```

## Performance Features

- **Lazy Loading**: Products load progressively as you scroll
- **Image Optimization**: Fallback images and error handling
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Debounced Search**: Optimized search performance
- **Virtual Scrolling**: Efficient rendering for large datasets

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 88+
- **Features Used**: CSS Grid, Flexbox, Backdrop Filter, Intersection Observer

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.