import React from 'react';
import './Donation.css';

const Donation = () => {
    return (
        <div className="donation-container">
            <h1 className="donation-title">Support if you wish</h1>
            <p className="donation-intro">Your support helps this little site alive and growing. Every contribution, big or small, makes a difference!</p>

            <div className="donation-options">
                <div className="donation-option">
                    <h2>Follow & Share</h2>
                    <p>I am a scaper but I also build other stuff, you can follow me:</p>
                    <a href="https://twitter.com/telep_io" className="donation-link twitter-link">Follow on Twitter</a>
                </div>

                <div className="donation-option">
                    <h2>Become a Patron</h2>
                    <p>Get early access to new projectsand support ongoing development:</p>
                    <a href="https://www.patreon.com/Telep" className="donation-link patreon-link">Support on Patreon</a>
                </div>

                <div className="donation-option">
                    <h2>Cryptocurrency</h2>
                    <p>For the crypto enthusiasts out there:</p>
                    <ul className="crypto-list">
                        <li><span>Ethereum:</span> 0xd6d0A3AfC6ceC282E682110f84d5871444D5B074</li>
                        <li><span>Bitcoin:</span> 18fzv6AufiJrxcYJMSfbxbRuqNWy9XKYTU</li>
                        <li><span>Dogecoin:</span> DJJp4QG693qrfXgtZFjFfqdDDY4KKAndQ7</li>
                    </ul>
                </div>
            </div>

            <p className="donation-thanks">Thank you for your generosity!</p>
        </div>
    );
}

export default Donation;