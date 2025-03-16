import React, { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({ submitTitle = "Submit" }) => {
    const productData = {
        title: "",
        description: "",
        category: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        tags: "",
        brand: "",
        sku: "",
        weight: "",
        minimumOrderQuantity: "",
        thumbnail: "",
    };

    const attribute = [
        { name: "title", type: "text", placeholder: "Tên sản phẩm" },
        { name: "description", type: "text", placeholder: "Mô tả sản phẩm" },
        { name: "category", type: "text", placeholder: "Danh mục" },
        { name: "price", type: "number", placeholder: "Giá($)" },
        {
            name: "discountPercentage",
            type: "number",
            placeholder: "Giảm giá(%)",
        },
        { name: "rating", type: "number", placeholder: "Đánh giá(0-5)" },
        { name: "stock", type: "number", placeholder: "Tồn kho" },
        {
            name: "tags",
            type: "text",
            placeholder: "Tags (cách nhau bằng dấu phẩy)",
        },
        { name: "brand", type: "text", placeholder: "Thương hiệu" },
        { name: "sku", type: "text", placeholder: "Mã SKU" },
        { name: "weight", type: "number", placeholder: "Trọng lượng (kg)" },
        {
            name: "minimumOrderQuantity",
            type: "number",
            placeholder: "Số lượng tối thiểu",
        },
        { name: "thumbnail", type: "text", placeholder: "URL hình ảnh" },
    ];

    const [formValues, setFormValues] = useState(productData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        fetch("https://api01.f8team.dev/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formValues),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    const setFieldValue = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                {attribute.map((a, index) => (
                    <div className="form-group" key={index}>
                        <input
                            type={a.type}
                            name={a.name}
                            value={formValues[a.name]}
                            className="form-input"
                            placeholder={a.placeholder}
                            onChange={setFieldValue}
                        />
                    </div>
                ))}
                <button type="submit" className="submit-button">
                    {submitTitle}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
