import {useState} from "react";


export default function AddForm({product, color, sku, inventoryCount, submit, btnText, }){
    const initialInputs = {product: product || '', color: color || '', inventoryCount: inventoryCount || ''};
    const [inputs, setInputs] = useState(initialInputs);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs(prevInputs => ({...prevInputs, [name]:value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(inputs, sku);
        setInputs(initialInputs);
    }


    return(
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                name='product'
                value={inputs.product}
                onChange= {handleChange}
                placeholder='Product'/>

            <input 
                type='text'
                name='color'
                value={inputs.color}
                onChange= {handleChange}
                placeholder='color'/>

            <input 
                type='number'
                name='inventoryCount'
                value={inputs.inventoryCount}
                onChange= {handleChange}
                placeholder='1'/>
                
            <button>{btnText}</button>
        </form>
)
}