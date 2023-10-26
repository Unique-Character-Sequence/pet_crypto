import axios from "axios"
import "./styles/Carousel.scss"
import { TrendingCoins } from "../../api/api"
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useNavigate } from "react-router-dom";
import { numberWithCommas, responsiveCarousel } from "../../utilities/utils";

const Carousel = () => {
  const navigate = useNavigate()
  const [trending, setTrending] = useState<any[]>([])
  const currency = useAppSelector((state) => state.crypto.currencyCode);
  const symbol = useAppSelector((state) => state.crypto.currencySymbol);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  const handleDragStart = (e: React.FormEvent<HTMLInputElement>) => e.preventDefault()

  useEffect(() => {
    try {
      fetchTrendingCoins();
      console.log("did Fetch")
    } catch (error) {
      console.log("Error fetching data:", error)
    }
  }, [currency])


  let itemsCarousel: any[] = trending.map((_, i, arr) => {
    let plus: string = ""
    if (arr[i].price_change_percentage_24h >= 0) plus = "+"

    return (
      <div className="carouselCard">
        <img src={arr[i].image} onClick={() => navigate(`/coins/${arr[i].name}`)} alt={arr[i].name}
          onDragStart={() => handleDragStart} role="presentation" draggable="false" />
        <span className="toUpper">{arr[i].symbol}
          &nbsp;
          <span style={{ color: plus ? "#388e3c" : "#d32f2f", fontWeight: "500" }}>
            {plus}{arr[i].price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span className="cardPrice">
          {symbol}&nbsp;{numberWithCommas(arr[i].current_price)}
        </span>
      </div>
    );
  }
  )

  return (
    <div className="carouselMain">
      <AliceCarousel infinite={true} autoPlay={true} animationDuration={2000}
        autoPlayInterval={2000} disableButtonsControls={true} disableDotsControls={true}
        responsive={responsiveCarousel} mouseTracking items={itemsCarousel} />
    </div>
  )
}

export default Carousel