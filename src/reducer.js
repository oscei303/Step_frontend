 const defaultState = {
     matrix: [
         [0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0]
     ],
     activateStart: false,
     activeColumn: 0,
     playing: true,
     user: '',
     loggedIn: false
 }



 function reducer(prevState = defaultState, action) {

     switch (action.type) {
         case 'NEXT_COLUMN':
             return {}
         default:
             return prevState
     }
 }


 export  default reducer