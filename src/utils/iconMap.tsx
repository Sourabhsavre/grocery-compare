import React from 'react';
import { 
  Wheat, 
  Leaf, 
  Droplet, 
  Beef, 
  Flame, 
  Milk, 
  Cookie, 
  Coffee, 
  Sparkles, 
  Bath, 
  Carrot, 
  Apple, 
  Baby,
  Package,
  ShoppingBag,
  Store
} from 'lucide-react';

export const getIconForEmoji = (emoji: string, size = 24, className = "") => {
  const props = { size, className, strokeWidth: 1.5 };
  
  switch (emoji) {
    case '🌾': return <Wheat {...props} />;
    case '🫘': return <Leaf {...props} />;
    case '🫙': return <Droplet {...props} />;
    case '🧈': return <Beef {...props} />; // Placeholder for Ghee/Butter
    case '🌶️': return <Flame {...props} />;
    case '🥛': return <Milk {...props} />;
    case '🍿': return <Cookie {...props} />;
    case '☕': return <Coffee {...props} />;
    case '🧼': return <Sparkles {...props} />;
    case '🧴': return <Bath {...props} />;
    case '🍅': return <Carrot {...props} />;
    case '🍎': return <Apple {...props} />;
    case '👶': return <Baby {...props} />;
    default: return <Package {...props} />;
  }
};

export const getIconForCategory = (category: string, size = 24, className = "") => {
  const props = { size, className, strokeWidth: 1.5 };
  
  switch (category) {
    case 'Staples': return <Wheat {...props} />;
    case 'Dal': return <Leaf {...props} />;
    case 'Oils': return <Droplet {...props} />;
    case 'Ghee': return <Beef {...props} />;
    case 'Spices': return <Flame {...props} />;
    case 'Dairy': return <Milk {...props} />;
    case 'Snacks': return <Cookie {...props} />;
    case 'Beverages': return <Coffee {...props} />;
    case 'Cleaning': return <Sparkles {...props} />;
    case 'Personal Care': return <Bath {...props} />;
    case 'Vegetables': return <Carrot {...props} />;
    case 'Fruits': return <Apple {...props} />;
    case 'Baby': return <Baby {...props} />;
    default: return <ShoppingBag {...props} />;
  }
};

export const getStoreIcon = (store: string, size = 16, className = "") => {
  const props = { size, className, strokeWidth: 2 };
  // A generic store icon, we can use Store or ShoppingBag for platforms
  return <Store {...props} />;
};
