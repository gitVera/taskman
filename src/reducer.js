
const initialState = {
    notelist: [
        { id: 1, text: "Такая заметка", ready: false, status: 'middle' },
        { id: 2, text: "Важная заметка", ready: true, status: 'high' },
        { id: 3, text: "Еще одна заметка", ready: false, status: 'low' },
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
     case 'CREATE_NOTE':
      return {
          ...state,
          notelist: [
              ...state.notelist,
              {     id: state.notelist[state.notelist.length-1].id + 1,
                  ready: false,
                  ...action.payload
              }
            ] 
      }
      case 'DELETE_NOTE':
        return {
            ...state,
            notelist: state.notelist.filter(note => note.id !== action.id) 
        }
    case 'UPDATE_NOTE_STATUS':
        const updatedItems = state.notelist.map(item => {
            if (item.id === action.payload.id) {
              item.ready = action.payload.ready
            }
            return item
        })
        return {
            ...state,
            notelist: [ ...updatedItems ]
        }
     default:
      return state
    }
}