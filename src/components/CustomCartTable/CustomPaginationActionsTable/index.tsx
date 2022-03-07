import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Typography,
} from '@mui/material';
import { connect, useSelector } from 'react-redux';
import { ICartItem } from '../../../redux/modules/Cart/types';
import { IState } from '../../../redux/store';
import { formatNumberCurrency } from '../../../utils/FormatNumberCurrency';
import { TablePaginationActions } from '../TablePaginationActions';
import TableCollapse from './TableColllapse';

interface ICartTableProps {
  cart: ICartItem[];
}

const CustomPaginationActionsTable: React.FC<ICartTableProps> = ({ cart }: ICartTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { total } = useSelector((state: IState) => state.cart);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cart.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Produto</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? cart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : cart
          ).map((cartItem) => (
            <TableCollapse cartProduct={cartItem} />
          ))}
          {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={5} />
          </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              labelRowsPerPage="Itens por página"
              colSpan={3}
              align="right"
              count={cart.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Itens por pagina',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>

          <TableRow>
            <TableCell
              colSpan={4}
              align="right"
              sx={{ backgroundColor: '#e6e6e6' }}
            >
              <Typography variant="body1" fontWeight="bold">Total</Typography>
            </TableCell>
            <TableCell
              colSpan={4}
              sx={{ backgroundColor: '#e6e6e6' }}
            >
              <Typography variant="body1" color="#FF8E3D" fontWeight="bold">
                {formatNumberCurrency(total)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
function mapStateToProps(state: IState) {
  return {
    cart: state.cart.items,
  };
}

export default connect(mapStateToProps)(CustomPaginationActionsTable);

/* <React.Fragment>
<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
  <TableCell>
    <IconButton
      aria-label="expand row"
      size="small"
      onClick={() => setOpen(!open)}
    >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  </TableCell>
  <TableCell component="th" scope="row">
    {row.name}
  </TableCell>
  <TableCell align="right">{row.calories}</TableCell>
  <TableCell align="right">{row.fat}</TableCell>
  <TableCell align="right">{row.carbs}</TableCell>
  <TableCell align="right">{row.protein}</TableCell>
</TableRow>
<TableRow>
  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          History
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Total price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.history.map((historyRow) => (
              <TableRow key={historyRow.date}>
                <TableCell component="th" scope="row">
                  {historyRow.date}
                </TableCell>
                <TableCell>{historyRow.customerId}</TableCell>
                <TableCell align="right">{historyRow.amount}</TableCell>
                <TableCell align="right">
                  {Math.round(historyRow.amount * row.price * 100) / 100}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  </TableCell>
</TableRow>
</React.Fragment> */
