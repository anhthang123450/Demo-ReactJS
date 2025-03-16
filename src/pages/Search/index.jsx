import React from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import "./Search.css";

const Search = () => {
    return (
        <div className="page-container">
            <h1 className="search-title">Tìm kiếm sản phẩm</h1>

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Nhập tên sản phẩm..."
                />
                <button className="search-button">Tìm kiếm</button>
            </div>

            <ProductList />

            {/* Loading nhé */}
            {/* <Loading /> */}

            {/* Message hiển thị khi không tìm thấy nhé AE */}
            <p className="empty-message">Không tìm thấy sản phẩm nào.</p>
        </div>
    );
};

export default Search;
