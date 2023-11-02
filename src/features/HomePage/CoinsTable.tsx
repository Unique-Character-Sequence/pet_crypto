import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import axios from "axios"
import { Container, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { getCoinListURL } from "../../api/api"
import { customHeadCell, numberWithCommas, toQwerty } from "../../utilities/utils"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import "./styles/CoinsTable.scss"

const CoinsTable = () => {
    const [coinList, setCoinList] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const navigate = useNavigate()
    const itemsPerPage = 15;
    const handlePagination = () => handleSearch().slice((page - 1) * itemsPerPage, page * itemsPerPage)
    const handleSearch = () => coinList.filter((el) =>
        el?.symbol.toLowerCase().includes(toQwerty(searchValue)) || el?.name.toLowerCase().includes(toQwerty(searchValue))
    )
    const pageCount = Math.ceil(handleSearch().length / itemsPerPage)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currencyCode])

    return (
        <Container sx={{ textAlign: "center" }}>
            <div className="cryptoByCapText">
                Cryptocurrency Prices by Market Cap
            </div>
            <TextField onChange={e => { setSearchValue(e.target.value.toLowerCase()) }}
                sx={{ marginBottom: "20px" }} fullWidth label="e.g. Bitcoin" />
            <div className="paginationCoins">
                <Pagination count={pageCount} onChange={(_, p) => setPage(p)} />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "rgb(238, 188, 29)", color: "black" }}>
                        <TableRow>
                            <TableCell key="thtc0" sx={{ ...customHeadCell, padding: "0 0 0 16px", textAlign: "left" }}>#</TableCell>
                            <TableCell key="thtc1" sx={customHeadCell}>Name</TableCell>
                            <TableCell key="thtc2" sx={customHeadCell} align="right">Price</TableCell>
                            <TableCell key="thtc3" sx={customHeadCell} align="right">24h&nbsp;%</TableCell>
                            <TableCell key="thtc4" sx={customHeadCell} align="right">Market Cap</TableCell>
                        </TableRow>
                    </TableHead>
                    {coinList.length > 0 && (
                        <TableBody>
                            {handlePagination().map((el, i) => {
                                let price_change = 0;
                                if (el.price_change_percentage_24h !== null) price_change = el.price_change_percentage_24h.toFixed(2)
                                let isProfit = price_change > 0
                                return (
                                    <TableRow sx={{
                                        "&:hover": {
                                            backgroundColor: "rgb(24, 24, 24)"
                                        },
                                        transition: "0.17s",
                                        cursor: "pointer"
                                    }} onClick={() => navigate(`/coins/${el.id}`)} key={el.id}>
                                        <TableCell sx={{ padding: "0 0 0 16px", textAlign: "left" }}>{el.market_cap_rank}</TableCell>
                                        <TableCell sx={{ display: "flex", alignItems: "center" }}>
                                            <img style={{ height: "36px", marginRight: "1em" }} src={el.image} alt="" />
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <span>{el.name}</span>
                                                <span style={{ color: "#eee", fontWeight: "500" }}>{el.symbol.toUpperCase()}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{currencySymbol}&nbsp;{numberWithCommas(el.current_price)}</TableCell>
                                        <TableCell sx={{ color: (price_change >= 0 ? "rgb(14, 203, 129)" : "#d32f2f"), fontWeight: "500" }} align="right">
                                            {isProfit && "+"}{numberWithCommas(price_change)}&nbsp;%
                                        </TableCell>
                                        <TableCell align="right">{currencySymbol}&nbsp;{numberWithCommas(el.market_cap)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    )}
                </Table>
                {!coinList.length && <LinearProgress />}
            </TableContainer>
            <div className="paginationCoins" id="bottom">
                <Pagination count={pageCount} onChange={
                    (_, p) => {
                        setPage(p)
                        window.scroll(0, 470)
                    }
                } />
            </div>
        </Container >
    );
}

export default CoinsTable