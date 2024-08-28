import React from 'react';
import './Future.css'; // Make sure to create this CSS file

const Future = () => {
    return (
        <div className="future-improvements">
            <h1 className="future-title">Future Improvements</h1>
            
            <section className="main-feature">
                <h2>Coming Soon: Personalized Account Filtering</h2>
                <p>Be able to filter bosses and skills based on your account stats to have additional curated fitlers.</p>
            </section>
            
            <section className="feature-details">
                <h3></h3>
                <ul>
                    <li>Focus on skills you haven't maxed yet</li>
                    <li>Discover bosses where you want to increase your KC</li>
                </ul>
                
            </section>
            
        </div>
    );
}

export default Future;