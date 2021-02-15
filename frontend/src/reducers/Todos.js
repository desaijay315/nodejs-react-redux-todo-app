import * as actionTypes from '../actions/types';

const TodosReducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.ADD_BUCKET: {
            return { ...state, buckets: [...state.buckets, payload] }
        }
        case actionTypes.GET_BUCKETS: {
            return { ...state, buckets: payload, loading: false }
        }
        case actionTypes.GET_TODOS: {
            return { ...state, todos: payload, loading: false }
        }
        case actionTypes.ADD_TODO: {
            return { ...state, todos: [...state.todos, payload] }
        }
        case actionTypes.GET_TODO: {
            return { ...state, todo: payload, loading: false }
        }
        case actionTypes.UPDATE_TODO: {
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo._id === payload.todoId ? { ...todo, todos: payload.todos } : todo
                ),
                loading: false
            }
        }
        case actionTypes.DELETE_TODO: {
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== payload),
                loading: false
            };
        }
        case actionTypes.ADD_TASK: {
            const todoItem = {
                value: action.payload.value,
                completed: false,
                bucketName: action.payload.bucketName
            };

            return { ...state, items: [...state.items, todoItem] };
        }
        case actionTypes.CANCEL_EDIT_TASK: {
            const newState = state.items.length ? { ...state, editingItem: {} } : { ...state };
            return newState;
        }

        case actionTypes.DELETE_TASK: {
            const items = state.items.filter(({ id }) => id !== action.payload.id);
            return { ...state, items };
        }

        case actionTypes.EDIT_TASK: {
            const items = state.items.map(item => {
                if (item.id === action.payload.modifiedItem.id) {
                    item.value = action.payload.modifiedItem.value;
                }

                return item;
            });

            return { ...state, items, editingItem: {} };
        }

        case actionTypes.COMPLETE_TASK: {
            const items = state.items.map(item => {
                if (item.id === action.payload.modifiedItem.id) {
                    const newItem = { ...item };
                    newItem.completed = !newItem.completed;
                    return newItem;
                }

                return item;
            });

            return { ...state, items };
        }

        case actionTypes.SELECT_EDIT_TASK: {
            const item = state.items.find(({ id }) => id === action.payload.id);
            return { ...state, editingItem: item };
        }

        default: {
            return state;
        }
    }
};

export default TodosReducer;