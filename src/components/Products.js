import React, { useState, useEffect } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

const Products = (props) => {
  useEffect(() => {
    props.fetchProducts();
  }, []);

  const [showProduct, setShowProduct] = useState(null);

  const openModal = (product) => {
    setShowProduct(product);
  };

  const closeModal = () => {
    setShowProduct(null);
  };

  return (
    <div>
      <Fade bottom cascade>
        {!props.products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => props.addToCart(product)}
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {showProduct && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={showProduct.image} alt={showProduct.title} />
              <div className="product-details-description">
                <p>
                  <strong>{showProduct.title}</strong>
                </p>
                <p>{showProduct.description}</p>
                <p>
                  Available availableSizes
                  {showProduct.availableSizes.map((size) => (
                    <span>
                      {" "}
                      <button className="button">{size}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(showProduct.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addToCart(showProduct);
                      closeModal();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { products: state.products.filteredItems };
};

export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);
