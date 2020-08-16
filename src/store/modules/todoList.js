// state
const todolistArr = {
    inputValue: 'hello world',
    list: [
        {
            key: 1,
            title: 'Vue'
        },
        {
            key: 2,
            title: 'React'
        },
        {
            key: 3,
            title: 'Angular'
        }
    ]
}

// reducer
const todoList = (state = todolistArr, action) => {
    switch (action.type) {
        case 'ACT_insertItem':
            return {
                ...state
            }
        default:
            return state
    }
}
export default todoList
