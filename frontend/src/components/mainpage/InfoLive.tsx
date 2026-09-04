export default function InfoLive(){
    return(
        <>
            <section id="information">
                <h5 id="welcome-message">NCAA VOLLEYBALL SPORTS TRACKER</h5>
                <h3 id="top-message">Follow every match.</h3>
                <h3 id="bottom-message"><span id="colored">Support</span> every team.</h3>
                <p id="info-message">GameGrid brings you live scores, schedules, and stats for all NCAA Volleyball teams - with more college sports coming soon!</p>

                <button id="live-scores">View Live Scores</button>
                <button id="browse-teams">Browse Teams</button>
            </section>

            <div className="live-games">
                <div id="live-bubble"></div>
                <h4 id="live-games-now">LIVE NOW</h4>
                <h4 id="live-games-view"><a id="view-all-games" href="">View All Games {">"}</a></h4>
                <div id="game-card-container" className="game-card-container"></div>
            </div>
        </>
    )
}