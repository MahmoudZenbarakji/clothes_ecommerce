// products.js

const products = [
    {
        id: 1,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: "2.500.000 syp",
        image: "../assets/images/Images (1).png" // Fixed: Added image path
    },
    {
        id: 2,
        name: "Leviosa",
        description: "Comfortable living room chair",
        price: "1.800.000 syp",
        image: "./assets/images/Images (2).png"
    },
    {
        id: 3,
        name: "Lolito",
        description: "Modern wooden desk",
        price: "3.200.000 syp",
        image: "./assets/images/Images (3).png"
    },
    {
        id: 4,
        name: "Respira",
        description: "Outdoor patio furniture",
        price: "2.100.000 syp",
        image: "./assets/images/Images (4).png"
    },
    {
        id: 5,
        name: "Grifo",
        description: "Elegant night lamp",
        price: "850.000 syp",
        image: "./assets/images/Images (5).png"
    },
    {
        id: 6,
        name: "Muggo",
        description: "Small ceramic cup set",
        price: "450.000 syp",
        image: "./assets/images/Images (6).png"
    }
];

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    
    // Check if container exists
    if (!productsContainer) {
        console.error('Products container not found!');
        return;
    }

    const dynamicProduct = (product) => {
        return `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-overlay">
                    <button class="quick-view-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                        Quick View
                    </button>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price}</p>
            </div>
        </div>
        `;
    }

    const renderProducts = () => {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = dynamicProduct(product);
            productsContainer.innerHTML += productCard;
        });
        
        // Add event listeners after rendering
        attachEventListeners();
    }

    const attachEventListeners = () => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                
                if (product) {
                    addToCart(product);
                }
            });
        });

        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                
                if (product) {
                    showQuickView(product);
                }
            });
        });
    }

    const addToCart = (product) => {
        // Visual feedback
        const button = document.querySelector(`[data-id="${product.id}"]`);
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 1500);
        
        console.log('Added to cart:', product.name);
    }

    const showQuickView = (product) => {
        // Create quick view modal
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-body">
                        <div class="modal-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="modal-info">
                            <h3>${product.name}</h3>
                            <p class="modal-description">${product.description}</p>
                            <div class="modal-price">${product.price}</div>
                            <button class="modal-add-to-cart" data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                document.body.removeChild(modal);
            }
        });

        // Add to cart from modal
        modal.querySelector('.modal-add-to-cart').addEventListener('click', () => {
            addToCart(product);
            document.body.removeChild(modal);
        });
    }

    // Initialize
    renderProducts();
});