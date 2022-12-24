// ===== --- ===== ### React ### ===== --- ===== //
import React from "react";

// ===== --- ===== ### Home-Component-Style ### ===== --- ===== //
import Style from "./Home.module.scss";

// ===== --- ===== ### Home-Component ### ===== --- ===== //
function Home() {
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  return (
    <div>
      <div className="homeSection">
        <div className={Style.mainSection}>
          <div className={Style.mainImg}></div>
          <div className={Style.mainText}>
            <h2 className={Style.cup}>
              World Cup
              <span className={Style.qatar}>QATAR</span> 2022
            </h2>
            <h2 className={Style.arab}>عالم واحد موطن واحد</h2>
            <h2 className={Style.eng}>One World One Home</h2>
          </div>
        </div>
      </div>
      <div className="groupSection"></div>
    </div>
  );
}

export default Home;
