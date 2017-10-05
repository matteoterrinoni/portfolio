import {ref} from './firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

export const reduxSagaFirebase = new ReduxSagaFirebase(ref)