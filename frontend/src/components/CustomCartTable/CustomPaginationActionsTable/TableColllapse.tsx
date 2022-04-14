import React, { useCallback, useState } from 'react';
import {
  Collapse,
  Box,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
} from '@mui/material';

import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Add,
  Remove,
  Delete,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSnackbar } from 'notistack';
import { ICartItem } from '../../../redux/modules/Cart/types';
import { formatNumberCurrency } from '../../../utils/FormatNumberCurrency';
import { CustomTextField } from './styles';
import { Creators as CreateAction } from '../../../redux/modules/Cart/ducks/index';
import { PriceSpan } from '../../../pages/HomePage/styles';

interface ICartProductProps {
  cartProduct: ICartItem;
}

const TableCollapse: React.FC<ICartProductProps> = ({ cartProduct }: ICartProductProps) => {
  const [openRow, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleDecrementQuantity = useCallback(() => {
    dispatch(CreateAction.removeProductFromCart(cartProduct.product));
  }, [cartProduct.product, dispatch]);

  const handleIncrementQuantity = useCallback(() => {
    if (cartProduct.quantity > cartProduct.product.stock.quantity) {
      enqueueSnackbar('Não é possível adicionar mais desse produto, estoque insuficiente !', { variant: 'error' });
      return;
    }

    dispatch(CreateAction.addProductToCartRequest(cartProduct.product));
  }, [cartProduct, dispatch, enqueueSnackbar]);

  const handleRemoveProductFromCart = () => {
    dispatch(CreateAction.removeProductAllQuantitiesFromCart(cartProduct));
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!openRow)}
          >
            {openRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {cartProduct.product.name}
        </TableCell>
        <TableCell>{cartProduct.product.brand.name}</TableCell>
        <TableCell>{formatNumberCurrency(cartProduct.product.price)}</TableCell>
        <TableCell>{cartProduct.quantity}</TableCell>
        <TableCell>
          {formatNumberCurrency(cartProduct.product.price * cartProduct.quantity)}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => handleRemoveProductFromCart()}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box sx={{ flexGrow: 1, margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <Grid
                    container
                    columnSpacing={{ xs: 0, md: 6, sm: 0 }}
                    columns={{ xs: 12, sm: 12, md: 12 }}
                    sx={{
                      width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                    }}
                  >
                    <Grid item lg={3} md={3} xs={12}>
                      <LazyLoadImage
                        src={cartProduct.product.image
                          ? cartProduct.product.image.filepath : `/assets/${cartProduct.product.image}`}
                        alt="product"
                        effect="blur"
                        onError={({ currentTarget }) => {
                          // eslint-disable-next-line no-param-reassign
                          currentTarget.onerror = null;
                          // eslint-disable-next-line no-param-reassign
                          currentTarget.src = '/assets/noimage.jfif';
                        }}
                      />
                    </Grid>

                    <Grid item lg={9} md={9} xs={12}>
                      <Typography
                        sx={{
                          lineHeight: '3.5rem', fontSize: '1.2rem', fontWeight: 500, position: 'relative', top: 9,
                        }}
                        variant="subtitle1"
                        component="div"
                      >
                        {cartProduct.product.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.9rem' }} noWrap variant="body2" color="text.secondary">
                        {cartProduct.product.description}
                      </Typography>

                      <PriceSpan style={{ fontSize: '1rem' }}>
                        {formatNumberCurrency(cartProduct.product.price * cartProduct.quantity)}
                      </PriceSpan>
                      <CustomTextField
                        sx={{
                          marginTop: '2rem', position: 'relative', left: -90, top: 7,
                        }}
                        disabled
                        id="required"
                        label="Quantidade"
                        color="secondary"
                        value={cartProduct.quantity}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = Math.max(
                            0, parseInt(e.target.value, 10),
                          ).toString().slice(0, 12);
                        }}
                        InputProps={
                        {
                          startAdornment: (<IconButton onClick={handleDecrementQuantity}><Remove fontSize="small" /></IconButton>),
                          endAdornment: (<IconButton onClick={handleIncrementQuantity}><Add fontSize="small" /></IconButton>),
                        }
                      }
                      />
                    </Grid>
                  </Grid>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>

  );
};

export default TableCollapse;
