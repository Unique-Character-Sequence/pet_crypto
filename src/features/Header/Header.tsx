import { AppBar, Container, Typography, Toolbar, Select, MenuItem } from '@mui/material';
import biglapik from './big lapik.png'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CurrencyCode, CurrencySymbol, setCurrency } from '../cryptoSlice';

let textStyle = {
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer'
}

let selectStyle = { width: 85, height: 40, marginRight: 15 }


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currencySymbol: CurrencySymbol = useAppSelector((state) => state.crypto.currencySymbol)
  const currencyCode: CurrencyCode = useAppSelector((state) => state.crypto.currencyCode)
  const navToHome = () => navigate("/")

  return (
    <AppBar color="transparent" position='static'>
      <Container>
        <Toolbar>
          <img onClick={navToHome} style={{cursor: 'pointer'}} className="smallPic" src={biglapik} alt="" />
          <Typography onClick={navToHome} variant='h6' sx={textStyle}>Big Lapik {currencySymbol}</Typography>
          <Select onChange={(e) => dispatch(setCurrency(e.target.value as CurrencyCode))} sx={selectStyle}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"MDL"}>MDL</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Header