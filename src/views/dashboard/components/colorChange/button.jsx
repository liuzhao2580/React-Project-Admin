import React, { Fragment ,useContext} from 'react'
import {CreateContext} from './index'
const ButtonDom = () => {
    const {dispatch} = useContext(CreateContext)
    return (
        <Fragment>
            <button onClick={()=>dispatch({type: 'update_color', color: 'pink'})}>改变为 pink</button>
            <button onClick={()=>dispatch({type: 'update_color', color: 'skyblue'})}>改变为 skyblue</button>
        </Fragment>
    )
}

export default ButtonDom