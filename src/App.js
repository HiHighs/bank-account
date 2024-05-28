import { useReducer } from 'react';
import './styles.css';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return { ...state, isActive: true, balance: 500 };
    case 'deposit':
      return { ...state, balance: state.balance + 150 };
    case 'withdraw':
      return { ...state, balance: state.balance - 50 };
    case 'requestLoan':
      if (state.loan !== 0) return { ...state };
      return { ...state, balance: state.balance + 5000, loan: 5000 };
    case 'payLoan':
      if (state.loan === 0) return { ...state };
      return { ...state, balance: state.balance - 5000, loan: 0 };
    case 'closeAccount':
      if (state.balance !== 0 || state.loan !== 0) return;
      return { ...initialState };
    default:
      console.log('Something went wrong');
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className='App'>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: 'openAccount' });
          }}
          disabled={false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'deposit' });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'withdraw' });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'requestLoan' });
          }}
          disabled={!isActive || loan !== 0}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'payLoan' });
          }}
          disabled={!isActive || loan === 0}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'closeAccount' });
          }}
          disabled={!isActive || balance !== 0 || loan !== 0}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
