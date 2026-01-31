const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Product data - easy to expand with more plates
const products = {
    plate1: {
        id: 'plate1',
        name: 'Classic Dinner Plate',
        model: '/ar/resturant-one/product-1/product.glb',
        description: 'Beautiful ceramic dinner plate'
    },
    plate2: {
        id: 'plate2',
        name: 'Modern Plate',
        model: '/ar/resturant-one/product-2/20_01_2026.glb',
        description: 'Sleek modern design'
    }
     
};

// Homepage - List all available products
app.get('/', (req, res) => {
    res.render('index', { products });
});

// Product detail page - Display specific plate in AR
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const product = products[productId];

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.render('plate', { product });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 AR Plate Server running at http://localhost:${PORT}`);
    console.log(`📱 View products at:`);
    console.log(`   - Homepage: http://localhost:${PORT}`);
    console.log(`   - Plate 1: http://localhost:${PORT}/product/plate1`);
    console.log(`   - Plate 2: http://localhost:${PORT}/product/plate2`);
});
