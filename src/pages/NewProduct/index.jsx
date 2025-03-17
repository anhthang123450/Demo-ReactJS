import React, { useState } from "react";
import ProductForm from "../../components/ProductForm";
import Loading from "../../components/Loading";

const NewProduct = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="page-container">
            <h1 className="page-title">Tạo Sản Phẩm Mới</h1>

            {/* Loading nhé */}
            {loading && <Loading />}
            <ProductForm
                heading="Tạo Sản Phẩm Mới"
                submitTitle="Tạo sản phẩm"
                setLoading={setLoading}
            />
        </div>
    );
};

export default NewProduct;
