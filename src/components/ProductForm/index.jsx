import React, { useState } from "react";
import "./ProductForm.css";
import { Navigate, useNavigate } from "react-router-dom";

const ProductForm = ({ submitTitle = "", setLoading }) => {
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
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(productData);

    const [errors, setErrors] = useState({});

    const setFieldValue = (e) => {
        if (e.target.name === "tags") {
            const tags = e.target.value.split(",").map((tag) => tag.trim());
            setFormValues({ ...formValues, tags });
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        fetch("https://api01.f8team.dev/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formValues),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setFormValues(productData);
                    setErrors({});
                    console.log(formValues);
                    navigate("/products");
                } else {
                    setErrors(data.errors || {});
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    {attribute.map((a, index) => (
                        <div key={index} className="form-group">
                            {a.type === "textarea" ? (
                                <textarea
                                    name={a.name}
                                    className="form-textarea"
                                    placeholder={a.placeholder}
                                    required
                                    value={formValues[a.name] || ""}
                                    onChange={setFieldValue}
                                />
                            ) : (
                                <input
                                    type={a.type}
                                    name={a.name}
                                    className="form-input"
                                    placeholder={a.placeholder}
                                    required
                                    value={formValues[a.name] || ""}
                                    onChange={setFieldValue}
                                />
                            )}
                            {errors[a.name] && (
                                <p className="error-message">
                                    {errors[a.name]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-button">
                    {submitTitle}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
