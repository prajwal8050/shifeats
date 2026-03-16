// Backend Integration Config
let authToken = localStorage.getItem('token');
const API_BASE = window.location.origin + '/api';

// Food Categories Data (Keep static as it's UI/UX)
const foodCategories = [
    { name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029841/PC_Creative%20refresh/3D_bau/banners_new/Biryani.png' },
    { name: 'Pizza', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png' },
    { name: 'Burger', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png' },
    { name: 'Chinese', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png' },
    { name: 'Dosa', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png' },
    { name: 'North Indian', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png' },
    { name: 'Ice Cream', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029851/PC_Creative%20refresh/3D_bau/banners_new/Ice_Creams.png' },
    { name: 'Rolls', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png' },
    { name: 'Cakes', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png' },
    { name: 'South Indian', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png' }
];

let allRestaurants = [];
let topRestaurants = [];

async function fetchRestaurants() {
    try {
        const res = await fetch(`${API_BASE}/restaurants/all`);
        if (res.ok) {
            allRestaurants = await res.json();
            topRestaurants = allRestaurants.slice(0, 6);
            populateTopRestaurants();
            populateAllRestaurants();
            initScrollAnimations();
        }
    } catch (err) {
        console.error("Failed to fetch restaurants", err);
    }
}

function populateCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if(!categoriesGrid) return;
    categoriesGrid.innerHTML = '';
    foodCategories.forEach((category, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.style.animationDelay = `${index * 0.1}s`;
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name}</h3>
        `;
        categoriesGrid.appendChild(categoryCard);
    });
}

function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.onclick = () => showMenu(restaurant);
    card.innerHTML = `
        <div class="restaurant-image">
            <img src="${restaurant.image}" alt="${restaurant.name}" onerror="this.src='https://via.placeholder.com/280x180?text=${restaurant.name}'">
            ${restaurant.offer ? `<div class="offer-badge">${restaurant.offer}</div>` : ''}
        </div>
        <div class="restaurant-info">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <div class="restaurant-meta">
                <div class="rating">★ ${restaurant.rating}</div>
                <span class="delivery-time">• ${restaurant.deliveryTime}</span>
            </div>
            <p class="restaurant-cuisine">${restaurant.cuisine}</p>
            <p class="restaurant-location">${restaurant.location}</p>
        </div>
    `;
    return card;
}

function populateTopRestaurants() {
    const restaurantsGrid = document.getElementById('top-restaurants-grid');
    if(!restaurantsGrid) return;
    restaurantsGrid.innerHTML = '';
    topRestaurants.forEach(restaurant => {
        restaurantsGrid.appendChild(createRestaurantCard(restaurant));
    });
}

function populateAllRestaurants() {
    const restaurantsGrid = document.getElementById('all-restaurants-grid');
    if(!restaurantsGrid) return;
    restaurantsGrid.innerHTML = '';
    allRestaurants.forEach(restaurant => {
        restaurantsGrid.appendChild(createRestaurantCard(restaurant));
    });
}

function initSliders() {
    document.querySelectorAll('.categories-slider, .restaurants-slider').forEach(slider => {
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const grid = slider.querySelector('.categories-grid, .restaurants-grid');
        if (prevBtn && nextBtn && grid) {
            prevBtn.onclick = () => grid.scrollBy({ left: -300, behavior: 'smooth' });
            nextBtn.onclick = () => grid.scrollBy({ left: 300, behavior: 'smooth' });
        }
    });
}

// Global checkout variables
let openCheckout;

document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    fetchRestaurants();
    initSliders();
    initHeaderBackend();
});

// Menu Logic
async function showMenu(restaurant) {
    const modal = document.getElementById('menu-modal');
    const header = document.getElementById('menu-header');
    const container = document.getElementById('menu-items-container');

    header.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>${restaurant.cuisine} • ${restaurant.location}</p>
        <p><span class="rating">★ ${restaurant.rating}</span> • ${restaurant.deliveryTime}</p>
    `;

    container.innerHTML = '<p class="loading-text">Loading menu items...</p>';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    try {
        const res = await fetch(`${API_BASE}/restaurants/${restaurant.id}`);
        if (res.ok) {
            const data = await res.json();
            const items = data.menuItems || [];
            if (items.length === 0) {
                container.innerHTML = '<p>No items found for this restaurant.</p>';
            } else {
                container.innerHTML = '';
                items.forEach(item => {
                    const itemEl = document.createElement('div');
                    itemEl.className = 'menu-item';
                    itemEl.innerHTML = `
                        <div class="menu-item-info">
                            <h4 class="menu-item-name">${item.name}</h4>
                            <p class="menu-item-price">₹${item.price}</p>
                            <p class="menu-item-desc">${item.description}</p>
                        </div>
                        <div class="menu-item-image-wrapper">
                            <img src="${item.image}" class="menu-item-image" onerror="this.src='https://via.placeholder.com/120x120?text=${item.name}'">
                            <button class="add-item-btn" onclick="addToCart(${item.id})">ADD</button>
                        </div>
                    `;
                    container.appendChild(itemEl);
                });
            }
        }
    } catch (err) {
        container.innerHTML = '<p>Error loading menu.</p>';
    }

    const closeMenu = document.getElementById('close-menu');
    if(closeMenu) closeMenu.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    const viewCartBtn = document.getElementById('view-cart-btn');
    if(viewCartBtn) viewCartBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if(openCheckout) openCheckout();
    };
}

async function addToCart(menuItemId) {
    if (!authToken) {
        alert("Please Sign In to add items to cart!");
        const loginModal = document.getElementById('login-modal');
        if(loginModal) loginModal.style.display = 'block';
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ menuItemId: Number(menuItemId), quantity: 1 })
        });

        if (res.ok) {
            alert("Added to cart!");
            fetchCart();
        } else {
            const errData = await res.json();
            alert("Failed to add to cart: " + (errData.error || "Unknown error"));
        }
    } catch (err) {
        alert("Connection error: " + err.message);
    }
}

async function updateQty(cartItemId, newQty) {
    if(newQty < 0) return;
    try {
        const res = await fetch(`${API_BASE}/cart/update/${cartItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ quantity: newQty })
        });
        
        if(res.ok) {
            if(openCheckout) openCheckout();
            fetchCart(); 
        }
    } catch(err) {}
}

async function fetchCart() {
    if(!authToken) return;
    try {
        const res = await fetch(`${API_BASE}/cart`, {headers:{'Authorization':`Bearer ${authToken}`}});
        if(res.ok) {
            const cart = await res.json();
            let itemsCount = 0;
            if(cart.items) {
                cart.items.forEach(i => itemsCount += i.quantity);
            }
            const cartCountEl = document.querySelector('.cart-count');
            if(cartCountEl) cartCountEl.textContent = itemsCount;
        }
    } catch(err) {}
}

async function initHeaderBackend() {
    const signinLink = document.getElementById('signin-link');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const openModal = (modal) => {
        if(!modal) return;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if(!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if(signinLink) {
        signinLink.onclick = (e) => {
            e.preventDefault();
            if(authToken) {
                openProfile();
            } else {
                openModal(loginModal);
            }
        }
    }

    const profileModal = document.getElementById('profile-modal');
    const trackingModal = document.getElementById('tracking-modal');

    document.getElementById('close-login').onclick = () => closeModal(loginModal);
    document.getElementById('close-signup').onclick = () => closeModal(signupModal);
    document.getElementById('close-checkout').onclick = () => closeModal(checkoutModal);
    document.getElementById('close-profile').onclick = () => closeModal(profileModal);
    document.getElementById('close-tracking').onclick = () => closeModal(trackingModal);

    document.getElementById('switch-to-signup').onclick = (e) => {
        e.preventDefault(); closeModal(loginModal); openModal(signupModal);
    };
    document.getElementById('switch-to-login').onclick = (e) => {
        e.preventDefault(); closeModal(signupModal); openModal(loginModal);
    };

    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (res.ok) {
            const data = await res.json();
            authToken = data.token;
            localStorage.setItem('token', authToken);
            location.reload();
        } else alert("Login failed");
    };

    signupForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const res = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        if (res.ok) {
            alert("Signup successful!");
            closeModal(signupModal);
            openModal(loginModal);
        } else alert("Signup failed");
    };

    const cartLink = document.querySelector('.cart-link');
    if(cartLink) {
        cartLink.onclick = (e) => {
            e.preventDefault();
            if(!authToken) openModal(loginModal);
            else if(openCheckout) openCheckout();
        };
    }

    // Checkout Stepper Navigation
    document.getElementById('next-to-address').onclick = () => switchStep(2);
    document.getElementById('next-to-payment').onclick = () => {
        if(!document.getElementById('checkout-address').value.trim()) return alert("Enter address");
        switchStep(3);
    };
    document.getElementById('back-to-cart').onclick = () => switchStep(1);
    document.getElementById('back-to-address').onclick = () => switchStep(2);
    document.getElementById('place-order-btn').onclick = placeOrder;
    document.getElementById('close-success-btn').onclick = () => {
        closeModal(checkoutModal);
        location.reload();
    };
    document.getElementById('track-latest-order-btn').onclick = () => {
        const orderId = document.getElementById('track-latest-order-btn').getAttribute('data-order-id');
        closeModal(checkoutModal);
        openTracking(orderId);
    };

    openCheckout = async function() {
        switchStep(1);
        openModal(checkoutModal);
        await populateCheckoutCart();
    }

    function switchStep(step) {
        document.querySelectorAll('.checkout-step').forEach(s => s.style.display = 'none');
        document.getElementById(`checkout-step-${step}`).style.display = 'block';
        document.querySelectorAll('.checkout-stepper .step').forEach((s, idx) => {
            s.classList.toggle('active', idx + 1 === step);
        });
    }

    async function populateCheckoutCart() {
        const list = document.getElementById('checkout-items-list');
        const res = await fetch(`${API_BASE}/cart`, {headers:{'Authorization':`Bearer ${authToken}`}});
        if(res.ok) {
            const cart = await res.json();
            list.innerHTML = '';
            let subtotal = 0;
            (cart.items || []).forEach(item => {
                subtotal += item.menuItem.price * item.quantity;
                const div = document.createElement('div');
                div.className = 'checkout-item';
                div.innerHTML = `
                    <div class="checkout-item-info"><h4>${item.menuItem.name}</h4><p>₹${item.menuItem.price}</p></div>
                    <div class="checkout-item-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                `;
                list.appendChild(div);
            });
            document.getElementById('checkout-subtotal').textContent = `₹${subtotal}`;
            document.getElementById('checkout-total').textContent = `₹${subtotal + 30}`;
            document.getElementById('next-to-address').disabled = (cart.items || []).length === 0;
        }
    }

    async function placeOrder() {
        const address = document.getElementById('checkout-address').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const res = await fetch(`${API_BASE}/orders/place`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
            body: JSON.stringify({ address, paymentMethod })
        });
        if (res.ok) {
            const order = await res.json();
            document.getElementById('track-latest-order-btn').setAttribute('data-order-id', order.id);
            document.querySelectorAll('.checkout-step').forEach(s => s.style.display = 'none');
            document.getElementById('checkout-success').style.display = 'block';
            document.querySelector('.checkout-stepper').style.display = 'none';
        } else alert("Failed to place order");
    }

    async function openProfile() {
        openModal(profileModal);
        fetchOrders();
    }

    async function fetchOrders() {
        const list = document.getElementById('orders-list');
        list.innerHTML = '<p style="text-align:center; padding: 20px;">Loading your orders...</p>';
        
        try {
            const res = await fetch(`${API_BASE}/orders`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (res.ok) {
                const orders = await res.json();
                if (orders.length === 0) {
                    list.innerHTML = '<p style="text-align:center; padding: 20px;">No orders found.</p>';
                } else {
                    list.innerHTML = '';
                    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach(order => {
                        const div = document.createElement('div');
                        div.className = 'order-card';
                        div.style = 'border: 1px solid #eee; padding: 15px; margin-bottom: 10px; border-radius: 8px;';
                        div.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                <div>
                                    <h4 style="margin:0;">Order #${order.id}</h4>
                                    <small style="color: #686b78;">${new Date(order.createdAt).toLocaleString()}</small>
                                </div>
                                <span style="background: #eef; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; color: #60b246; font-weight: bold;">${order.status}</span>
                            </div>
                            <div style="border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div style="font-weight: bold; color: #3D4152;">Total: ₹${order.totalAmount}</div>
                                <button class="track-btn" onclick="openTracking(${order.id})" style="background: #FC8019; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Track Order</button>
                            </div>
                        `;
                        list.appendChild(div);
                    });
                }
            }
        } catch (err) {
            list.innerHTML = '<p>Failed to load orders.</p>';
        }
    }

    window.openTracking = (orderId) => {
        document.getElementById('track-order-id').textContent = orderId;
        openModal(trackingModal);
    };

    // Profile Tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById('profile-orders').style.display = target === 'orders' ? 'block' : 'none';
            document.getElementById('profile-account').style.display = target === 'account' ? 'block' : 'none';
        };
    });

    document.getElementById('logout-btn').onclick = () => {
        authToken = null;
        localStorage.removeItem('token');
        location.reload();
    };

    if (authToken) {
        document.querySelector('.cart-link').innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 3h2l3 12h8l3-9H6" stroke="#3D4152" stroke-width="2" fill="none"/></svg> Cart <span class="cart-count">0</span>';
        signinLink.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="6" r="3" fill="#3D4152"/><path d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#3D4152" stroke-width="2" fill="none"/></svg> Profile';
        
        const trackNav = document.getElementById('track-order-nav');
        if (trackNav) {
            trackNav.style.display = 'block';
            trackNav.onclick = (e) => {
                e.preventDefault();
                openProfile(); // This opens the profile where tracking links are available
            };
        }
        
        fetchCart();
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    document.querySelectorAll('.restaurant-card, .category-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
}
