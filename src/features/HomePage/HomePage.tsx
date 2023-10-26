import Banner from "./Banner"
import "./styles/HomePage.scss"
import CoinsTable from './CoinsTable';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CoinsTable />
      {/* <div className="mockUp_style">
        {"{Placeholder for Future Features}"}
      </div> */}
    </div>
  )
}

export default HomePage