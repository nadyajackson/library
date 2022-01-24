import {useState} from "react";
import AddForm from "./addForm";

export default function InventoryDisplay({product, sku, color, inventoryCount,deleteProduct, editProduct}){
    const [editToggle, setEditToggle] = useState(false)
return(
    <div id="boxes">
        {!editToggle?
        <>
        <div>
        <div >
            <h3>{product}</h3>
            <h4>color: {color}</h4>
            <p>Number in Inventory: <b> {inventoryCount} </b> </p>       
        </div>
        <button 
                onClick= {() => deleteProduct(sku)} 
                className='deleteBtn'>
                Delete
        </button>
        <button 
                onClick={() => setEditToggle(prevToggle => !prevToggle)} 
                className='editBtn'>
                Edit
        </button>
        </div>
        </>
        :
        <>
        <AddForm 
            product={product}
            color={color}
            inventoryCount={inventoryCount}
            sku={sku}
            btnText = 'Submit Edit'
            submit={editProduct}
        />
        <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close</button>
        </>
        }       
    </div>


)}








