import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Item from './Item'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  if (localStorage.getItem('groceries') == null) {
    localStorage.setItem('groceries', '[]')
    console.log('set')
  }
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('groceries')!))
  const [itemName, setName] = useState('')

  function handleChange(event: any, key?: number) {
    const { value, type } = event.target
    if (type == 'select-one') {
      const newData = items.map((item: any) => {
        if (item.key == key) {
          return {...item, countType: parseInt(value)}
        } else {
          return {...item}
        }
      })
      setItems(newData)
      localStorage.setItem('groceries', JSON.stringify(newData))

      console.log(key, value)
      console.log(newData, items)
    } else {
      setName(value)
      console.log('Value: ', value)
    }
  }

  function handleclick() {
    if (itemName.length > 0) {

      const newObject = {
        key: items.length + 1,
        name: itemName,
        count: 0,
        countType: 1,
        selected: false
      }
      
      const newData = [
        ...items,
        newObject
      ]
      setItems(newData)
      localStorage.setItem('groceries', JSON.stringify(newData))
      console.log(items)
      setName('')      
    }

  }

  function enterEvent(event: any) {
    if (event.key == 'Enter') {
      handleclick()
    }
  }

  function togglecheck(key: number) {
    const newData = items.map((item: any) => {
      if (item.key == key) {
        return {...item, selected: !item.selected}
      } else {
        return {...item}
      }
    })

    setItems(newData)
    localStorage.setItem('groceries', JSON.stringify(newData))
  }

  function increment(key: number) {
    const newData = items.map((item: any) => {
      if (item.key == key) {
        return {...item, count: item.count + 1}
      } else {
        return {...item}
      }
    })

    setItems(newData)
    localStorage.setItem('groceries', JSON.stringify(newData))
  }

  function decrement(key: number) {
    const newData = items.map((item: any) => {
      if (item.key == key && item.count > 0) {
        return {...item, count: item.count - 1}
      } else {
        return {...item}
      }
    })

    setItems(newData)
    localStorage.setItem('groceries', JSON.stringify(newData))
  }

  function remove(key: number) {
    const msg = 'Are you sure you want to delete this item?'
    if (confirm(msg)) {
      const filtered = items.filter((data: any) => data.key != key);
      setItems(filtered)
      localStorage.setItem('groceries', JSON.stringify(filtered))
    }
  }

  function clear() {
    if (confirm('Are you sure you want to delete all items?')) {
      setItems([])
      localStorage.setItem('groceries', '[]')
    }
  }
  
  const display = items.map((item: any) => {
    return <Item key={item.key} name={item.name} 
    count={item.count} countType={item.countType} 
    checked={item.selected} handleToggleCheck={() => togglecheck(item.key)}
    handleIncrement={() => increment(item.key)}
    handleDecrement={() => decrement(item.key)} handleChange={(e: any) => handleChange(e, item.key)} delete={() => remove(item.key)}/>
  })

  const clearIsDisabled = items.length > 0 ? false : true
  const clearBtnText = items.length > 0 ? `Clear (${items.length})` : 'Clear'

  return (
    <div className="app">
        <div className="input-container">
          <input type="text" className='form-control' placeholder='Add item' onChange={handleChange} value={itemName} onKeyPress={enterEvent}/>
          <button className='btn btn-primary btn-disabled' onClick={handleclick}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className='btn btn-danger' id='clear' onClick={clear} disabled={clearIsDisabled}>{clearBtnText}</button>
        </div>
        <div className="items-container">
          { display }
      </div>
    </div>

  )
}

export default App
