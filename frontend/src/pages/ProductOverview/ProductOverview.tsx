import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductOverviewCard from '../../components/ProductOverviewCard';
import { Creators as CreateAction } from '../../redux/modules/Catalog/ducks/index';
import { Creators as CreateLoadingAction } from '../../redux/modules/Loading/ducks/index';
import { IState } from '../../redux/store';

type ProductParams = {
  id: string;
}

const ProductOverview: React.FC = () => {
  const { id } = useParams<ProductParams>();
  const selector = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(() => {
    dispatch(CreateLoadingAction.loadingRequest());

    return selector.loading.isLoading;
  });

  useEffect(() => {
    dispatch(CreateAction.getProductByIdRequest({ isLoading: true, productId: id }));
    if (!selector.loading.isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [dispatch, id, loading, selector.loading.isLoading]);

  return (
    <>
      <h1>
        {loading
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
          : <ProductOverviewCard />}

      </h1>
    </>
  );
};

export default ProductOverview;
