import axios from "axios"
import "./styles/Carousel.scss"
import { TrendingCoins } from "../../api/api"
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [trending, setTrending] = useState<any[]>([])
  const currency = useAppSelector((state) => state.crypto.currencyCode);
  const symbol = useAppSelector((state) => state.crypto.currencySymbol);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  try {
    console.log(trending[0].image)
  } catch (error) {
    console.log(error)
  }

  const handleDragStart = (e: React.FormEvent<HTMLInputElement>) => e.preventDefault()

  useEffect(() => {
    try {
      fetchTrendingCoins();
      console.log("did Fetch")
    } catch (error) {
      console.log(error)
    }
  }, [currency])

  let numberWithCommas = (num: number | string) => {
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  const responsive = {
    0: { items: 3 },
    568: { items: 4 },
    1024: { items: 5 },
    1366: { items: 6 },
  };

  const navigate = useNavigate()

  let itemsCarousel: any[] = trending.map((_, i, arr) => {
    let plus = ""
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


  console.log(itemsCarousel);

  return (
    <div className="carouselMain">
      <AliceCarousel infinite={true} autoPlay={true} animationDuration={2000}
        autoPlayInterval={2000} disableButtonsControls={true} disableDotsControls={true}
        responsive={responsive} mouseTracking items={itemsCarousel} />
    </div>
  )
}

export default Carousel