import axios from "axios"
import "./styles/Carousel.scss"
import { TrendingCoins } from "../../api/api"
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const currency = useAppSelector((state) => state.crypto.currencyCode);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }
  console.log(trending)

  useEffect(() => {
    fetchTrendingCoins();
    console.log("did Fetch")
  }, [currency])

  return (
    <div className="carouselMain">Carousel</div>
  )
}

export default Carousel