import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import axios from "../axios";
import ProductPreview from "../components/ProductPreview";
import { updateProducts } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Cover from "../assets/cover.png";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products;

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);
  return (
    <div>
      <img src={Cover} className="img-fluid" alt="SHOP NOW" />
      <div className="featured-products-container container mt-4">
        <h2>Last Products</h2>
        {/* Last products preview */}
        <div className="d-flex justify-content-center flex-wrap ">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more{">>"}
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <img
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
          className="img-fluid"
          alt="SHOP NOW"
        />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row className="my-4">
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
