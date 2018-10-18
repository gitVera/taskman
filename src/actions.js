export const createNote = data => {
    return {
      type: 'CREATE_NOTE',
      payload: {
        ...data,
      },
    };
  }

export const deleteNote = id => {
    return {
        type: 'DELETE_NOTE',
        id,
    };
}

export const updateNoteStatus = data => {
    return {
        type: 'UPDATE_NOTE_STATUS',
        payload: {
            ...data,
        },
    };
}
  