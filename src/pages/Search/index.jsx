import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import "./Search.css";

let myTime;
const Search = () => {
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
    const [perPage, setPerPage] = useState(+params.get("per-page") || 10);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState(params.get("q") || "");
    const [value, setValue] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api01.f8team.dev/api/products?q=${query}&page=${currentPage}&per_page=${perPage}`
        )
            .then((res) => res.json())
            .then((res) => {
                setTotalPage(res.last_page);
                setProducts(res.data);
                history.replaceState(
                    null,
                    null,
                    `?q=${query}&page=${currentPage}&per_page=${perPage}`
                );
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [query, currentPage, perPage]);
    return (
        <div className="page-container">
            <h1 className="search-title">Tìm kiếm sản phẩm</h1>

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Nhập tên sản phẩm..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        clearTimeout(myTime);
                        myTime = setTimeout(() => {
                            setQuery(e.target.value);
                        }, 500);
                    }}
                />
                <button className="search-button">Tìm kiếm</button>
            </div>

            {loading && <Loading />}
            <ProductList query={query} />
            {/* Message hiển thị khi không tìm thấy nhé AE */}
            <p className="empty-message">Không tìm thấy sản phẩm nào.</p>
        </div>
    );
};

export default Search;
