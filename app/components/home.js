import React from "react";
import BigArtcile from "./big-article";
import StandArtcile from "./stand-article";
import LogForm from "./logform";

const Home = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <BigArtcile />
                        <BigArtcile />
                    </div>

                    <div className="row">
                        <StandArtcile />
                        <StandArtcile />
                        <StandArtcile />
                    </div>
                </div>
                <LogForm />
            </div>
        );
    }
});

export default Home;