import { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList({ setLoading }) {
    const params = new URLSearchParams(location.search);
    const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api01.f8team.dev/api/products?page=${currentPage}&per_page=${perPage}`
        )
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.data);
                setTotalPage(res.last_page);
                setNext(res.next_page_url);
                setPrev(res.prev_page_url);
                history.replaceState(null, null, `?page=${currentPage}`);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [currentPage, perPage]);

    return (
        <>
            <div className="product-list-container">
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-item">
                            <img
                                src={product.thumbnail}
                                alt=""
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3 className="product-title">
                                    {product.title}
                                </h3>
                                <p className="product-price">
                                    {product.price}$
                                </p>
                                <p className="product-stock">
                                    Còn {product.stock} sản phẩm
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="pagination-container">
                    <div className="items-per-page">
                        <label htmlFor="itemsPerPage">Hiển thị:</label>
                        <select
                            id="itemsPerPage"
                            className="items-select"
                            value={perPage}
                            onChange={(e) => setPerPage(Number(e.target.value))}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>

                    <div className="pagination">
                        <button
                            className={
                                currentPage === 1
                                    ? "page-button-active"
                                    : "page-button"
                            }
                            onClick={() =>
                                setCurrentPage((pre) => (prev ? pre - 1 : pre))
                            }
                        >
                            ⬅ Trước
                        </button>

                        <div className="page-numbers">
                            {[...Array(totalPage)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={index}
                                        className={
                                            currentPage === page
                                                ? "active page-number"
                                                : "page-number"
                                        }
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className={
                                currentPage === totalPage
                                    ? "page-button-active"
                                    : "page-button"
                            }
                            onClick={() => {
                                if (currentPage < totalPage) {
                                    setCurrentPage(currentPage + 1);
                                }
                                return;
                            }}
                        >
                            Tiếp ➡
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
