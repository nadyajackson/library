import InventoryDisplay from '../datamanagment/InventoryDisplay'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Home(){
    const [Inventory, setInventory] = useState([]);

    useEffect(() =>{
            axios.get('/displayRows')
                .then(res => {
                    setInventory(res.data)
                })
                .catch(err => console.log(err))
    }, []);

    const editProduct = (updates, productSku) => {
        axios.get(`updateRow/${productSku}`, updates)
            .then(res =>{ 
                console.log(updates)
                setInventory(previous => previous.map(stuff => stuff.sku !== productSku ? stuff: res.data))
         })
            .catch(err => console.log(err))
    }

    const deleteProduct = (productSku) => {
    axios.get(`/deleteRow/${productSku}`)
        .then(res =>{
            setInventory(previous => previous.filter(stuff => stuff.sku !== productSku))
        })
        .catch(err =>console.log(err))
}
    
    const collection  = Inventory.map(stuff =>{
        console.log(editProduct)
        return <InventoryDisplay
            {...stuff}
            editProduct = {editProduct}
            deleteProduct = {deleteProduct}
            key = {stuff.sku} />
        })

    return(
        <div>
            <u><h1>NJ's Nerdy Knickknacks</h1></u>
            <h2>Full Catalog</h2>
            <div className="display">
                {collection}
            </div>
        </div>
    )
}