import React from 'react'
import "./Banner.scss"
import { Container, Typography } from '@mui/material'

const styling = {
  fontWeight: 'bold',
  fontFamily: 'Montserrat',
  textShadow: '6px 6px 6px rgba(0, 0, 0, 0.5)'
  // marginTop: 15
  // marginBottom: 15
}

const subtitleStyle = {
  color: "darkgrey",
  fontFamily: "Montserrat",
  textShadow: '2px 2px 1px rgba(0, 0, 0, 1)'
}

const Banner = () => {
  return (
    <div className="bannerBg">
      <div className="bannerTransparentBg">
        <Container className="bannerContent">
          <div className="bannerTagline">
            <Typography variant="h2" sx={styling}>
              Big Lapik Crypto
            </Typography>
            <Typography variant="subtitle2" sx={subtitleStyle}>
              Get all the info regarding your favorite cryptocurrencies
            </Typography>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Banner