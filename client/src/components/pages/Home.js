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
        axios.put(`/updateRow/${productSku}`, updates)

            .then(res =>{ 
                setInventory(previous => previous.map(stuff => stuff.sku !== productSku ? stuff: res.data))
         })
            .catch(err => console.log(err))
    }

    const deleteProduct = (productSku) => {
    axios.delete(`/deleteRow/${productSku}`)
        .then(res =>{
            setInventory(previous => previous.filter(stuff => stuff.sku !== productSku))
        })
        .catch(err =>console.log(err))
}
    
    const collection  = Inventory.map(stuff =>
        <InventoryDisplay
            {...stuff}
            submit = {editProduct}
            deleteProduct = {deleteProduct}
            key = {stuff.sku} />)

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