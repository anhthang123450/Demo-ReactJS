import { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList() {
    const params = new URLSearchParams(location.search);
    const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetch(`https://api01.f8team.dev/api/products?page=${currentPage}`)
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.data);
                setTotalPage(res.last_page);

                history.replaceState(null, null, `?page=${currentPage}`);
            });
    }, [currentPage]);

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
                                <h3 className="product-title">Tên sản phẩm</h3>
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
                        <select id="itemsPerPage" className="items-select">
                            <option value="10">10</option>
                            <option value="20">20</option>
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
                                setCurrentPage((pre) => {
                                    if (pre > 1) return pre - 1;
                                    return pre;
                                })
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
                            onClick={() =>
                                setCurrentPage((pre) => {
                                    if (pre < totalPage) return pre + 1;
                                    return pre;
                                })
                            }
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
