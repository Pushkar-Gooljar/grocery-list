import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function GroceryItem(props: any) {
    const checkedClassName = props.checked ? "btn btn-success" : "btn btn-secondary"
    const [count, setCount] = useState(0)

    return (
        <div className='item'>
            <span className='item-name'>{props.name}</span>
            <div className="mobile-name-container">
                <span className='item-name-m'>{props.name}</span>
                <div className="btn-container-m">
                    <button className={checkedClassName} style={{marginRight: "5px"}} onClick={props.handleToggleCheck}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button className="btn btn-danger" onClick={props.delete}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
            <div className="count-container">
            <div className='number-selector'>
                <button className="decrement" onClick={props.handleDecrement}>
                <FontAwesomeIcon icon={faMinus} />
                </button>
                <input className='num-input' onChange={props.handleChange}
                type="number" value={props.count}/>
                <button className="increment" onClick={props.handleIncrement}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                
            </div>
            <select className="form-select" aria-label="Default select example" id='item-type' defaultValue={props.countType} onChange={props.handleChange}>
                <option value="1">Items</option>
                <option value="2">grammes</option>
                <option value="3">kilogrammes</option>
                <option value="4">Litres</option>
                <option value="5">Packets</option>
                <option value="6">Bags</option>
            </select>
            </div>
            <div className="btn-container">
            <button className={checkedClassName} style={{marginRight: "5px"}} onClick={props.handleToggleCheck}>
                <FontAwesomeIcon icon={faCheck} />
            </button>
            <button className="btn btn-danger" onClick={props.delete}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            </div>
            
        </div>
    )
}