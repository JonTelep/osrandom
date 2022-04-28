import React from 'react';

const Future = () => {
    return(
        <div>
                <div className="ui list">
                    <div className="item">
                       If this site gains any attention I'll put more effort into it! <br />
                       Vote yes to ALL updates :)<br />
                       <h1>Priority of site improvements:</h1>

                        <h2>Site Styling/responiveness</h2>    
                        I'm no frontend dev. I would incorporate a framework to make the site consistent and much less 'jumpy'.
                     </div>
                     <div className="item">
                     <br />
                        <h2>Boss filtering</h2>    
                        The indicators isWildy, isGWD, isMulti, isSkilling and isRaid are all shown under the boss's name currently.<br /> I would add checkboxes for filtering on what would be randomized to show up so you can have more specialized RNG experience.
                     </div>
                     <div className="item">
                     <br />
                        <h2>Skills filtering</h2>    
                        I'd implement indicators to filter on isSkilling, isCombat, isF2p, isP2p similar how Boss filtering would be implemented.
                     </div>
                     <div className="item">
                     <br />
                        <h2>Account filtering</h2>    
                        This would require using OSRS Webservices to retrieve your accounts stats and KCs. <br />
                        The ability to filter on your own account's is99, isKcLowerThanThreshold. A more specialized filtering on your account if you wish to randomize a non 99, or filter on a KC (my personal account 'Telep' is going for 100 kc in all bosses)
                     </div>
                </div>
        </div>
    );
}

export default Future;