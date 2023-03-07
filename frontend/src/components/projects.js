export default function History(props) {
    if(props.data != ''){
        return (
                <div>
                <table>
                <thead>
                    <tr>
                        <th>ProjectID</th>
                        <th> Proposer Address</th>
                        <th> Min staking amount</th>
                        <th> Voting threshold</th>
                        <th> Closing Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => {
                    return (
                        <tr>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
          );
    }

}




