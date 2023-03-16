import { FaEdit } from "react-icons/fa";

export default function Display(props) {
  if (props.data != '0') {
    return (
      <div>
        {/* <table>
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
        </table> */}
        {
          props.data.map((item, index) => {
            return (
              <div>
                <div className={`project-card${item.status == "Succeeded" ? "-green" : item.status == "Voting" ? "-yellow" : ""}`}>
                  <div className="project-card-body">
                    <div className="project-card-proposer">
                      <div className="project-card-proposer-avatar">
                        <img src="https://avatars.githubusercontent.com/u/1024025?v=4" alt="avatar" />
                      </div>
                      <div className="project-card-proposer-name">
                        <h5 className="project-card-proposer-name-text">{item.name}</h5>
                        <h6 className="project-card-proposer-name-subtext">Suggestion on {item.suggestionDate}</h6>
                      </div>
                    </div>
                    <div className="project-card-status">
                      <div className="project-card-status-button">
                        <button className="project-card-status-button-icon"><FaEdit /></button>
                        <button className="project-card-status-button-text">{item.status}</button>
                      </div>
                    </div>
                    <div className="project-card-desc">
                      <p className="project-card-desc-text">{item.description}</p>
                    </div>
                    <div className="project-card-info">
                      <div className="project-card-info-col1">
                        <div className="project-card-info-col1-row1">
                          Votes
                        </div>
                        <div className="project-card-info-col1-row2">
                          For {item.for} Against {item.against} Abstain {item.abstain}
                        </div>
                      </div>
                      <div className="project-card-info-col2">
                        <div className="project-card-info-col1-row1">
                          Stakes
                        </div>
                        <div className="project-card-info-col1-row2">
                          For {item.for} Against {item.against} Abstain {item.abstain}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

}




