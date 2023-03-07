export default function State(props) {
    if(props.data != ''){
        let state = '';
        return (
            <div>
            <table>
            <thead>
                <tr>
                    <th>For weight</th>
                    <th>Against weight</th>
                    <th> For voters count</th>
                    <th> Against voters count</th>
                    <th> Abstain voters count</th>
                    <th> Project State</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((item, index) => {
                    if(item[5] == 0){
                        state = 'voting'
                    }else if(item[5] ==1){
                        state = 'Defeated'
                    }else
                        state = 'Succeeded'
                return (
                    <tr>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{state}</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
      );
    }
    }




