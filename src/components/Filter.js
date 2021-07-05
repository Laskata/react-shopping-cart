import React from "react";
import { filterProducts, sortProducts } from "../actions/productActions";
import { connect } from "react-redux";

const Filter = (props, { sort, size, sortProducts, filterProducts }) => {
  return !props.filteredProducts ? (
    <div>Loading...</div>
  ) : (
    <div className="filter">
      <div className="filter-result">
        {props.filteredProducts.length} Products
      </div>
      <div className="filter-sort">
        Order{" "}
        <select
          value={sort}
          onChange={(e) =>
            props.sortProducts(props.filteredProducts, e.target.value)
          }
        >
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select
          value={size}
          onChange={(e) => props.filterProducts(props.products, e.target.value)}
        >
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XLL">XXL</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  };
};
export default connect(mapStateToProps, { filterProducts, sortProducts })(
  Filter
);
