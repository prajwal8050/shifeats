#!/usr/bin/env node

// This script creates SVG placeholder images for all food items and restaurants
const fs = require('fs');
const path = require('path');

const foodItems = {
    // Food Categories
    'biryani': { emoji: '🍛', bg: '#FFE5B4', color: '#8B4513' },
    'pizza': { emoji: '🍕', bg: '#FFE4E1', color: '#DC143C' },
    'burger': { emoji: '🍔', bg: '#FFF8DC', color: '#D2691E' },
    'chinese': { emoji: '🥡', bg: '#FFE4B5', color: '#FF6347' },
    'dosa': { emoji: '🥞', bg: '#FFFACD', color: '#DAA520' },
    'north-indian': { emoji: '🍛', bg: '#FFE4B5', color: '#FF8C00' },
    'ice-cream': { emoji: '🍦', bg: '#F0E68C', color: '#FF69B4' },
    'rolls': { emoji: '🌯', bg: '#FFDAB9', color: '#CD853F' },
    'cakes': { emoji: '🎂', bg: '#FFB6C1', color: '#FF1493' },
    'pasta': { emoji: '🍝', bg: '#FFEFD5', color: '#FF6347' },
    'sandwich': { emoji: '🥪', bg: '#F5DEB3', color: '#8B4513' },
    'south-indian': { emoji: '🫓', bg: '#FFFACD', color: '#B8860B' },

    // Restaurants
    'meghana': { emoji: '🍛', bg: '#FFE5B4', color: '#8B4513' },
    'kfc': { emoji: '🍗', bg: '#DC143C', color: '#FFFFFF' },
    'dominos': { emoji: '🍕', bg: '#0066CC', color: '#FFFFFF' },
    'mcdonalds': { emoji: '🍔', bg: '#FFCC00', color: '#DC143C' },
    'truffles': { emoji: '🍰', bg: '#8B4513', color: '#FFD700' },
    'empire': { emoji: '🍖', bg: '#8B0000', color: '#FFD700' },
    'burger-king': { emoji: '🍔', bg: '#EC1C24', color: '#FFFFFF' },
    'subway': { emoji: '🥪', bg: '#00853D', color: '#FFCC00' },
    'pizza-hut': { emoji: '🍕', bg: '#EE3124', color: '#FFFFFF' },
    'taco-bell': { emoji: '🌮', bg: '#702082', color: '#FFFFFF' },
    'wow-momo': { emoji: '🥟', bg: '#FF6B35', color: '#FFFFFF' },
    'behrouz': { emoji: '🍛', bg: '#8B4513', color: '#FFD700' },
    'faasos': { emoji: '🌯', bg: '#E63946', color: '#FFFFFF' },
    'baskin-robbins': { emoji: '🍦', bg: '#FF69B4', color: '#FFFFFF' },
    'starbucks': { emoji: '☕', bg: '#00704A', color: '#FFFFFF' },
    'bowl-company': { emoji: '🥗', bg: '#4CAF50', color: '#FFFFFF' }
};

function createSVG(name, data) {
    const displayName = name.replace(/-/g, ' ').toUpperCase();
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad-${name}">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(0,0,0,0.1);stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="300" height="300" fill="${data.bg}"/>
  <rect width="300" height="300" fill="url(#grad-${name})"/>
  
  <!-- Emoji -->
  <text x="150" y="150" font-size="150" text-anchor="middle" dominant-baseline="middle">${data.emoji}</text>
  
  <!-- Label -->
  <text x="150" y="255" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        text-anchor="middle" fill="${data.color}" 
        style="text-shadow: 0 2px 4px rgba(255,255,255,0.8);">${displayName}</text>
</svg>`;
}

// Create all images
Object.entries(foodItems).forEach(([name, data]) => {
    const svg = createSVG(name, data);
    fs.writeFileSync(`${name}.png`, svg);
    console.log(`Created ${name}.png`);
});

console.log('\nAll images created successfully!');
console.log('Note: These are SVG files saved as .png - browsers will render them correctly.');
