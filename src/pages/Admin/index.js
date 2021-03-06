import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/Forms/FormInput";
import FormSelect from "./../../components/Forms/FormSelect";
import Button from "./../../components/Forms/Button";
import LoadMore from "./../../components/LoadMore";
import CKEditor from "ckeditor4-react";

import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPictures, setProductPictures] = useState({
    picture1: "",
    picture2: "",
    picture3: "",
  });
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
    setProductPictures({
      picture1: "",
      picture2: "",
      picture3: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPictures,
        productPrice,
        productDesc,
      })
    );
    resetForm();
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className='admin'>
      <div className='callToActions'>
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className='addNewProductForm'>
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label='Category'
              options={[
                {
                  value: "mens",
                  name: "Mens",
                },
                {
                  value: "womens",
                  name: "Womens",
                },
                {
                  name: "Sale",
                  value: "sale",
                },
                {
                  name: "accessories",
                  value: "sale",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label='Name'
              type='text'
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label='Main image URL'
              type='url'
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label='Second image URL'
              type='url'
              name='picture1'
              value={productPictures.picture1}
              handleChange={(e) =>
                setProductPictures({
                  ...productPictures,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <FormInput
              label='Third image URL'
              type='url'
              name='picture2'
              value={productPictures.picture2}
              handleChange={(e) =>
                setProductPictures({
                  ...productPictures,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <FormInput
              label='Fourth image URL'
              type='url'
              name='picture3'
              value={productPictures.picture3}
              handleChange={(e) =>
                setProductPictures({
                  ...productPictures,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <FormInput
              label='Price'
              type='number'
              min='0.00'
              max='10000.00'
              step='0.01'
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <CKEditor onChange={(e) => setProductDesc(e.editor.getData())} />

            <br />

            <Button type='submit'>Add product</Button>
          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        <table border='0' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className='results'
                  border='0'
                  cellPadding='10'
                  cellSpacing='0'
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          productCategory,
                          productDesc,
                          productPictures,
                          documentID,
                        } = product;
                        return (
                          <tr key={index}>
                            <td>
                              <img
                                className='thumb'
                                src={productThumbnail}
                                alt={productName}
                              />
                            </td>
                            {productPictures && (
                              <>
                                <td>
                                  <img
                                    className='thumb'
                                    src={productPictures.picture1}
                                    alt={productName}
                                  />
                                </td>
                                <td>
                                  <img
                                    className='thumb'
                                    src={productPictures.picture2}
                                    alt={productName}
                                  />
                                </td>
                                <td>
                                  <img
                                    className='thumb'
                                    src={productPictures.picture3}
                                    alt={productName}
                                  />
                                </td>
                              </>
                            )}

                            <td>{productName}</td>
                            <td>{productCategory}</td>
                            <td>${productPrice}</td>
                            <td>{productDesc}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border='0' cellPadding='10' cellSpacing='0'>
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
