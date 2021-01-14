import React from "react";
import CardBoard from "../components/CardBoard";
import { funWords } from "../fakeDatabase.js/funWords";
import "../components/CardBoard.css";

const PlayPage = () => {
  return (
    <div>
      <div className="container containerAlignment">
        <div className="row rowAlignment">
          <div className="card-columns">
            <CardBoard funWords={funWords} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;