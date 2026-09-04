export default function AllInfo(){
    return (
        <section id="all-info">
            <h3 id="header-all-info">Everything you need to stay in <span id="colored">the game</span>!</h3>
            <div id="can-do-cards">
                <div className="cards">
                    <div className="row-cards">
                        <h4 id="cards-header">Live Scores</h4>
                        <p id="cards-info">Real-time updates for every NCAA volleyball match.</p>
                    </div>
                    <div className="row-cards">
                        <h4 id="cards-header">Favorite Teams</h4>
                        <p id="cards-info">Follow your favorite teams and get quick access to their games and results.</p>
                    </div>
                    <div className="row-cards">
                        <h4 id="cards-header">Schedules & Results</h4>
                        <p id="cards-info">View upcoming matches, past results, and set-by-set breakdowns.</p>
                    </div>
                    <div className="row-cards">
                        <h4 id="cards-header">Built for More</h4>
                        <p id="cards-info">We're starting with volleyball but expect more NCAA sports to come soon!</p>
                    </div>
                </div>
                <div id="ready-for-more-card">
                    <h4 id="ready-header">Ready to follow your favorite teams?</h4>
                    <p id="ready-info">Create an account to personalize your experience.</p>
                    <button id="ready-button">Get Started {">"}</button>
                </div>
            </div>
        </section>
    )
}