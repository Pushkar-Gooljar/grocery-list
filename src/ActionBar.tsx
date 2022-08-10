import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ActionBar(props: any) {

    const clearIsDisabled = props.totalItems > 0 ? false : true
    const clearBtnText = props.totalItems > 0 ? `Clear (${props.totalItems})` : 'Clear'

    return (
        <div className="input-container">
            <div className="input-container-top"
            >
                            <input type="text"
                   className='form-control'
                   placeholder='Add item'
                   onChange={props.onChange}
                   value={props.inputValue}
                   onKeyPress={props.onKeyPress}/>
            
            <button className='btn btn-primary btn-disabled' onClick={props.handleAddItem}>
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <button 
                className='btn btn-danger' 
                id='clear' 
                onClick={props.handleClearItems} 
                disabled={clearIsDisabled}>

                {clearBtnText}
                
            </button>

            </div>
            <div className="input-container-bottom">
                <div className="title">
                    <span className="title-text">Total: </span>
                    <span className="badge bg-primary">{props.totalItems}</span>
                </div>

                <div className="title">
                    <span className="title-text">Checked: </span>
                    <span className="badge bg-success">{props.checkedItems}</span>
                </div>

                <div className="title">
                    <span className="title-text">Remaining: </span>
                    <span className="badge bg-warning">{props.totalItems - props.checkedItems}</span>
                </div>
            </div>
      </div>
    )
}