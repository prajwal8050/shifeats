#!/bin/bash

# Create placeholder images using SVG

create_image() {
    local name=$1
    local emoji=$2
    local bg=$3
    local color=$4
    local display_name=$(echo $name | tr '-' ' ' | tr '[:lower:]' '[:upper:]')
    
    cat > "${name}.png" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad-${name}">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(0,0,0,0.1);stop-opacity:1" />
    </radialGradient>
  </defs>
  <rect width="300" height="300" fill="${bg}"/>
  <rect width="300" height="300" fill="url(#grad-${name})"/>
  <text x="150" y="150" font-size="150" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <text x="150" y="255" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        text-anchor="middle" fill="${color}" 
        style="text-shadow: 0 2px 4px rgba(255,255,255,0.8);">${display_name}</text>
</svg>
EOF
    echo "Created ${name}.png"
}

# Food Categories
create_image "biryani" "🍛" "#FFE5B4" "#8B4513"
create_image "pizza" "🍕" "#FFE4E1" "#DC143C"
create_image "burger" "🍔" "#FFF8DC" "#D2691E"
create_image "chinese" "🥡" "#FFE4B5" "#FF6347"
create_image "dosa" "🥞" "#FFFACD" "#DAA520"
create_image "north-indian" "🍛" "#FFE4B5" "#FF8C00"
create_image "ice-cream" "🍦" "#F0E68C" "#FF69B4"
create_image "rolls" "🌯" "#FFDAB9" "#CD853F"
create_image "cakes" "🎂" "#FFB6C1" "#FF1493"
create_image "pasta" "🍝" "#FFEFD5" "#FF6347"
create_image "sandwich" "🥪" "#F5DEB3" "#8B4513"
create_image "south-indian" "🫓" "#FFFACD" "#B8860B"

# Restaurants
create_image "meghana" "🍛" "#FFE5B4" "#8B4513"
create_image "kfc" "🍗" "#DC143C" "#FFFFFF"
create_image "dominos" "🍕" "#0066CC" "#FFFFFF"
create_image "mcdonalds" "🍔" "#FFCC00" "#DC143C"
create_image "truffles" "🍰" "#8B4513" "#FFD700"
create_image "empire" "🍖" "#8B0000" "#FFD700"
create_image "burger-king" "🍔" "#EC1C24" "#FFFFFF"
create_image "subway" "🥪" "#00853D" "#FFCC00"
create_image "pizza-hut" "🍕" "#EE3124" "#FFFFFF"
create_image "taco-bell" "🌮" "#702082" "#FFFFFF"
create_image "wow-momo" "🥟" "#FF6B35" "#FFFFFF"
create_image "behrouz" "🍛" "#8B4513" "#FFD700"
create_image "faasos" "🌯" "#E63946" "#FFFFFF"
create_image "baskin-robbins" "🍦" "#FF69B4" "#FFFFFF"
create_image "starbucks" "☕" "#00704A" "#FFFFFF"
create_image "bowl-company" "🥗" "#4CAF50" "#FFFFFF"

echo ""
echo "All images created successfully!"
echo "Note: These are SVG files with .png extension - browsers will render them correctly."
