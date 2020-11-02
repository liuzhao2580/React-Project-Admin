import produce from 'immer'

const getKey = (str, flag) => {
    const i = str.indexOf(flag)
    return str.substring(i + 1, str.length + 1)
}

/**
 * 处理函数
 * @param {any} state  
 * @param {any} action  
 * @param {any} reducers  
 * @param {any} namespace  命名空间
 */
export const handleActions = ({ state, action, reducers, namespace = '' }) =>
    Object.keys(reducers)
        .map(key => namespace + '/' + key)
        .includes(action.type)
        ? produce(state, draft => reducers[getKey(action.type, '/')](draft, action))
        : state
