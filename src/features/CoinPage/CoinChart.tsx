import { Line } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';
import "./CoinChart.scss"
import { Button } from "@mui/material";

ChartJS.register(...registerables);

interface props_I {
    id: string;
    currencyCode: string;
    days: number;
    chartData: any;
    selected: number;
    setDays: (value: number) => void;
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        point: {
            radius: 1,
            hitRadius: 12
        },
        line: {
            tension: 0.1,
            fill: {
                target: 'origin',
                above: 'rgba(238, 188, 29, 0.1)',   // Area will be red above the origin
            }
        }
    }
};

const CoinChart = (props: props_I) => {
    const CustomButton = ({ children, value }: any) => {
        return <Button onClick={() => props.setDays(value)} variant={props.selected === value ? "outlined" : "text"} sx={{ color: "white", marginLeft: "4px" }}>{children}</Button>
    }

    return (
        <div className="coinChartResponsive">
            <div className="chartButtons">
                <CustomButton value={1}>1d</CustomButton>
                <CustomButton value={7}>7d</CustomButton>
                <CustomButton value={30}>30d</CustomButton>
                <CustomButton value={365}>1y</CustomButton>
            </div>
            {props.chartData?.length && (
                <Line options={options} data={{
                    labels: props.chartData.map((coinData: any) => {
                        let date = new Date(coinData[0]);
                        let time = `${date.getHours()}:${date.getMinutes()}`
                        return props.days === 1 ? time : date.toLocaleDateString()
                    }),
                    datasets: [{
                        label: `Price ${props.currencyCode} (${props.days}d)`,
                        borderColor: "#EEBC1D",
                        backgroundColor: "#EEBC1D",
                        data: props.chartData.map((coinData: any) => coinData[1])
                    }]
                }} />)}
        </div>
    )
}

export default CoinChart