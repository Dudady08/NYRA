// script.js

// Initialize Lucide icons
lucide.createIcons();


// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
});

// Sustainability Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.value);
            const duration = 2000;
            const start = Date.now();

            const tick = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

                el.textContent = Math.floor(target * eased).toLocaleString('pt-BR');

                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target.toLocaleString('pt-BR');
                }
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.sustainability-counter').forEach(el => {
    counterObserver.observe(el);
});

// Mock Vitrine Data and Rendering
const mockProducts = {
    new: [
        {
            id: 'p1', name: "Camiseta Essencial", price: 299.00, subcategory: "T-Shirts", is_new: true,
            images: [
                "https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png",
                "https://media.base44.com/images/public/6a6110c7082124fafbd842f3/73727361c_generated_18ba60f1.png"
            ]
        },
        {
            id: 'p2', name: "Calça Comfort", price: 599.00, subcategory: "Calças", is_new: true,
            images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/02557dadd_generated_eb5a4ca2.png"]
        },
        {
            id: 'p3', name: "Jaqueta Eco", price: 1299.00, subcategory: "Casacos", is_new: true,
            images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png"]
        }
    ],
    bestsellers: [
        {
            id: 'p5', name: "T-Shirt Minimal", price: 259.00, subcategory: "T-Shirts", is_new: false,
            images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/02557dadd_generated_eb5a4ca2.png"]
        },
        {
            id: 'p6', name: "Bermuda Linho", price: 399.00, subcategory: "Bermudas", is_new: false,
            images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png"]
        },
        {
            id: 'e1', name: "Ecobag Lona Orgânica", price: 129.00, subcategory: "Ecobags", is_new: true,
            images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png"]
        }
    ]
};

function renderVitrines() {
    const vitrineNew = document.getElementById('vitrine-new');
    const vitrineBestsellers = document.getElementById('vitrine-bestsellers');

    function createProductHTML(product) {
        return `
            <a href="produto.html?id=${product.id}" class="product-card group">
                <div class="product-image-container">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                    ${product.images[1] ? `<img src="${product.images[1]}" alt="" class="product-image-hover">` : ''}
                    ${product.is_new ? `<span class="badge-new">Novo</span>` : ''}
                </div>
                <div class="product-info">
                    ${product.subcategory ? `<p class="product-subcategory">${product.subcategory}</p>` : ''}
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
            </a>
        `;
    }

    if (vitrineNew) {
        vitrineNew.innerHTML = mockProducts.new.map((p, i) => `
            <div class="scroll-reveal" data-delay="${(i % 3) * 100}">
                ${createProductHTML(p)}
            </div>
        `).join('');
    }

    if (vitrineBestsellers) {
        vitrineBestsellers.innerHTML = mockProducts.bestsellers.map((p, i) => `
            <div class="scroll-reveal" data-delay="${(i % 3) * 100}">
                ${createProductHTML(p)}
            </div>
        `).join('');
    }

    // Re-observe injected scroll reveals
    document.querySelectorAll('#vitrine-new .scroll-reveal, #vitrine-bestsellers .scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Re-initialize Lucide icons for injected HTML
    lucide.createIcons();
}

// Render vitrines on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderVitrines();
    initCategoryPage();
    initProduto();
});

// Category Page Logic
function initCategoryPage() {
    const categoryProductsContainer = document.getElementById('category-products');
    if (!categoryProductsContainer) return;

    const category = document.body.dataset.category || 'camisetas';
    
    let mockCategoryProducts = [];
    let subcategories = [];

    if (category === 'camisetas') {
        mockCategoryProducts = [
            { id: 'c1', name: 'Camiseta Cropped Eco', price: 199.00, subcategory: 'Cropped', is_new: true, sizes: ['P', 'M'], colors: ['Preto', 'Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/0dc8bc96a_generated_6b7a9fbe.png'] },
            { id: 'c2', name: 'T-Shirt Manga Curta', price: 259.00, subcategory: 'Manga Curta', is_new: false, sizes: ['M', 'G'], colors: ['Branco', 'Cinza'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png'] },
            { id: 'c3', name: 'Oversized Premium', price: 299.00, subcategory: 'Oversized', is_new: true, sizes: ['G'], colors: ['Preto', 'Verde'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/73727361c_generated_18ba60f1.png'] },
            { id: 'c4', name: 'Cropped Minimal', price: 189.00, subcategory: 'Cropped', is_new: false, sizes: ['P'], colors: ['Bege', 'Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/02557dadd_generated_eb5a4ca2.png'] },
            { id: 'c5', name: 'T-Shirt Básica', price: 159.00, subcategory: 'Manga Curta', is_new: false, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Cinza'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/0dc8bc96a_generated_6b7a9fbe.png'] },
            { id: 'c6', name: 'Oversized Street', price: 349.00, subcategory: 'Oversized', is_new: true, sizes: ['M'], colors: ['Verde', 'Bege'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png'] }
        ];
        subcategories = ['Cropped', 'Manga Curta', 'Oversized'];
    // CANECAS REMOVIDAS — não vendíveis
    // } else if (category === 'canecas') { ... }
    } else if (category === 'ecobags') {
        mockCategoryProducts = [
            { id: 'e1', name: 'Ecobag Lona Orgânica', price: 129.00, subcategory: 'Alça Longa', is_new: true, sizes: ['Único'], colors: ['Bege'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png'] },
            { id: 'e2', name: 'Tote Bag Estruturada', price: 189.00, subcategory: 'Tote', is_new: false, sizes: ['Único'], colors: ['Preto', 'Bege'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png'] },
            { id: 'e3', name: 'Ecobag Mercado', price: 99.00, subcategory: 'Alça Curta', is_new: true, sizes: ['Único'], colors: ['Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png'] }
        ];
        subcategories = ['Alça Longa', 'Alça Curta', 'Tote'];
    } else if (category === 'moletons-casacos') {
        // MOLETONS OCULTOS TEMPORARIAMENTE — indisponíveis para venda
        // Para reativar: descomentar os produtos abaixo e a linha de subcategories
        mockCategoryProducts = [];
        subcategories = [];
        // mockCategoryProducts = [
        //     { id: 'm1', name: 'Moletom Heavyweight', ... },
        //     { id: 'm2', name: 'Casaco Estruturado', ... },
        //     { id: 'm3', name: 'Hoodie Oversized', ... }
        // ];
        // subcategories = ['Moletom', 'Casaco', 'Oversized'];
    }

    let currentFilterSub = '';
    let currentFilterSize = '';
    let currentFilterColor = '';
    let currentMaxPrice = 1000;

    const allSizes = [...new Set(mockCategoryProducts.flatMap(p => p.sizes || []))];
    const allColors = [...new Set(mockCategoryProducts.flatMap(p => p.colors || []))];

    function renderFilters() {
        const filtersContainer = document.getElementById('filters-container');
        if (!filtersContainer) return;

        const hasActiveFilters = currentFilterSub || currentFilterSize || currentFilterColor || currentMaxPrice < 1000;

        filtersContainer.innerHTML = `
            <div class="filter-group">
                <p class="filter-group-title">Estilo</p>
                <div class="filter-buttons">
                    <button class="filter-btn ${currentFilterSub === '' ? 'active' : ''}" data-filter-sub="">Todos</button>
                    ${subcategories.map(s => `<button class="filter-btn ${currentFilterSub === s ? 'active' : ''}" data-filter-sub="${s}">${s}</button>`).join('')}
                </div>
            </div>
            
            <div class="filter-group">
                <p class="filter-group-title">Tamanho</p>
                <div class="filter-buttons">
                    <button class="filter-btn ${currentFilterSize === '' ? 'active' : ''}" data-filter-size="">Todos</button>
                    ${allSizes.map(s => `<button class="filter-btn ${currentFilterSize === s ? 'active' : ''}" data-filter-size="${s}">${s}</button>`).join('')}
                </div>
            </div>

            <div class="filter-group">
                <p class="filter-group-title">Cor</p>
                <div class="filter-buttons">
                    <button class="filter-btn ${currentFilterColor === '' ? 'active' : ''}" data-filter-color="">Todas</button>
                    ${allColors.map(c => `<button class="filter-btn ${currentFilterColor === c ? 'active' : ''}" data-filter-color="${c}">${c}</button>`).join('')}
                </div>
            </div>

            <div class="filter-group">
                <p class="filter-group-title" id="price-label">Preço máx: R$ ${currentMaxPrice}</p>
                <input type="range" min="0" max="1000" step="50" value="${currentMaxPrice}" class="price-input" id="price-input">
                <div class="price-labels">
                    <span>R$ 0</span>
                    <span>R$ 1000</span>
                </div>
            </div>

            ${hasActiveFilters ? `<button class="clear-filters-btn" id="clear-filters">Limpar filtros</button>` : ''}
        `;

        // Add event listeners directly to the new buttons
        document.querySelectorAll('[data-filter-sub]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentFilterSub = e.target.dataset.filterSub;
                updateCategoryView();
            });
        });

        document.querySelectorAll('[data-filter-size]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentFilterSize = e.target.dataset.filterSize;
                updateCategoryView();
            });
        });

        document.querySelectorAll('[data-filter-color]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentFilterColor = e.target.dataset.filterColor;
                updateCategoryView();
            });
        });

        const priceInput = document.getElementById('price-input');
        if (priceInput) {
            priceInput.addEventListener('input', (e) => {
                currentMaxPrice = Number(e.target.value);
                document.getElementById('price-label').textContent = `Preço máx: R$ ${currentMaxPrice}`;
            });
            priceInput.addEventListener('change', () => {
                updateCategoryView();
            });
        }

        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                currentFilterSub = '';
                currentFilterSize = '';
                currentFilterColor = '';
                currentMaxPrice = 1000;
                updateCategoryView();
            });
        }
    }

    function createProductHTML(product) {
        return `
            <a href="produto.html?id=${product.id}" class="product-card group">
                <div class="product-image-container">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                    ${product.images[1] ? `<img src="${product.images[1]}" alt="" class="product-image-hover">` : ''}
                    ${product.is_new ? `<span class="badge-new">Novo</span>` : ''}
                </div>
                <div class="product-info">
                    ${product.subcategory ? `<p class="product-subcategory">${product.subcategory}</p>` : ''}
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
            </a>
        `;
    }

    function updateCategoryView() {
        renderFilters();
        
        const filtered = mockCategoryProducts.filter(p => {
            if (currentFilterSub && p.subcategory !== currentFilterSub) return false;
            if (currentFilterSize && !(p.sizes || []).includes(currentFilterSize)) return false;
            if (currentFilterColor && !(p.colors || []).includes(currentFilterColor)) return false;
            if (p.price > currentMaxPrice) return false;
            return true;
        });

        if (filtered.length === 0) {
            categoryProductsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 0; color: var(--muted-foreground);">
                    Nenhuma peça encontrada com esses filtros.
                </div>
            `;
        } else {
            categoryProductsContainer.innerHTML = filtered.map((p, i) => `
                <div class="scroll-reveal ${i % 2 === 1 ? 'lg-mt-16' : ''}" data-delay="${(i % 2) * 80}">
                    ${createProductHTML(p)}
                </div>
            `).join('');
            
            // Re-observe injected scroll reveals
            document.querySelectorAll('#category-products .scroll-reveal').forEach(el => {
                revealObserver.observe(el);
            });
            
            // Re-init icons in case some were injected (even if not strictly needed here)
            lucide.createIcons();
        }
    }

    // Initial render
    updateCategoryView();
}

// --- Cart Context Logic ---
const CartManager = {
    getItems: function() {
        try {
            const saved = localStorage.getItem('nyra-cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    },
    setItems: function(items) {
        try {
            localStorage.setItem('nyra-cart', JSON.stringify(items));
            this.updateBadge();
        } catch {}
    },
    addItem: function(product, size, color) {
        const items = this.getItems();
        const existing = items.find(
            i => i.id === product.id && i.size === size && i.color === color
        );
        if (existing) {
            existing.quantity += 1;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
                size,
                color,
                quantity: 1
            });
        }
        this.setItems(items);
        this.openCart(); // Assuming openCart might be implemented later
    },
    removeItem: function(index) {
        const items = this.getItems();
        items.splice(index, 1);
        this.setItems(items);
    },
    updateQuantity: function(index, qty) {
        if (qty < 1) {
            this.removeItem(index);
            return;
        }
        const items = this.getItems();
        items[index].quantity = qty;
        this.setItems(items);
    },
    clearCart: function() {
        this.setItems([]);
    },
    getSubtotal: function() {
        const items = this.getItems();
        return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    getItemCount: function() {
        const items = this.getItems();
        return items.reduce((sum, i) => sum + i.quantity, 0);
    },
    updateBadge: function() {
        const badge = document.getElementById('nav-cart-badge');
        if (!badge) return;
        const count = this.getItemCount();
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    },
    openCart: function() {
        let drawer = document.getElementById('cart-drawer');
        if (!drawer) {
            drawer = document.createElement('div');
            drawer.id = 'cart-drawer';
            drawer.className = 'cart-drawer';
            document.body.appendChild(drawer);

            const overlay = document.createElement('div');
            overlay.id = 'cart-drawer-overlay';
            overlay.className = 'cart-drawer-overlay';
            overlay.addEventListener('click', () => CartManager.closeCart());
            document.body.appendChild(overlay);
        }
        
        const items = this.getItems();
        let itemsHTML = '';
        if (items.length === 0) {
            itemsHTML = '<p style="margin-top: 2rem; color: var(--muted-foreground);">Seu carrinho está vazio.</p>';
        } else {
            itemsHTML = items.map((item, index) => `
                <div class="cart-drawer-item" style="display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
                    <img src="${item.image || ''}" style="width: 60px; height: 80px; object-fit: cover;" alt="${item.name}">
                    <div style="flex: 1;">
                        <p style="font-weight: 500;">${item.name}</p>
                        <p style="font-size: 0.875rem; color: var(--muted-foreground);">Tamanho: ${item.size} | Cor: ${item.color}</p>
                        <p style="margin-top: 0.5rem; font-weight: 500;">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
            `).join('');
        }

        drawer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="font-family: var(--font-display); font-size: 1.5rem;">Seu Carrinho</h2>
                <button onclick="CartManager.closeCart()" style="background: none; border: none; cursor: pointer; font-size: 1.5rem;">&times;</button>
            </div>
            <div class="cart-drawer-items" style="flex: 1; overflow-y: auto;">
                ${itemsHTML}
            </div>
            ${items.length > 0 ? `
            <div style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1rem;">
                <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 1rem;">
                    <span>Total:</span>
                    <span>R$ ${this.getSubtotal().toFixed(2).replace('.', ',')}</span>
                </div>
                <a href="checkout.html" class="magnetic-button btn-primary" style="display: block; text-align: center; width: 100%; text-decoration: none;">Finalizar Compra</a>
            </div>
            ` : ''}
        `;

        document.getElementById('cart-drawer-overlay').classList.add('active');
        drawer.classList.add('active');
    },
    closeCart: function() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-drawer-overlay');
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
};

// --- Checkout Page Logic ---
function initCheckout() {
    const successState = document.getElementById('checkout-success');
    const emptyState = document.getElementById('checkout-empty');
    const formState = document.getElementById('checkout-form-state');
    
    if (!successState || !emptyState || !formState) return;

    function renderState() {
        // Hide all
        successState.classList.add('hidden');
        emptyState.classList.add('hidden');
        formState.classList.add('hidden');
        
        if (window.checkoutSubmitted) {
            successState.classList.remove('hidden');
            return;
        }
        
        const items = CartManager.getItems();
        if (items.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            formState.classList.remove('hidden');
            renderCheckoutForm(items);
        }
    }

    function renderCheckoutForm(items) {
        const itemsContainer = document.getElementById('checkout-items');
        const subtotalEl = document.getElementById('checkout-subtotal');
        const totalEl = document.getElementById('checkout-total');
        
        if (itemsContainer) {
            itemsContainer.innerHTML = items.map(item => `
                <div class="summary-item" style="display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.5rem;">
                    <span>${item.name} (${item.size}) × ${item.quantity}</span>
                    <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
            `).join('');
        }
        
        const subtotal = CartManager.getSubtotal();
        const formattedSubtotal = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        
        if (subtotalEl) subtotalEl.textContent = formattedSubtotal;
        if (totalEl) totalEl.textContent = formattedSubtotal;
    }

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Assuming validation passes
            window.checkoutSubmitted = true;
            CartManager.clearCart();
            renderState();
            window.scrollTo(0, 0);
        });
    }

    renderState();
}

// Initializing the checkout logic on load if we are on the checkout page
document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
    initColecoes();
});

// --- Coleções Especiais Logic ---
const mockCollections = [
    {
        id: 'col1',
        title: 'Origens',
        image: 'https://media.base44.com/images/public/6a6110c7082124fafbd842f3/0dc8bc96a_generated_6b7a9fbe.png',
        is_limited: true,
        story: 'Nossa primeira coleção, inspirada nas raízes do algodão cru. Cada detalhe foi pensado para trazer o orgânico para o dia a dia, mantendo a simplicidade e a sofisticação das linhas retas.',
        description: 'Peças únicas feitas à mão com tingimento natural em um processo que economiza até 70% de água em comparação à indústria tradicional.',
        is_upcoming: false,
        launch_date: null,
        pieces_count: 50
    },
    {
        id: 'col2',
        title: 'Futuro Orgânico',
        image: 'https://media.base44.com/images/public/6a6110c7082124fafbd842f3/a7eacf785_generated_c5865baa.png',
        is_limited: true,
        story: 'Uma visão de como a tecnologia e a natureza podem coexistir em harmonia. Tecidos inteligentes que regulam a temperatura e um caimento impecável.',
        description: 'Feita inteiramente de tecidos reciclados e materiais reaproveitados de safras passadas. O futuro não descarta, transforma.',
        is_upcoming: true,
        launch_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        pieces_count: 100
    }
];

function initColecoes() {
    const container = document.getElementById('collections-container');
    if (!container) return;

    if (mockCollections.length === 0) {
        container.innerHTML = `<p class="text-center text-muted-foreground">Nenhuma coleção disponível no momento.</p>`;
        return;
    }

    container.innerHTML = mockCollections.map((col, i) => `
        <div class="scroll-reveal" data-delay="${(i % 2) * 100}">
            <div class="col-grid ${i % 2 === 1 ? 'reverse' : ''}">
                <div class="col-image-wrapper">
                    <div class="relative overflow-hidden bg-muted aspect-3-4">
                        ${col.image ? `<img src="${col.image}" alt="${col.title}" class="w-full h-full object-cover">` : ''}
                    </div>
                </div>
                <div class="col-info">
                    ${col.is_limited ? `<p class="subtitle text-secondary mb-4">Edição Limitada</p>` : ''}
                    <h2 class="font-display tracking-luxury title-large mb-6">${col.title}</h2>
                    ${col.story ? `<p class="text-base text-muted-foreground leading-relaxed mb-6">${col.story}</p>` : ''}
                    ${col.description ? `<p class="text-sm text-muted-foreground leading-relaxed mb-8">${col.description}</p>` : ''}
                    ${col.launch_date ? `
                        <div>
                            <p class="subtitle text-muted-foreground mb-4">${col.is_upcoming ? 'Lançamento em' : 'Disponível agora'}</p>
                            ${col.is_upcoming ? `<div class="countdown-timer" data-target="${col.launch_date}"></div>` : ''}
                        </div>
                    ` : ''}
                    ${col.pieces_count ? `<p class="text-xs text-muted-foreground mt-6">${col.pieces_count} peças disponíveis</p>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Re-observe injected scroll reveals
    document.querySelectorAll('#collections-container .scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Initialize the countdown timers
    initCountdowns();
}

function initCountdowns() {
    const timers = document.querySelectorAll('.countdown-timer');
    timers.forEach(timer => {
        const targetDate = new Date(timer.dataset.target).getTime();
        
        function update() {
            const diff = targetDate - Date.now();
            if (diff <= 0) {
                timer.innerHTML = '<p class="subtitle text-foreground">Lançado!</p>';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            const units = [
                { value: days, label: 'Dias' },
                { value: hours, label: 'Horas' },
                { value: minutes, label: 'Min' },
                { value: seconds, label: 'Seg' }
            ];

            let html = '<div class="countdown-flex">';
            units.forEach((unit, i) => {
                html += `
                    <div class="text-center">
                        <p class="font-display tracking-luxury tabular-nums countdown-val">
                            ${String(unit.value).padStart(2, '0')}
                        </p>
                        <p class="subtitle text-muted-foreground mt-2">${unit.label}</p>
                    </div>
                `;
                if (i < units.length - 1) {
                    html += `<span class="font-display text-muted-foreground-30 countdown-sep">:</span>`;
                }
            });
            html += '</div>';
            timer.innerHTML = html;
        }
        
        update();
        setInterval(update, 1000);
    });
}

// --- Contato Logic ---
function initContato() {
    const contactForm = document.getElementById('contact-form');
    const successBox = document.getElementById('contact-success');
    const btnNewMessage = document.getElementById('btn-new-message');

    if (contactForm && successBox && btnNewMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.classList.add('hidden');
            successBox.classList.remove('hidden');
            contactForm.reset();
        });

        btnNewMessage.addEventListener('click', () => {
            successBox.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }
}

// Ensure initContato is called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initContato();
    initForgotPassword();
});

// --- Forgot Password Logic ---
function initForgotPassword() {
    const form = document.getElementById('forgot-password-form');
    const sentMsg = document.getElementById('forgot-password-sent');
    const btnText = document.getElementById('forgot-password-btn-text');
    const spinner = document.getElementById('forgot-password-spinner');
    const btn = document.getElementById('forgot-password-btn');

    if (form && sentMsg && btn) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set loading state
            btn.disabled = true;
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            spinner.style.display = 'flex';
            spinner.style.alignItems = 'center';

            // Simulate API call
            setTimeout(() => {
                form.classList.add('hidden');
                sentMsg.classList.remove('hidden');
            }, 1000); // 1s mock delay
        });
    }
}

// --- Login Logic ---
function initLogin() {
    const form = document.getElementById('login-form');
    const errorBox = document.getElementById('login-error');
    const btnText = document.getElementById('login-btn-text');
    const spinner = document.getElementById('login-spinner');
    const btn = document.getElementById('login-btn');
    const googleBtn = document.getElementById('google-login-btn');

    if (form && errorBox && btn) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set loading state
            btn.disabled = true;
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            spinner.style.display = 'flex';
            spinner.style.alignItems = 'center';
            errorBox.classList.add('hidden');

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simulate API call
            setTimeout(() => {
                // If it's a test account we "log in", else we show error
                if (email === 'teste@nyra.com' && password === '123456') {
                    window.location.href = 'index.html';
                } else {
                    // Reset loading state
                    btn.disabled = false;
                    btnText.classList.remove('hidden');
                    spinner.classList.add('hidden');
                    errorBox.textContent = 'Invalid email or password. Try teste@nyra.com / 123456';
                    errorBox.classList.remove('hidden');
                }
            }, 1000); // 1s mock delay
        });

        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
}

// Ensure scripts are initialized
document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initLogin();
    initRegister();
    initResetPassword();
});

// --- Navbar Logic ---
function injectNavbar() {
    const headerHTML = `
        <header class="main-header">
            <div class="header-left">
                <a href="index.html" class="logo">NYRA</a>
            </div>
            <nav class="header-nav desktop-only-nav">
                <a href="camisetas.html">CAMISETAS</a>
                <a href="ecobags.html">ECOBAGS</a>
                <a href="colecoes.html">COLEÇÕES</a>
                <a href="contato.html">CONTATO</a>
            </nav>
            <div class="header-right">
                <a href="#" class="cart-btn-nav" aria-label="Carrinho" onclick="event.preventDefault(); CartManager.openCart();" style="text-decoration: none; display: flex; align-items: center;">
                    <i data-lucide="shopping-bag"></i>
                    <span class="cart-badge-nav hidden" id="nav-cart-badge">0</span>
                </a>
            </div>
        </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    // Refresh lucide icons for the new injected elements
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    CartManager.updateBadge();
}

// --- Footer Logic ---
function injectFooter() {
    const footerHTML = `
        <footer class="main-footer">
            <div class="footer-container">
                <div class="footer-brand">
                    <h2 class="footer-logo">NYRA</h2>
                    <p class="footer-desc">Luxo sustentável. Moda consciente de altíssimo padrão,<br>onde cada peça é um artefato de preservação<br>ambiental.</p>
                    <div class="footer-social">
                        <a href="https://www.instagram.com/nyrasustentavel/" target="_blank" aria-label="Instagram"><i data-lucide="instagram"></i></a>
                        <a href="#" aria-label="Facebook"><i data-lucide="facebook"></i></a>
                    </div>
                </div>
                <div class="footer-links-group">
                    <div class="footer-col">
                        <h3>LOJA</h3>
                        <a href="camisetas.html">Camisetas</a>
                        <a href="ecobags.html">Ecobags</a>
                        <a href="colecoes.html">Coleções Especiais</a>
                    </div>
                    <div class="footer-col">
                        <h3>SOBRE</h3>
                        <a href="contato.html">Contato</a>
                        <a href="https://www.instagram.com/nyrasustentavel/" target="_blank">Instagram</a>
                        <a href="https://wa.me/5511999999999" target="_blank">WhatsApp</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 NYRA. Todos os direitos reservados.</p>
                <p>Feito com consciência ambiental.</p>
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

const ALL_MOCK_PRODUCTS = {
    'p1': {
        id: 'p1', name: 'Camiseta Essencial', category: 'camisetas', price: 299.00,
        description: 'Camiseta essencial feita com algodão 100% orgânico GOTS. Tingimento natural que respeita o meio ambiente.',
        subcategory: 'T-Shirts', sizes: ['P', 'M', 'G'], colors: ['Preto', 'Branco'],
        images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png", "https://media.base44.com/images/public/6a6110c7082124fafbd842f3/73727361c_generated_18ba60f1.png"],
        fabric_composition: '100% Algodão Orgânico GOTS.', pet_bottles_saved: 6, water_saved_liters: 1500
    },
    'p2': {
        id: 'p2', name: 'Calça Comfort', category: 'moletons-casacos', price: 599.00,
        description: 'Conforto e elegância sustentável. Peça estruturada com caimento impecável.',
        subcategory: 'Calças', sizes: ['38', '40', '42', '44'], colors: ['Preto', 'Marrom'],
        images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/02557dadd_generated_eb5a4ca2.png"],
        fabric_composition: 'Linho Sustentável e Algodão Reciclado.', pet_bottles_saved: 12, water_saved_liters: 2100
    },
    'p3': {
        id: 'p3', name: 'Jaqueta Eco', category: 'moletons-casacos', price: 1299.00,
        description: 'Jaqueta de altíssimo padrão, perfeita para os dias frios. Material 100% reciclado.',
        subcategory: 'Casacos', sizes: ['P', 'M', 'G'], colors: ['Verde Oliva', 'Preto'],
        images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png"],
        fabric_composition: 'Nylon 100% Reciclado de garrafas PET.', pet_bottles_saved: 25, water_saved_liters: 800
    },
    'p4': {
        id: 'p4', name: 'Moletom Classic', category: 'moletons-casacos', price: 459.00,
        description: 'O clássico reinventado de forma sustentável. Aquece o corpo e preserva a natureza.',
        subcategory: 'Moletons', sizes: ['P', 'M', 'G'], colors: ['Off-White', 'Preto'],
        images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/73727361c_generated_18ba60f1.png", "https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png"],
        fabric_composition: '80% Algodão Orgânico, 20% PET Reciclado.', pet_bottles_saved: 15, water_saved_liters: 1200
    },
    'p5': {
        id: 'p5', name: 'T-Shirt Minimal', category: 'camisetas', price: 259.00,
        description: 'Minimalismo ecológico. Peça atemporal que combina com qualquer estilo.',
        subcategory: 'T-Shirts', sizes: ['PP', 'P', 'M', 'G'], colors: ['Branco', 'Cinza Mescla'],
        images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/02557dadd_generated_eb5a4ca2.png"],
        fabric_composition: '100% Algodão Orgânico GOTS.', pet_bottles_saved: 5, water_saved_liters: 1300
    },
    'p6': {
        id: 'p6', name: 'Bermuda Linho', category: 'moletons-casacos', price: 399.00,
        description: 'Bermuda leve e confortável para o dia a dia. Elegância sem abrir mão da sustentabilidade.',
        subcategory: 'Bermudas', sizes: ['38', '40', '42'], colors: ['Cru', 'Preto'],
        images: ["https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png"],
        fabric_composition: '100% Linho Orgânico.', pet_bottles_saved: 2, water_saved_liters: 900
    }
};

const CATEGORY_PRODUCTS = {
    'c1': { id: 'c1', name: 'Camiseta Cropped Eco', category: 'camisetas', price: 199.00, subcategory: 'Cropped', is_new: true, sizes: ['P', 'M'], colors: ['Preto', 'Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/0dc8bc96a_generated_6b7a9fbe.png'] },
    'c2': { id: 'c2', name: 'T-Shirt Manga Curta', category: 'camisetas', price: 259.00, subcategory: 'Manga Curta', is_new: false, sizes: ['M', 'G'], colors: ['Branco', 'Cinza'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png'] },
    'c3': { id: 'c3', name: 'Oversized Premium', category: 'camisetas', price: 299.00, subcategory: 'Oversized', is_new: true, sizes: ['G'], colors: ['Preto', 'Verde'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/73727361c_generated_18ba60f1.png'] },
    'c4': { id: 'c4', name: 'Cropped Minimal', category: 'camisetas', price: 189.00, subcategory: 'Cropped', is_new: false, sizes: ['P'], colors: ['Bege', 'Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/02557dadd_generated_eb5a4ca2.png'] },
    'c5': { id: 'c5', name: 'T-Shirt Básica', category: 'camisetas', price: 159.00, subcategory: 'Manga Curta', is_new: false, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Cinza'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/0dc8bc96a_generated_6b7a9fbe.png'] },
    'c6': { id: 'c6', name: 'Oversized Street', category: 'camisetas', price: 349.00, subcategory: 'Oversized', is_new: true, sizes: ['M'], colors: ['Verde', 'Bege'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png'] },
    
    'ca1': { id: 'ca1', name: 'Caneca Cerâmica Rústica', category: 'canecas', price: 89.00, subcategory: 'Cerâmica', is_new: true, sizes: ['Único'], colors: ['Terracota'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/a7eacf785_generated_c5865baa.png'],
        material: 'Cerâmica artesanal', capacity_ml: 350, height_cm: 10, diameter_cm: 8.5, dishwasher_safe: true, microwave_safe: false, description: 'Caneca artesanal em cerâmica rústica. Cada peça é única, moldada à mão e com acabamento em cor terracota natural. Produção local, zero plástico.' },
    'ca2': { id: 'ca2', name: 'Caneca Porcelana Fina', category: 'canecas', price: 129.00, subcategory: 'Porcelana', is_new: false, sizes: ['Único'], colors: ['Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/a7eacf785_generated_c5865baa.png'],
        material: 'Porcelana de alta alvura', capacity_ml: 280, height_cm: 9, diameter_cm: 7.8, dishwasher_safe: true, microwave_safe: true, description: 'Porcelana de altíssimo padrão, com paredes finas e acabamento delicado. Leve e elegante, ideal para chás e cafés especiais.' },
    'ca3': { id: 'ca3', name: 'Kit Canecas Eco', category: 'canecas', price: 199.00, subcategory: 'Cerâmica', is_new: true, sizes: ['Único'], colors: ['Verde'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/a7eacf785_generated_c5865baa.png'],
        material: 'Cerâmica esmaltada', capacity_ml: 400, height_cm: 11, diameter_cm: 9, dishwasher_safe: true, microwave_safe: true, description: 'Kit com 2 canecas em cerâmica esmaltada em verde musgo. Perfeito para presentear ou usar no dia a dia. Embalagem 100% reciclada.' },

    'e1': { id: 'e1', name: 'Ecobag Lona Orgânica', category: 'ecobags', price: 129.00, subcategory: 'Alça Longa', is_new: true, sizes: ['Único'], colors: ['Bege'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png'],
        material: 'Lona de algodão orgânico', handle_type: 'Alça longa dupla', width_cm: 38, height_cm: 42, depth_cm: 12, capacity_liters: 18, water_resistant: false, plastics_replaced_per_year: 500, description: 'Ecobag estruturada em lona de algodão 100% orgânico certificado. Alças longas reforçadas para uso diário. Substituirá centenas de sacolas plásticas ao longo da vida útil.' },
    'e2': { id: 'e2', name: 'Tote Bag Estruturada', category: 'ecobags', price: 189.00, subcategory: 'Tote', is_new: false, sizes: ['Único'], colors: ['Preto', 'Bege'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png'],
        material: 'Canvas reciclado reforçado', handle_type: 'Alça curta + transversal', width_cm: 34, height_cm: 36, depth_cm: 14, capacity_liters: 16, water_resistant: true, plastics_replaced_per_year: 420, description: 'Tote bag com estrutura rígida e base resistente. Alça curta para o ombro e transversal removível. Ideal para compras, trabalho ou viagens curtas.' },
    'e3': { id: 'e3', name: 'Ecobag Mercado', category: 'ecobags', price: 99.00, subcategory: 'Alça Curta', is_new: true, sizes: ['Único'], colors: ['Branco'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/6996ffc2b_generated_777c3279.png'],
        material: 'Juta natural', handle_type: 'Alça curta trançada', width_cm: 40, height_cm: 38, depth_cm: 10, capacity_liters: 15, water_resistant: false, plastics_replaced_per_year: 365, description: 'Ecobag de mercado em juta natural, biodegradável e resistente. Suporta até 15kg. A escolha certa para suas compras do dia a dia, sem plástico.' },

    'm1': { id: 'm1', name: 'Moletom Heavyweight', category: 'moletons-casacos', price: 349.00, subcategory: 'Moletom', is_new: true, sizes: ['M', 'G'], colors: ['Preto'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/17027ee6e_generated_cd8b902c.png'] },
    'm2': { id: 'm2', name: 'Casaco Estruturado', category: 'moletons-casacos', price: 589.00, subcategory: 'Casaco', is_new: false, sizes: ['P', 'M'], colors: ['Bege', 'Preto'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/17027ee6e_generated_cd8b902c.png'] },
    'm3': { id: 'm3', name: 'Hoodie Oversized', category: 'moletons-casacos', price: 299.00, subcategory: 'Oversized', is_new: true, sizes: ['Único'], colors: ['Cinza'], images: ['https://media.base44.com/images/public/6a6110c7082124fafbd842f3/17027ee6e_generated_cd8b902c.png'] }
};

Object.assign(ALL_MOCK_PRODUCTS, CATEGORY_PRODUCTS);

// --- Produto Logic ---
function initProduto() {
    if (!document.body.classList.contains('produto-body')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Fetch product from mock DB or fallback to default
    const product = ALL_MOCK_PRODUCTS[id] || {
        id: id || 'demo',
        name: 'Produto Exemplo',
        category: 'camisetas',
        price: 299.00,
        description: 'Estrutura, peso e presença. Peças que vestem como armadura consciente. Feito com materiais premium para durar.',
        subcategory: 'Exclusivo',
        sizes: ['P', 'M', 'G'],
        colors: ['Preto', 'Branco'],
        images: [
            'https://media.base44.com/images/public/6a6110c7082124fafbd842f3/0dc8bc96a_generated_6b7a9fbe.png',
            'https://media.base44.com/images/public/6a6110c7082124fafbd842f3/22884bbbb_generated_a8a4ce01.png'
        ],
        fabric_composition: '100% Algodão Orgânico GOTS, tingimento natural.',
        pet_bottles_saved: 6,
        water_saved_liters: 1500
    };

    // Simulate Loading
    setTimeout(() => {
        document.getElementById('produto-loading').classList.add('hidden');
        renderProductDetails(product);
    }, 800);
}

function renderProductDetails(product) {
    document.getElementById('produto-content').classList.remove('hidden');

    // --- Dados comuns a todas as categorias ---
    document.getElementById('product-subcategory').textContent = product.subcategory || '';
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('product-desc').textContent = product.description || '';

    // Galeria de imagens
    const mainImg = document.getElementById('main-image');
    mainImg.src = product.images[0];
    const thumbsContainer = document.getElementById('thumbnails-container');
    thumbsContainer.innerHTML = product.images.map((img, i) => `
        <button class="produto-thumbnail-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
            <img src="${img}" alt="">
        </button>
    `).join('');
    thumbsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            thumbsContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            mainImg.src = product.images[target.dataset.index];
        });
    });

    // Cores (todas as categorias)
    let selectedColor = product.colors ? product.colors[0] : null;
    const colorsWrapper = document.getElementById('colors-wrapper');
    if (product.colors && product.colors.length > 0) {
        colorsWrapper.classList.remove('hidden');
        document.getElementById('selected-color-label').textContent = selectedColor;
        const colorsContainer = document.getElementById('colors-container');
        colorsContainer.innerHTML = product.colors.map(c => `
            <button class="selector-btn ${c === selectedColor ? 'active' : ''}" data-color="${c}">${c}</button>
        `).join('');
        colorsContainer.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                colorsContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                selectedColor = target.dataset.color;
                document.getElementById('selected-color-label').textContent = selectedColor;
            });
        });
    }

    // Botão de adicionar ao carrinho
    let selectedSize = product.sizes ? product.sizes[0] : null;
    const btnAddCart = document.getElementById('btn-add-cart');
    btnAddCart.addEventListener('click', () => {
        if (window.CartManager) {
            window.CartManager.addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0]
            }, selectedSize, selectedColor);
        }
        const originalText = btnAddCart.textContent;
        btnAddCart.textContent = '✓ Adicionado ao Carrinho';
        setTimeout(() => { btnAddCart.textContent = originalText; }, 2000);
    });

    // --- Delegação por categoria ---
    const category = product.category || '';
    if (category === 'canecas') {
        renderCanecaDetails(product);
    } else if (category === 'ecobags') {
        renderEcobagDetails(product, selectedSize, selectedColor);
    } else {
        // Roupas: camisetas, moletons-casacos
        renderClothingDetails(product, selectedSize);
    }
}

// === ROUPAS ===
function renderClothingDetails(product, selectedSize) {
    document.getElementById('clothing-section').classList.remove('hidden');
    document.getElementById('impact-section').classList.remove('hidden');

    // Tamanhos
    const sizesWrapper = document.getElementById('sizes-wrapper');
    if (product.sizes && product.sizes.length > 0 && !product.sizes.includes('Único')) {
        sizesWrapper.classList.remove('hidden');
        document.getElementById('selected-size-label').textContent = selectedSize;
        const sizesContainer = document.getElementById('sizes-container');
        sizesContainer.innerHTML = product.sizes.map(s => `
            <button class="size-selector-btn ${s === selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>
        `).join('');
        sizesContainer.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                sizesContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                selectedSize = target.dataset.size;
                document.getElementById('selected-size-label').textContent = selectedSize;
                updateClothingImpacts(product, selectedSize);
            });
        });
    }

    // Composição do tecido
    if (product.fabric_composition) {
        document.getElementById('fabric-wrapper').classList.remove('hidden');
        document.getElementById('fabric-composition').textContent = product.fabric_composition;
    }

    // Impacto
    updateClothingImpacts(product, selectedSize);
}

function updateClothingImpacts(product, size) {
    let petCount = product.pet_bottles_saved || 0;
    let petSuffix = '';
    let waterCount = product.water_saved_liters || 0;
    if (size === 'P') { petCount = 2; petSuffix = ' de 2 litros'; waterCount = 2700; }
    else if (size === 'M') { petCount = 5; petSuffix = ' de 2 litros'; waterCount = 4000; }
    else if (size === 'G') { petCount = 7; petSuffix = ' de 2 litros'; waterCount = 5200; }
    const petLabel = document.getElementById('pet-label');
    const petImpact = document.getElementById('impact-pet');
    const petBar = document.getElementById('impact-pet-bar');
    const waterImpact = document.getElementById('impact-water');
    const waterBar = document.getElementById('impact-water-bar');
    if (petLabel) petLabel.textContent = `Garrafas PET retiradas${petSuffix ? ' ' + petSuffix : ''}`;
    if (petImpact) petImpact.textContent = petCount;
    if (petBar) petBar.style.width = `${Math.min((petCount / 12) * 100, 100)}%`;
    if (waterImpact) waterImpact.textContent = waterCount;
    if (waterBar) waterBar.style.width = `${Math.min((waterCount / 5200) * 100, 100)}%`;
}

// === CANECAS ===
function renderCanecaDetails(product) {
    document.getElementById('caneca-section').classList.remove('hidden');

    // Features customizadas
    const f1 = document.getElementById('feature-1');
    const f3 = document.getElementById('feature-3');
    if (f1) f1.textContent = 'Embalagem 100% reciclada e sem plástico';
    if (f3) f3.textContent = 'Garantia de 6 meses contra defeitos de fabricação';

    const specsGrid = document.getElementById('caneca-specs-grid');
    const specs = [
        { icon: 'layers', label: 'Material', value: product.material || '—' },
        { icon: 'droplets', label: 'Capacidade', value: product.capacity_ml ? `${product.capacity_ml} ml` : '—' },
        { icon: 'ruler', label: 'Altura', value: product.height_cm ? `${product.height_cm} cm` : '—' },
        { icon: 'circle', label: 'Diâmetro', value: product.diameter_cm ? `${product.diameter_cm} cm` : '—' },
        { icon: 'globe', label: 'Origem', value: 'Materiais importados' },
        { icon: 'palette', label: 'Pigmentação', value: 'Alta fidelidade de cores' },
    ];
    specsGrid.innerHTML = specs.map(s => `
        <div class="spec-item">
            <div class="spec-icon-wrap"><i data-lucide="${s.icon}" class="spec-icon"></i></div>
            <div class="spec-info">
                <span class="spec-label">${s.label}</span>
                <span class="spec-value">${s.value}</span>
            </div>
        </div>
    `).join('');

    // Ícones de cuidados
    const careIcons = document.getElementById('caneca-care-icons');
    const cares = [
        { icon: 'waves', label: 'Lava-louças', ok: product.dishwasher_safe },
        { icon: 'zap', label: 'Microondas', ok: product.microwave_safe },
        { icon: 'thermometer', label: 'Líquidos quentes', ok: true },
        { icon: 'palette', label: 'Tinta premium', ok: true },
        { icon: 'leaf', label: 'Eco-fabricação', ok: true },
    ];
    careIcons.innerHTML = cares.map(c => `
        <div class="care-icon-item ${c.ok ? 'care-ok' : 'care-no'}">
            <i data-lucide="${c.icon}" class="care-icon"></i>
            <span class="care-label">${c.label}</span>
            <span class="care-status">${c.ok ? '✓' : '✗'}</span>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

// === ECOBAGS ===
function renderEcobagDetails(product) {
    document.getElementById('ecobag-section').classList.remove('hidden');

    // Features customizadas
    const f1 = document.getElementById('feature-1');
    const f3 = document.getElementById('feature-3');
    if (f1) f1.textContent = 'Cada bolsa substitui centenas de sacolas plásticas';
    if (f3) f3.textContent = 'Durabilidade garantida para anos de uso';

    const specsGrid = document.getElementById('ecobag-specs-grid');
    const specs = [
        { icon: 'layers', label: 'Material', value: product.material || '—' },
        { icon: 'anchor', label: 'Tipo de Alça', value: product.handle_type || '—' },
        { icon: 'box', label: 'Dimensões', value: (product.width_cm && product.height_cm && product.depth_cm) ? `${product.width_cm} × ${product.height_cm} × ${product.depth_cm} cm` : '—' },
        { icon: 'package', label: 'Capacidade', value: product.capacity_liters ? `${product.capacity_liters} L` : '—' },
        { icon: 'shield', label: 'Resistente à água', value: product.water_resistant ? 'Sim' : 'Não' },
    ];
    specsGrid.innerHTML = specs.map(s => `
        <div class="spec-item">
            <div class="spec-icon-wrap"><i data-lucide="${s.icon}" class="spec-icon"></i></div>
            <div class="spec-info">
                <span class="spec-label">${s.label}</span>
                <span class="spec-value">${s.value}</span>
            </div>
        </div>
    `).join('');

    // Impacto plásticos
    const num = product.plastics_replaced_per_year || 0;
    const numEl = document.getElementById('ecobag-plastics-num');
    const barEl = document.getElementById('ecobag-plastics-bar');
    if (numEl) numEl.textContent = num;
    if (barEl) {
        setTimeout(() => {
            barEl.style.width = `${Math.min((num / 500) * 100, 100)}%`;
        }, 100);
    }

    if (window.lucide) window.lucide.createIcons();
}

// --- Register Logic ---
function initRegister() {
    const registerView = document.getElementById('register-view');
    const otpView = document.getElementById('otp-view');
    
    if (!registerView || !otpView) return;

    // Form elements
    const form = document.getElementById('register-form');
    const errorBox = document.getElementById('register-error');
    const btnText = document.getElementById('register-btn-text');
    const spinner = document.getElementById('register-spinner');
    const btn = document.getElementById('register-btn');
    const googleBtn = document.getElementById('google-register-btn');

    // OTP Elements
    const otpSubtitle = document.getElementById('otp-subtitle');
    const otpSlots = document.querySelectorAll('.otp-slot');
    const verifyBtn = document.getElementById('verify-btn');
    const verifyBtnText = document.getElementById('verify-btn-text');
    const verifySpinner = document.getElementById('verify-spinner');
    const otpError = document.getElementById('otp-error');
    const resendBtn = document.getElementById('resend-btn');

    let registeredEmail = '';

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            errorBox.classList.add('hidden');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;

            if (password !== confirm) {
                errorBox.textContent = 'Passwords do not match';
                errorBox.classList.remove('hidden');
                return;
            }

            btn.disabled = true;
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            spinner.style.display = 'inline-flex';

            setTimeout(() => {
                btn.disabled = false;
                btnText.classList.remove('hidden');
                spinner.classList.add('hidden');
                
                registeredEmail = email;
                otpSubtitle.textContent = `We sent a code to ${email}`;
                
                registerView.classList.add('hidden');
                otpView.classList.remove('hidden');
                otpSlots[0].focus();
            }, 1000);
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // OTP Logic
    otpSlots.forEach((slot, index) => {
        slot.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpSlots.length - 1) {
                otpSlots[index + 1].focus();
            }
            checkOtpFilled();
        });

        slot.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpSlots[index - 1].focus();
            }
        });
    });

    function checkOtpFilled() {
        const isFilled = Array.from(otpSlots).every(slot => slot.value.length === 1);
        verifyBtn.disabled = !isFilled;
    }

    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            verifyBtn.disabled = true;
            verifyBtnText.classList.add('hidden');
            verifySpinner.classList.remove('hidden');
            verifySpinner.style.display = 'inline-flex';
            otpError.classList.add('hidden');

            setTimeout(() => {
                const code = Array.from(otpSlots).map(s => s.value).join('');
                if (code === '123456') { // Mock valid OTP
                    window.location.href = 'index.html';
                } else {
                    verifyBtn.disabled = false;
                    verifyBtnText.classList.remove('hidden');
                    verifySpinner.classList.add('hidden');
                    otpError.textContent = 'Invalid verification code. Try 123456';
                    otpError.classList.remove('hidden');
                }
            }, 1000);
        });
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            const toast = document.getElementById('toast-container');
            toast.classList.remove('hidden');
            // Allow display block to render before animating
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.classList.add('hidden'), 300);
            }, 3000);
        });
    }
}

// --- Reset Password Logic ---
function initResetPassword() {
    const invalidView = document.getElementById('invalid-token-view');
    const resetView = document.getElementById('reset-password-view');
    
    if (!invalidView || !resetView) return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        invalidView.classList.remove('hidden');
    } else {
        resetView.classList.remove('hidden');

        const form = document.getElementById('reset-form');
        const errorBox = document.getElementById('reset-error');
        const btn = document.getElementById('reset-btn');
        const btnText = document.getElementById('reset-btn-text');
        const spinner = document.getElementById('reset-spinner');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            errorBox.classList.add('hidden');

            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;

            if (password !== confirm) {
                errorBox.textContent = 'Passwords do not match';
                errorBox.classList.remove('hidden');
                return;
            }

            btn.disabled = true;
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            spinner.style.display = 'inline-flex';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000); // mock API delay
        });
    }
}
