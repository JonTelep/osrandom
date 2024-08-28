import React from 'react';
import './OtherProjects.css';

const OtherProjects = () => {
    const linkStyle = {
        color: '#ffd700',
        textDecoration: 'none',
        transition: 'color 0.3s ease'
    };

    return (
        <div className="other-projects">
            <h1>Other OSRS Projects</h1>
            <p>NOTE - I have no affiliation with any of these, but enjoy reading about them.</p>
            
            <section className="project">
                <h2><a href="https://opensea.io/collection/osrs-punks" target="_blank" rel="noopener noreferrer" style={linkStyle}>1. OSRS Punks</a></h2>
                <p>I enjoy the crypto world, and NFT's are a big part of it. A content creator named 'Tedious' is behind OSRS Punks. (I don't own any YET!)</p>
            </section>
            
            <section className="project">
                <h2><a href="https://www.osrsbotdetector.com/#/" target="_blank" rel="noopener noreferrer" style={linkStyle}>2. OSRS Bot-Detector</a></h2>
                <p>Open source machine learning algorithm detecting and predicting players you pass. Does hell of a lot more bot busting then Yagex imo.</p>
            </section>
            
            <section className="project">
                <h2><a href="https://www.patreon.com/m/3596305/posts" target="_blank" rel="noopener noreferrer" style={linkStyle}>3. LilSmokey</a></h2>
                <p>Unreal video editing and OSRS meme creator. Smokey's collabed with content creators and have made some top class editing!</p>
            </section>
        </div>
    );
}

export default OtherProjects;