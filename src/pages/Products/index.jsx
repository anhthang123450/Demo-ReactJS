import React, { useState } from "react";
import ProductList from "../../components/ProductList/index.jsx";
import Loading from "../../components/Loading/index.jsx";

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    console.log(products.length === 0);
    return (
        <div className="page-container">
            <h1 className="page-title">Danh Sách Sản Phẩm</h1>

            {loading && <Loading />}

            <ProductList setLoading={setLoading} setProducts={setProducts} />

            {products.length === 0 && (
                <p className="empty-message">Không có sản phẩm nào.</p>
            )}
        </div>
    );
};
export default Products;
