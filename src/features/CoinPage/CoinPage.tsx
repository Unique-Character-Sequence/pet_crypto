import { useParams } from "react-router-dom"
import { getCoinDataURL } from "../../api/api"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Box, Paper, Skeleton, Typography } from "@mui/material"
import "./CoinPage.scss"
import { useAppSelector } from "../../app/hooks"
import { numberWithCommas } from "../../utilities/utils"
import parse from 'html-react-parser';

const CoinPage = () => {
  let { id = "" } = useParams()
  const [coinData, setCoinData] = useState<any>({})
  const fetchCoinData = async () => {
    try {
      let response = await axios.get(getCoinDataURL(id))
      setCoinData(response.data)
      toast.success('All right', {
        style: { borderRadius: '50px', background: '#333', color: '#fff' }
      })
    } catch (error: any) {
      toast.error(error.message, {
        style: { borderRadius: '50px', background: '#333', color: '#fff' }
      })
      console.error(error)
    }
  }
  let currencyCode = useAppSelector((state) => state.crypto.currencyCode)
  let currencySymbol = useAppSelector((state) => state.crypto.currencySymbol)
  let data_currentPrice = coinData?.market_data?.current_price[currencyCode.toLowerCase()]
  let data_description = coinData?.description?.en.split('. ').slice(0, 2).join('. ')

  useEffect(() => {
    fetchCoinData()
  }, [])
  console.log(coinData?.market_data?.current_price)
  console.log(currencyCode)

  return (
    <div>
      <div className="coinWithPrice">
        <div className="coinNameImgComp">
          {coinData?.image?.small ? <img src={coinData?.image?.small} alt="" /> : <Skeleton sx={{ marginRight: "10px" }} variant="rounded" width={50} height={50} />}
          {coinData?.name ? <span>{coinData?.name}</span> : <Skeleton variant="rounded" width={280} height={28} />}
        </div>
        {data_currentPrice &&
          <Paper sx={{ position: "relative", top: "4px", marginLeft: "10px", width: "fit-content", padding: "8px" }}>
            <span className="coinPriceFont">{currencySymbol}&nbsp;{numberWithCommas(data_currentPrice)}</span>
          </Paper>}
      </div>
      <Typography sx={{ fontFamily: "Montserrat", padding: "0px 25px 15px 25px", textAlign: "justify" }} variant="subtitle1">
        {data_description ? `${parse(data_description)}.` : <><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>}
      </Typography>
    </div>
  )
}

export default CoinPage