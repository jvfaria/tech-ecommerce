import { TabContext, TabList } from '@mui/lab';
import {
  Avatar, Grid, Tooltip,
} from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/backgrounds/TechLogoBackground.png';
import {
  CustomTab, StyledBadge, WhiteShoppingCartOutlinedIcon,
} from './styles';

const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(localStorage.getItem('Selected::navbar') || 'home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem('Selected::navbar', newValue);
    navigate(`/${newValue}`);
  };

  const wipeNavTabIndicator = () => {
    setValue('');
    localStorage.setItem('Selected::navbar', '');
  };

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      alignItems="center"
    >
      <Grid item xs={12} md={3}>
        <img src={logo} alt="logo" style={{ maxWidth: '287px' }} />
      </Grid>

      <Grid item xs={10} md={6}>
        <TabContext value={value}>
          <TabList centered sx={{ color: '#6BD4E9' }} TabIndicatorProps={{ style: { color: '#181A18', background: '#6BD4E9' } }} onChange={handleChange}>
            <CustomTab label="HOME" value="home" />
            <CustomTab label="PRODUTOS" value="products" />
            <CustomTab label="SOBRE" value="about" />
          </TabList>
        </TabContext>
      </Grid>

      <Grid item xs={2} md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/cart" onClick={wipeNavTabIndicator}>
          <StyledBadge badgeContent={4} color="primary">
            <Tooltip title="4 itens" arrow>
              <Avatar sx={{ bgcolor: '#4fa8ba' }}>
                <WhiteShoppingCartOutlinedIcon />
              </Avatar>
            </Tooltip>
          </StyledBadge>
        </Link>

      </Grid>

    </Grid>

  );
};

export default MainHeader;
