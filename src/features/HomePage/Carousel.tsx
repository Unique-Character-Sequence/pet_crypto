import axios from "axios"
import "./styles/Carousel.scss"
import { getTrendingCoinsURL } from "../../api/api"
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
    let response = await axios.get(getTrendingCoinsURL(currency))
    setTrending(response.data)
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


  let itemsCarousel: any[] = trending.map((el) => {
    let plus: string = ""
    if (el.price_change_percentage_24h >= 0) plus = "+"

    return (
      <div className="carouselCard">
        <img src={el.image} onClick={() => navigate(`/coins/${el.name}`)} alt={el.name}
          onDragStart={() => handleDragStart} role="presentation" draggable="false" />
        <span className="toUpper">{el.symbol}
          &nbsp;
          <span style={{ color: plus ? "rgb(14, 203, 129)" : "#d32f2f", fontWeight: "500" }}>
            {plus}{el.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span className="cardPrice">
          {symbol}&nbsp;{numberWithCommas(el.current_price)}
        </span>
      </div>
    );
  }
  )

  return (
    <div className="carouselMain">
      <AliceCarousel infinite autoPlay animationDuration={2000}
        autoPlayInterval={2000} disableButtonsControls disableDotsControls
        responsive={responsiveCarousel} mouseTracking items={itemsCarousel} />
    </div>
  )
}

export default Carousel