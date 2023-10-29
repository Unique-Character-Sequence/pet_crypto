import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import axios from "axios"
import { Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { getCoinListURL } from "../../api/api"
import { customHeadCell, numberWithCommas } from "../../utilities/utils"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const CoinsTable = () => {
    const [coinList, setCoinList] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>("")
    const navigate = useNavigate()

    let currencyCode = useAppSelector(state => state.crypto.currencyCode)
    let currencySymbol = useAppSelector(state => state.crypto.currencySymbol)
    const fetchCoinList = async () => {
        try {
            let response = await axios.get(getCoinListURL(currencyCode))
            setCoinList(response.data)
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

    useEffect(() => {
        fetchCoinList()
    }, [currencyCode])

    return (
        <Container sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ margin: "18px", fontFamily: "Montserrat" }}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField onChange={e => { setSearchValue(e.target.value) }}
                sx={{ marginBottom: "20px" }} fullWidth label="e.g. Bitcoin" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "rgb(238, 188, 29)", color: "black" }}>
                        <TableRow>
                            <TableCell key="thtc1" sx={customHeadCell}>Name</TableCell>
                            <TableCell key="thtc2" sx={customHeadCell} align="right">Price</TableCell>
                            <TableCell key="thtc3" sx={customHeadCell} align="right">24h&nbsp;%</TableCell>
                            <TableCell key="thtc4" sx={customHeadCell} align="right">Market Cap</TableCell>
                        </TableRow>
                    </TableHead>
                    {coinList.length > 0 && (
                        <TableBody>
                            {coinList.filter((el) =>
                                el.symbol.toLowerCase().includes(searchValue) || el.name.toLowerCase().includes(searchValue)
                            ).map((el, i) => (
                                <TableRow sx={{
                                    "&:hover": {
                                        backgroundColor: "#333"
                                    },
                                    transition: "0.17s",
                                    cursor: "pointer"
                                }} onClick={() => navigate(`/{el.symbol}`)} key={i}>
                                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                                        <img style={{ height: "36px", marginRight: "5px" }} src={el.image} alt="" />
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span>{el.name}</span>
                                            <span>{el.symbol.toUpperCase()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">{currencySymbol}&nbsp;{numberWithCommas(el.current_price)}</TableCell>
                                    <TableCell align="right">{numberWithCommas(el.price_change_percentage_24h.toFixed(2))}&nbsp;%</TableCell>
                                    <TableCell align="right">{currencySymbol}&nbsp;{numberWithCommas(el.market_cap)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
                {!coinList.length && <LinearProgress />}
            </TableContainer>
        </Container>
    );
}

export default CoinsTable