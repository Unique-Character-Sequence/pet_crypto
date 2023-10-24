import { AppBar, Container, Typography, Toolbar, Select, MenuItem } from '@mui/material';
import biglapik from './big lapik.png'
import { useNavigate } from 'react-router-dom'

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

  return (
    <AppBar color="transparent" position='static'>
      <Container>
        <Toolbar>
          {/* <img className="smallPic" src={biglapik} alt="" /> */}
          <Typography onClick={() => navigate("/")} variant='h6' sx={textStyle}>Big Lapik</Typography>
          <Select sx={selectStyle}>
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