import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Item from './Item'
import ActionBar from './ActionBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  if (localStorage.getItem('groceries') == null) {
    localStorage.setItem('groceries', '[]')
  }
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('groceries')!))
  const [itemName, setName] = useState('')

  function handleChange(event: any, key?: number) {
    const { value, type } = event.target
    console.log(type)
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
    } else if (type == 'number') {
        const newData = items.map((item: any) => {
          if (item.key == key) {
            return {...item, count: value != null ? parseInt(value) : 0}
          } else {
            return {...item}
          }
      })
      setItems(newData)
      localStorage.setItem('groceries', JSON.stringify(newData))
    }
    else {
      setName(value)
    }
  }

  function addItem() {
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
      setName('')      
    }

  }

  function enterEvent(event: any) {
    if (event.key == 'Enter') {
      addItem()
    }
  }

  function toggleCheck(key: number) {
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

  function incrementItemCount(key: number) {
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

  function decrementItemCount(key: number) {
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

  function removeItem(key: number) {
    const msg = 'Are you sure you want to delete this item?'
    if (confirm(msg)) {
      const filtered = items.filter((data: any) => data.key != key);
      setItems(filtered)
      localStorage.setItem('groceries', JSON.stringify(filtered))
    }
  }

  function clearItems() {
    if (confirm('Are you sure you want to delete all items?')) {
      setItems([])
      localStorage.setItem('groceries', '[]')
    }
  }
  
  const display = items.map((item: any) => {
    return <Item key={item.key} name={item.name} 
    count={item.count} countType={item.countType} 
    checked={item.selected} handleToggleCheck={() => toggleCheck(item.key)}
    handleIncrement={() => incrementItemCount(item.key)}
    handleDecrement={() => decrementItemCount(item.key)} handleChange={(e: any) => handleChange(e, item.key)} delete={() => removeItem(item.key)}/>
  })


  let checkedItems = 0
  for (let i = 0; i < items.length; i++) {
    if (items[i].selected) {
      checkedItems += 1
    }
  }

  const bar = <ActionBar  onChange={handleChange}
                          inputValue={itemName}
                          onKeyPress={enterEvent}
                          handleAddItem={addItem}
                          handleClearItems={clearItems}
                          totalItems={items.length}
                          checkedItems={checkedItems} />

  return (
    <div className="app">
        {bar}
        <div className="items-container">
          { display }
      </div>
    </div>

  )
}

export default App
