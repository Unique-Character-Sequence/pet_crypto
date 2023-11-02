import { useParams } from "react-router-dom"
import { getCoinChartURL, getCoinDataURL } from "../../api/api"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Skeleton, Typography } from "@mui/material"
import "./CoinPage.scss"
import { useAppSelector } from "../../app/hooks"
import { numberWithCommas } from '../../utilities/utils';
import parse from 'html-react-parser';
import CoinChart from "./CoinChart"

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
  const [chartData, setChartData] = useState<any>([])
  const [days, setDays] = useState<number>(365)

  const fetchCoinChartData = async () => {
    if (coinData.id && currencyCode) {
      try {
        const response = await axios.get(getCoinChartURL(coinData.id, currencyCode.toLowerCase(), days));
        setChartData(response.data.prices);
        console.log("exit 0: ", response.data.prices);
      } catch (error) {
        console.error("exit 1: ", error);
      }
    }
  };

  let currencyCode = useAppSelector((state) => state.crypto.currencyCode)
  let currencySymbol = useAppSelector((state) => state.crypto.currencySymbol)
  let currencyCode_lc = currencyCode.toLowerCase()
  let data_currentPrice = coinData.market_data?.current_price[currencyCode_lc]
  let data_description = coinData.description?.en.split('. ').slice(0, 4).join('. ')
  let data_priceChange = coinData.market_data?.price_change_percentage_24h.toFixed(2)
  let data_marketCap = coinData.market_data?.market_cap[currencyCode_lc]
  let data_ath = coinData.market_data?.ath[currencyCode_lc]
  let data_atl = coinData.market_data?.atl[currencyCode_lc]
  let plus = data_priceChange > 0 && "+"

  useEffect(() => {
    fetchCoinData()
    fetchCoinChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCoinChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCode, coinData.id, days])

  return (
    <div className="coinPageMain">
      <div className="coinWithPrice">
        <div className="coinNameImgComp">
          {coinData.image?.small ? <img src={coinData.image?.small} alt="" /> : <Skeleton sx={{ marginRight: "10px" }} variant="rounded" width={50} height={50} />}
          {coinData.name ? <span>{coinData.name}</span> : <Skeleton variant="rounded" width={280} height={28} />}
        </div>
        <div>
          <span className="coinPriceFont">{currencySymbol}&nbsp;{data_currentPrice !== undefined && numberWithCommas(data_currentPrice)}</span>
          <span className="coinPagePercent" id={plus ? "greenPercent" : "redPercent"}>
            {plus}&nbsp;{data_priceChange !== undefined && numberWithCommas(data_priceChange)}%&nbsp;(1d)
          </span>
        </div>
      </div>
      <div className="coinPageChartAndInfo">
        <div className="coinPageChart">
          {/* Часть с графиком */}
          {chartData?.length ?
            <CoinChart setDays={setDays} selected={days} chartData={chartData} id={coinData.id} currencyCode={currencyCode} days={days} />
            :
            <Skeleton variant="rectangular" width={744} height={400} />}
        </div>
        <div className="coinPageInfo">
          {/* Часть с информацией */}
          <div>Rank:<br />#{coinData.market_cap_rank ?? null}</div>
          <div>Market cap:<br />{currencySymbol}&nbsp;{data_marketCap !== undefined && numberWithCommas(data_marketCap)} </div>
          <div>ATH:<br />{currencySymbol}&nbsp;{data_ath !== undefined && numberWithCommas(data_ath)}</div>
          <div>ATL:<br />{currencySymbol}&nbsp;{data_atl !== undefined && numberWithCommas(data_atl)}</div>
        </div>
      </div>
      <div className="coinDescription">
        {(() => {
          if (data_description) {
            return "Info: " + parse(data_description) + ".";
          }
          if (data_description === "") {
            return "";
          }
          return Array(6).fill(null).map((_, index) => <Skeleton key={index} />);
        })()}
      </div>

    </div>
  )
}

export default CoinPage