export default function State(props) {
    if(props.data != ''){
        if(props.data == 0){
            return (
                <div>
                    <h1>Review</h1>
                    <h2><b></b></h2>
                </div>
                
              );
        }
        else if(props.data == 1){
            return (
                <div>
                    <h1>Cancelled</h1>
                </div>
              );
        }
        else if(props.data == 2){
            return (
                <div>
                    <h1>Voting</h1>
                </div>
              );
        }
        else if(props.data == 3){
            return (
                <div>
                    <h1>Defeated</h1>
                </div>
              );
        }
        else if(props.data == 4){
            return (
                <div>
                    <h1>Succeeded</h1>
                </div>
              );
        }
        else if(props.data == 5){
            return (
                <div>
                    <h1>Accepted</h1>
                </div>
              );
        }
        else if(props.data == 6){
            return (
                <div>
                    <h1>Rejected</h1>
                </div>
              );
        }    
    }
    
    // else if(props.data != ''){
    //     return (
    //         <div>
    //             <h1>{props.data}</h1>
    //         </div>
    //       );
    // }
    }




