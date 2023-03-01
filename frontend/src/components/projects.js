export default function History(props) {
    if(props.data != ''){
        return (
                <div>
                <table>
                <thead>
                    <tr>
                        <th>ProjectID</th>
                        <th> Proposer Address</th>
                        <th> Url</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => {
                    return (
                        <tr>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
          );
    }

}




