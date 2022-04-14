import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductOverviewCard from '../../components/ProductOverviewCard';
import { IProduct } from '../../redux/modules/Cart/types';
import { Creators as CreateAction } from '../../redux/modules/Catalog/ducks/index';
import { IState } from '../../redux/store';

type ProductParams = {
  id: string;
}

const ProductOverview: React.FC = () => {
  const { id } = useParams<ProductParams>();
  const selectedProduct = useSelector((state: IState) => state.catalog.selectedProduct);
  const dispatch = useDispatch();
  const [existentProduct, setExistentProduct] = useState(() => ({} as IProduct));

  useEffect(() => {
    dispatch(CreateAction.getProductByIdRequest({ isLoading: true, productId: id }));

    if (selectedProduct.isLoading === false) {
      setTimeout(() => { // Start the timer
        setExistentProduct(selectedProduct.product);
      }, 1000);
    }
  }, [selectedProduct.isLoading, dispatch, id, existentProduct]);

  return (
    // <ProductOverviewCard product={loadedProduct || product} />
    <>
      { Object.keys(existentProduct).length === 0
        ? (
          <div style={{
            margin: '0 auto',
            width: '100%',
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <CircularProgress color="primary" sx={{ fontSize: '5rem' }} />
          </div>
        )
        : (<ProductOverviewCard product={existentProduct} />)}
    </>
  );
};

export default ProductOverview;
