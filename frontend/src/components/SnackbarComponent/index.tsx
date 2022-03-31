import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Creators as SnackbarCreator, ISnackbar } from '../../redux/modules/Snackbar/ducks';
import { IState } from '../../redux/store';

interface ISnackbarProps {
  snackbars : ISnackbar[];
}

const SnackbarComponent: React.FC<ISnackbarProps> = ({ snackbars }: ISnackbarProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    if (snackbars) {
      snackbars.forEach(({
        key, message, variant,
      }) => {
        enqueueSnackbar(message, {
          key,
          variant: variant || 'default',
          action: () => (
            <IconButton
              sx={{ padding: '12px, 0, 0, 0', width: '100%', height: '100%' }}
              onClick={() => {
                closeSnackbar(key);
                dispatch(SnackbarCreator.closeSnackbar(key));
              }}
            >
              <Close />
            </IconButton>
          ),
          onClose: () => {
            dispatch(SnackbarCreator.closeSnackbar(key));
          },
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        });
      });
    }
  }, [closeSnackbar, dispatch, enqueueSnackbar, snackbars]);

  return (
    <></>
  );
};

const mapStateToProps = (state: IState) => ({ snackbars: state.snackbars.snackbars });

export default connect(mapStateToProps)(SnackbarComponent);
