import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductOverviewCard from '../../components/ProductOverviewCard';
import { IProduct } from '../../redux/modules/Cart/types';
import { Creators } from '../../redux/modules/Catalog/ducks/index';
import { IState } from '../../redux/store';

type ProductParams = {
  id: string;
}

interface IProductOverviewProps {
  products: IProduct[];
}

const ProductOverview: React.FC<IProductOverviewProps> = ({ products }: IProductOverviewProps) => {
  const { id } = useParams<ProductParams>();
  const [existentProduct, setExistentProduct] = useState<IProduct | undefined>({} as IProduct);

  const loadedProducts = useSelector((state: IState) => state.catalog.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      if (loadedProducts.length === 0) {
        dispatch(Creators.getProductsCatalogRequest());
        setExistentProduct(findProduct(parseInt(id, 10), 'dispatch'));
      } else {
        setExistentProduct(findProduct(parseInt(id, 10), 'loaded'));
      }
    }

    function findProduct(productId: number, from: string) {
      switch (from) {
        case 'dispatch': {
          return products.find(product => product.id === productId);
        }
        case 'loaded': {
          return loadedProducts.find((product: { id: number; }) => product.id === productId);
        }
        default: {
          return {} as IProduct;
        }
      }
    }
  }, [dispatch, loadedProducts, id, products]);

  return (
    <ProductOverviewCard product={existentProduct || {} as IProduct} />

  );
};

function mapStateToProps(state: IState) {
  const { getProductsCatalogRequest } = Creators;
  return {
    getProductsCatalogRequest,
    products: state.catalog.products,
  };
}

export default connect(mapStateToProps)(ProductOverview);
