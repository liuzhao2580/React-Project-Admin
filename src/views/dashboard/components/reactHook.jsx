import React, { useState, createContext ,useContext,useReducer } from 'react'

const HookCreateContent = createContext()

const Children = () => {
    return (
        <h1>Children:{useContext(HookCreateContent)}</h1>
    )
}

const ChildrenReducer = () => {
    const [state, dispatch]= useReducer((state,action) =>{
        switch (action) {
            case 'add':
               return state +1
                
            case 'jian':
                return state -1
            default:
                break;
        }
    },0)
    return (
        <div>
            <p>useReducer: {state}</p>
            <button onClick={() => dispatch('add')}>增加</button>
            <button onClick={() => dispatch('jian')}>减小</button>
        </div>
    )
}

const ReactHooks = () =>{
    let [text, setText] = useState(0)
    return (
        <div>
            ReactHooks: {text}
            <button onClick={() => setText(text + 1)}>设置</button>
            <HookCreateContent.Provider value={text}>
                <Children />
                <ChildrenReducer />
            </HookCreateContent.Provider>
        </div>
    )
}

export default ReactHooks