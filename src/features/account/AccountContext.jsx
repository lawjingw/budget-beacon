import { createContext, useContext, useReducer } from "react";

const initalAccount = {
  name: "My account",
  currentBalance: 0,
};

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [account, dispatch] = useReducer(accountReducer, initalAccount);

  return (
    <AccountContext.Provider value={{ account, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
}

function accountReducer(account, action) {
  if (action.type === "update") {
    return {
      ...account,
      name: action.name,
      currentBalance: action.currentBalance,
    };
  }
}

export function useAccount() {
  return useContext(AccountContext);
}
