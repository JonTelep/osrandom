import React from 'react';

const Future = () => {
    return(
        <div>
                <div className="ui list">
                    <div className="item">
                        <h2>Styling</h2>    
                        Fix all the styling and responiveness. I'm no frontend dev.
                     </div>
                     <div className="item">
                        <h2>Bosses</h2>    
                        Filter capabilities on isWildy, isGWD, isMulti, isSkilling and isRaid.
                     </div>
                     <div className="item">
                        <h2>Skills</h2>    
                        Filter skills on skilling, combat, f2p, p2p
                     </div>
                     <div className="item">
                        <h2>Filtering on your account</h2>    
                        Filter capabilites on is99, is boss KC below a count, general yes no to are you able to a kill a boss.
                     </div>
                </div>
        </div>
    );
}

export default Future;