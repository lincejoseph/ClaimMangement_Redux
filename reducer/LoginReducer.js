
const InitialState={
  loggedInUser:""
}
export default function loginReducer(state=InitialState, action){
  console.log("Action -->"+action.type);
  switch(action.type){
    
  case "LOGIN":
    state={loggedInUser:action.loggedInUser};
    break;
  }
  return state;
}

