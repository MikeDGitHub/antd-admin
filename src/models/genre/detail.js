import pathToRegexp from 'path-to-regexp'
import { queryInfo } from '../../services/genre'

export default {

  namespace: 'genreDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/genre/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryInfo', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    * queryInfo ({
      payload,
    }, { call, put }) {
      const data = yield call(queryInfo, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
