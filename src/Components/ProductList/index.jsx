import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../Api';
import './ProductList.css';
import CartItem from '../CartItem';
import { addItem } from '../../Reducers/CartSlice'; 
import ProductPrice from '../ProductPrice/ProductPrice';
import productPriceStyles from '../ProductPrice/ProductPrice.module.css'; 

function ProductList({ setShowCart, showCart }) {
    const [addedToCart, setAddedToCart] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                setError(error.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleContinueShopping = (e) => {
        if (e) e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {!showCart ? (
                <div className="product-grid">
                    {products.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((item, itemIndex) => (
                                    <div className={`product-card ${item.sale ? 'on-sale' : ''}`} key={itemIndex}>
                                        <img className="product-image" src={item.image} alt={item.name} />
                                        <div className="product-title">{item.name}</div>
                                        <div className="product-description">{item.description}</div>
                                        <ProductPrice cost={item.cost} sale={item.sale} className={productPriceStyles.productPrice} />
                                        <button className="product-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={(e) => handleContinueShopping(e)} />
            )}
        </div>
    );
}

export default ProductList;
