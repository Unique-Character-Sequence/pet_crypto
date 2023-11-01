import "./styles/Banner.scss"
import { Container, Typography } from '@mui/material'
import Carousel from './Carousel'

const subtitleStyle = {
  color: "darkgrey",
  fontFamily: "Montserrat",
  textShadow: '2px 2px 1px rgba(0, 0, 0, 1)',
  margin: "0 20px 0 20px "
}

const Banner = () => {
  return (
    <div className="bannerBg">
      <div className="bannerTransparentBg">
        <Container className="bannerContent">
          <div className="bannerTagline">
            <div className="bigLapikText">
              Big Lapik Crypto
            </div>
            <div className="smallTextHide">
              <Typography variant="subtitle2" sx={subtitleStyle}>
                Get all the info regarding your favorite cryptocurrencies
              </Typography>
            </div>
          </div>
          <Carousel />
        </Container>
      </div>
    </div>
  )
}

export default Banner