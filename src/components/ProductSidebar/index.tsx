import React from 'react';
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Subtitle } from './styles';

const card = (
  <>
    <CardContent>
      <Typography gutterBottom variant="subtitle2" sx={{ fontSize: '1.80rem' }}>
        Filtrar
      </Typography>

      <Subtitle gutterBottom variant="subtitle1">
        Categoria
      </Subtitle>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Periféricos" />
        <FormControlLabel control={<Checkbox />} label="Placas de vídeo" />
        <FormControlLabel control={<Checkbox />} label="Monitores" />
        <FormControlLabel control={<Checkbox />} label="Consoles" />
        <FormControlLabel control={<Checkbox />} label="Memória RAM" />
      </FormGroup>

      <Subtitle gutterBottom variant="subtitle1">
        Marca
      </Subtitle>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="HiperX" />
        <FormControlLabel control={<Checkbox />} label="NVidea" />
        <FormControlLabel control={<Checkbox />} label="Acer" />
        <FormControlLabel control={<Checkbox />} label="AOC" />
        <FormControlLabel control={<Checkbox />} label="XPG" />
        <FormControlLabel control={<Checkbox />} label="Redragon" />
        <FormControlLabel control={<Checkbox />} label="Alienware" />
      </FormGroup>

    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </>

);
const ProductSidebar = () => (
  <>
    <Card variant="outlined">{card}</Card>
  </>
);

export default ProductSidebar;
