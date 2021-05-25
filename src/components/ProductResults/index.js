import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from "./../Forms/FormSelect";
import LoadMore from "./../LoadMore";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;
  console.log(products);
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/shop/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
      {
        name: "Sale",
        value: "sale",
      },
      {
        name: "Accessories",
        value: "accessories",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className='products'>
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className='products'>
      <FormSelect {...configFilters} />

      <div className='productResults'>
        {data.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product key={index} {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
