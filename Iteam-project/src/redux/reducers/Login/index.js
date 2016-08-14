import { injectReducer } from '../../../store/reducers'
import loginReducer from './LoginReducer'

export default (store) => {
  injectReducer(store, {key: 'login', loginReducer});
}
