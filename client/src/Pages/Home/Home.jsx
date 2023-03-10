// ===== --- ===== ### React ### ===== --- ===== //
import React from "react";

// ===== --- ===== ### Images ### ===== --- ===== //
import groupImg from "../../Images/groups_middle.jpg";

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
      <div className={Style.Groups}>
        <img
          className={Style.GroupsImg}
          src={groupImg}
          alt=""
          useMap="#image-map"
        />
        <map name="image-map">
          <area
            target="_blank"
            alt="Qatar"
            title="Qatar"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/279-qatar.html?Itemid=152"
            coords="278,240,483,303"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Ecuador"
            title="Ecuador"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/241-ecuador.html?Itemid=152"
            coords="484,313,277,365"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Senegal"
            title="Senegal"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/283-senegal.html?Itemid=152"
            coords="479,369,274,420"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Netherlands"
            title="Netherlands"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/78-netherlands.html?Itemid=152"
            coords="481,423,275,482"
            shape="rect"
          />
          <area
            target="_blank"
            alt="England"
            title="England"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/74-england.html?Itemid=152"
            coords="740,254,533,317"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Iran"
            title="Iran"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/285-iran.html?Itemid=152"
            coords="733,323,532,369"
            shape="rect"
          />
          <area
            target="_blank"
            alt="USA"
            title="USA"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/290-united-states-of-america.html?Itemid=152"
            coords="730,374,535,423"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Wales"
            title="Wales"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/87-wales.html?Itemid=152"
            coords="725,430,535,479"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Argentina"
            title="Argentina"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/234-argentina.html?Itemid=152"
            coords="991,255,782,311"
            shape="rect"
          />
          <area
            target="_blank"
            alt="KSA"
            title="KSA"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/288-saudi-arabia.html?Itemid=152"
            coords="983,316,772,362"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Mexico"
            title="Mexico"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/291-mexico.html?Itemid=152"
            coords="983,364,772,416"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Poland"
            title="Poland"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/79-poland.html?Itemid=152"
            coords="984,425,769,479"
            shape="rect"
          />
          <area
            target="_blank"
            alt="France"
            title="France"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/76-france.html?Itemid=152"
            coords="1210,257,1012,309"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Australia"
            title="Australia"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/275-australia.html?Itemid=152"
            coords="1207,317,1012,363"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Denmark"
            title="Denmark"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/73-denmark.html?Itemid=152"
            coords="1207,366,1017,420"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Tunisia"
            title="Tunisia"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/280-tunisia.html?Itemid=152"
            coords="1208,425,1015,484"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Spain"
            title="Spain"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/82-spain.html?Itemid=152"
            coords="461,558,257,618"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Costa Rica"
            title="Costa Rica"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/277-costa-rica.html?Itemid=152"
            coords="459,625,255,673"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Germany"
            title="Germany"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/77-germany.html?Itemid=152"
            coords="458,656,251,717"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Japan"
            title="Japan"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/287-japan.html?Itemid=152"
            coords="452,716,240,766"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Belgium"
            title="Belgium"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/70-belgium.html?Itemid=152"
            coords="707,556,529,621"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Canada"
            title="Canada"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/289-canada.html?Itemid=152"
            coords="705,599,530,660"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Morocco"
            title="Morocco"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/284-morocco.html?Itemid=152"
            coords="705,643,528,710"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Croatia"
            title="Croatia"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/71-croatia.html?Itemid=152"
            coords="705,692,530,754"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Brazil"
            title="Brazil"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/233-brazil.html?Itemid=152"
            coords="941,560,773,614"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Serbia"
            title="Serbia"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/162-serbia.html?Itemid=152"
            coords="940,619,772,672"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Switzerland"
            title="Switzerland"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/84-switzerland.html?Itemid=152"
            coords="939,673,769,729"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Cameroon"
            title="Cameroon"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/281-cameroon.html?Itemid=152"
            coords="939,734,766,792"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Portugal"
            title="Portugal"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/80-portugal.html?Itemid=152"
            coords="1174,562,1025,613"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Ghana"
            title="Ghana"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/282-ghana.html?Itemid=152"
            coords="1173,615,1023,666"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Uruguay"
            title="Uruguay"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/236-uruguay.html?Itemid=152"
            coords="1174,666,1020,719"
            shape="rect"
          />
          <area
            target="_blank"
            alt="Korea Republic"
            title="Korea Republic"
            href="https://statorium.com/component/joomsport/team/23-fifa-world-cup-qatar-2022/286-south-korea.html?Itemid=152"
            coords="1173,720,1018,771"
            shape="rect"
          />
        </map>
      </div>
    </div>
  );
}

export default Home;
