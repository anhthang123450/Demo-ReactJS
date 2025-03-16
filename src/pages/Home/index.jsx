import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <h1>Trang chủ</h1>
            <ul>
                <li>
                    <Link to="/new-product">New Product</Link>
                </li>
                <li>
                    <Link to="products">Product</Link>
                </li>
                <li>
                    <Link to="search">Search</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
