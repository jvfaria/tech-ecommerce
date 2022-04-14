/* eslint-disable jsx-a11y/label-has-associated-control */
import { AccountBox } from '@mui/icons-material';
import {
  Avatar,
  Box, Grid, IconButton, styled, Typography,
} from '@mui/material';
import { upload } from '@testing-library/user-event/dist/upload';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/auth';
import { Creators } from '../../redux/modules/UploadAvatar/ducks';
import { DashboardContainer } from './styles';

const Input = styled('input')({
  display: 'none',
});

const AccountDashboard: React.FC = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  console.log('dashboard auth');

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const uploadedAvatar = localStorage.getItem('@TechEcommerce:avatar');
    dispatch(Creators.getAvatarRequest('avatar.jpg'));
    if (uploadedAvatar) {
      const parsedAvatar = JSON.parse(uploadedAvatar);

      setAvatar(parsedAvatar.fileDownloadUri);
    }
  }, [dispatch]);

  const handleAvatarUpload = useCallback((event: any) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    dispatch(Creators.uploadAvatarRequest(formData));

    const uploadedAvatar = localStorage.getItem('@TechEcommerce:avatar');

    if (uploadedAvatar) {
      const parsedAvatar = JSON.parse(uploadedAvatar);

      setAvatar(parsedAvatar.fileDownloadUri);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [dispatch]);

  return (
    <Box flexGrow={1}>
      <DashboardContainer>
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '5px',
            background: '#003A4D',
            padding: '10px',
          }}
        >
          <AccountBox
            fontSize="large"
            sx={{
              color: '#fff;', backgroundColor: 'transparent',
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: '1.75rem',
              fontWeight: '500',
              color: '#fff',
              paddingLeft: '2rem',
            }}
          >
            Informações da conta
          </Typography>
        </Grid>

        <Grid container item columnSpacing={2} sx={{ padding: '5rem', marginTop: '3rem' }}>
          <Grid
            container
            item
            lg={4}
            md={12}
            xs={12}
            sm={12}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" onChange={handleAvatarUpload} />
              <IconButton aria-label="upload picture" component="span">
                <Avatar src={avatar || '/broken-image.png'} sx={{ width: '15rem', height: '15rem' }} />
              </IconButton>
            </label>
          </Grid>
          <Grid
            container
            item
            lg={6}
            md={12}
            xs={12}
            sm={12}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: '2.5rem' }}>
              <strong>Nome de usuário:</strong>
              { ' ' }
              {auth.user.username}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: '2.5rem' }}>
              <strong>Tipo de conta:</strong>
              { ' ' }
              {auth.user.authorities[0].substring(5)}
            </Typography>
          </Grid>
        </Grid>
      </DashboardContainer>
    </Box>
  );
};
export default AccountDashboard;
