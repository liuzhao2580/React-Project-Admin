import React, {createContext, useReducer} from 'react'
import ButtonDom from './button'
const renduce = (state, action) => {
    switch (action.type) {
        case 'update_color':
            return action.color
        default:
            return state;
    }
}
export const CreateContext = createContext()
const ColorChange = () => {
    const [color, dispatch] = useReducer(renduce, 'red')
    
    return (
        <div>
            <p style={{color}}>ColorChange</p>
            <CreateContext.Provider value={{color, dispatch}}>
                <ButtonDom />
            </CreateContext.Provider>
        </div>
    )
}

export default ColorChange