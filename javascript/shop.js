// shop.js - Shop page products functionality

const products = [
    {
        id: 1,
        name: "Modern Sofa Set",
        description: "Comfortable 3-seater sofa with premium fabric upholstery",
        price: "2,500,000 SYP",
        image: "assets/images/Images (1).png"
    },
    {
        id: 2,
        name: "Wooden Dining Table",
        description: "Solid oak dining table with 6 matching chairs",
        price: "3,200,000 SYP",
        image: "assets/images/Images (2).png"
    },
    {
        id: 3,
        name: "Office Desk",
        description: "Ergonomic office desk with storage compartments",
        price: "1,800,000 SYP",
        image: "assets/images/Images (3).png"
    },
    {
        id: 4,
        name: "Bedroom Wardrobe",
        description: "Large 4-door wardrobe with mirror panels",
        price: "4,500,000 SYP",
        image: "assets/images/Images (4).png"
    },
    {
        id: 5,
        name: "Coffee Table",
        description: "Modern glass coffee table with metal legs",
        price: "1,200,000 SYP",
        image: "assets/images/Images (5).png"
    },
    {
        id: 6,
        name: "Bookshelf Unit",
        description: "5-tier wooden bookshelf for home library",
        price: "950,000 SYP",
        image: "assets/images/Images (6).png"
    },
    {
        id: 7,
        name: "Dining Chairs Set",
        description: "Set of 4 modern dining chairs with upholstered seats",
        price: "1,500,000 SYP",
        image: "assets/images/Mask Group (1).png"
    },
    {
        id: 8,
        name: "Living Room Lamp",
        description: "Contemporary floor lamp with adjustable height",
        price: "650,000 SYP",
        image: "assets/images/Mask Group.png"
    },
    {
        id: 9,
        name: "Kitchen Cabinet",
        description: "Modern kitchen cabinet with soft-close doors",
        price: "2,800,000 SYP",
        image: "assets/images/Rectangle 25.png"
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const productSection = document.querySelector('.Product');
    
    if (!productSection) {
        console.error('Product section not found!');
        return;
    }

    // Create product grid container
    const productGrid = document.createElement('div');
    productGrid.className = 'product-grid';
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'product-section-header';
    sectionHeader.innerHTML = `
        <h2>Our Products</h2>
        <p>Discover our collection of premium furniture</p>
    `;
    
    // Add header to section
    productSection.appendChild(sectionHeader);
    
    // Create product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Add grid to section
    productSection.appendChild(productGrid);
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-overlay">
                <button class="quick-view-btn" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                    Quick View
                </button>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    <a href="./cart.html">Add to Cart</a>
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
        </div>
    `;
    
    return card;
}

// Add event listeners for product interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.quick-view-btn')) {
        const productId = e.target.closest('.quick-view-btn').getAttribute('data-id');
        const product = products.find(p => p.id == productId);
        if (product) {
            showQuickView(product);
        }
    }
    
    if (e.target.closest('.add-to-cart-btn')) {
        const productId = e.target.closest('.add-to-cart-btn').getAttribute('data-id');
        const product = products.find(p => p.id == productId);
        if (product) {
            addToCart(product);
        }
    }
});

function showQuickView(product) {
    // Redirect to product details page with product ID
    window.location.href = `product-details.html?id=${product.id}`;
}

function addToCart(product) {
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
