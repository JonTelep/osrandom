import React from 'react';

const Future = () => {
    return(
        <div>
            <br />
                <div className="ui list">
                    <div className="item">
                        <h2>Styling</h2>    
                        Fix some styling issues
                     </div>
                     <div className="item">
                        <h2>Bosses</h2>    
                        Filter capabilities on isWildy, isGWD, isMulti, isSkilling and isRaid.
                     </div>
                     <div className="item">
                        <h2>Skills</h2>    
                        Filter capabilites on combats, 
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