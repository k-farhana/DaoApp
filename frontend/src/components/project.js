export default function Display(props) {
    if(props.data != '0'){
        return (
                <div>
                <table>
                <thead>
                    <tr>
                        <th>Propoer ID</th>
                        <th> Closing Time</th>
                        <th>Min. Stake Amount</th>
                        <th> Stake Amount</th>
                        <th> Stake Count</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => {
                    return (
                        <tr>
                            <td>{item[4]}</td>
                            <td>{item[6]}</td>
                            <th>{item[0]}</th>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
          );
    }

}




