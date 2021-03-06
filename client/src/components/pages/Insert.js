import axios from "axios"
import {useState, useEffect} from 'react'
import InventoryDisplay from '../datamanagment/InventoryDisplay'
import AddForm from "../datamanagment/addForm";

export default function Insert(){
    const [Inventory, setInventory] = useState([]);

    const addInventory = (newStuff) => {
        axios.get('/insertFirst', newStuff)
            .then(res =>{
                console.log(newStuff)
                setInventory(previous => [...previous, newStuff])
                // axios.get('http://localhost:9000/displayRows')
                // .then(res => {
                //     console.log(newStuff)
                //     setInventory(res.data)
                // })
                //.catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    };
  

    useEffect(() =>{
        axios.get('/displayRows')
            .then(res => {
                setInventory(res.data)
            })
            .catch(err => console.log(err))
    }, []);



    const collection  = Inventory.map(stuff =>
        <InventoryDisplay
            {...stuff}
            key = {stuff.sku} />)

    return(
        <div >
            <h1>Yay! New stuff is here!!!!</h1>
            <div className="display">
            <AddForm 
                btnText='Catalog'
                addInventory={addInventory}
            />
           
            {collection}
            </div>
        </div>
    )
}