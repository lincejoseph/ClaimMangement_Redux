
const InitialState={
  claimList:[]
}
export default function claimListReducer(state=InitialState, action){
  console.log("Action -->"+action.type);
  switch(action.type){

   case "LIST_CLAIM":
   state ={claimListObject:action.claimList};
   break;
  }
  return state;
};

