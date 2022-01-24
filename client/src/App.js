import { BrowserRouter } from "react-router-dom"
import Body from "./components/container/Body"
import Header from "./components/container/Header"

export default function App(){
    return(
        <BrowserRouter>
        <>
        <Header />
        <Body />
        </>
        </BrowserRouter>
    )
}