import produce from 'immer'

/**
 * 使用 immer 改造 reducer
 */

export function createReducer<State>(
  cases: {
    [key: string]: (s: State, action) => State | any
  } = {},
  defaultState: State
) {
  return (state = defaultState, action) =>
    produce(state, (draft: State) => {
      if (action && action.type && cases[action.type] instanceof Function) {
        cases[action.type](draft, action)
      }
    })
}
