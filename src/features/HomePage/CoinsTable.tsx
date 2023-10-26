import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import axios from "axios"
import { Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { getCoinListURL } from "../../api/api"
import { numberWithCommas } from "../../utilities/utils"

const CoinsTable = () => {
    const customHeadCell = { color: "black", fontFamily: "Montserrat", fontWeight: "600" }
    const [coinList, setCoinList] = useState<any[]>([])
    const [searchBar, setSearchBar] = useState<string>("")

    let currencyCode = useAppSelector(state => state.crypto.currencyCode)
    let currencySymbol = useAppSelector(state => state.crypto.currencySymbol)
    const fetchCoinList = async () => {
        let response = await axios.get(getCoinListURL(currencyCode))
        setCoinList(response.data)
    }

    useEffect(() => {
        try {
            fetchCoinList()
        } catch (error) {
            console.log("Error fetching coin list", error);
        }
    }, [currencyCode])

    return (
        <Container sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ margin: "18px", fontFamily: "Montserrat" }}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField onChange={e => { setSearchBar(e.target.value) }}
                sx={{ marginBottom: "20px" }} fullWidth label="e.g. Bitcoin" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "rgb(238, 188, 29)", color: "black" }}>
                        <TableRow>
                            <TableCell sx={customHeadCell}>Name</TableCell>
                            <TableCell sx={customHeadCell} align="right">Price</TableCell>
                            <TableCell sx={customHeadCell} align="right">24h&nbsp;%</TableCell>
                            <TableCell sx={customHeadCell} align="right">Market Cap</TableCell>
                        </TableRow>
                    </TableHead>
                    {coinList.length ? (
                        <TableBody>
                            {coinList.map((el, i) => (
                                <TableRow key={el.i}>
                                    <TableCell><img src={el.name} alt="" />{el.name}</TableCell>
                                    <TableCell align="right">{currencySymbol}&nbsp;{numberWithCommas(el.current_price)}</TableCell>
                                    <TableCell align="right">{numberWithCommas(el.price_change_percentage_24h)}&nbsp;%</TableCell>
                                    <TableCell align="right">{currencySymbol}&nbsp;{numberWithCommas(el.market_cap)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <LinearProgress />
                    )}
                </Table>
            </TableContainer>
        </Container>
    );
}

export default CoinsTable