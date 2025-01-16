// import { useIntl } from "react-intl";
// import { KTIcon } from "../../../helpers";
// import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
// import { AsideMenuItem } from "../aside/AsideMenuItem";
// import { useAuth } from '../../../../app/modules/auth'
// import {AsideMenuMainUpdatedAir} from '../aside/AsideMenuMean_AirAdmin'
// import {AsideMenuMainUpdatedGround} from "../aside/AsideMenuMain_GroundAdmin"
// import {AsideMenuMainUpdatedWater} from "../aside/AsideMenuMain_WaterAdmin"
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export function AsideMenuMainUpdated() {
//   const intl = useIntl();
//   return (
//     <>
//       <AsideMenuItem
//         to="/Water/Admindashboard"
//         icon="element-11"
//         title="Dashboard"
//       />
//       <div className="menu-item">
//         <div className="menu-content pt-8 pb-2">
//           {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
//         </div>
//       </div>
//       <AsideMenuItem to="Water/Ships" icon="element-11" title="Ships" />
//       <AsideMenuItem to="/Water/Shipuser" icon="element-11" title="Users" />
//       <div className="menu-item">
//         {/* <div className='menu-content pt-8 pb-2'>
//           <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
//         </div> */}
//       </div>
//       <AsideMenuItem
//         to="/Water/Employees"
//         icon="element-11"
//         title="Employees"
//       />
//       <AsideMenuItem to="Water/Revenue" icon="element-11" title="Revenue" />
//       <AsideMenuItem to="Water/FAQ" icon="element-11" title="FAQ & Queries" />
//     </>
//   );

//   // const renderMenu = () => {
//   //   switch (auth?.type) {
//   //     case "water":
//   //       return <AsideMenuMainUpdatedWater />;
//   //     case "ground":
//   //       return <AsideMenuMainUpdatedGround />;
//   //     case "air":
//   //       return <AsideMenuMainUpdatedAir />;
//   //     default:
//   //       return null; // Optionally render a default menu or a "Not Authorized" message
//   //   }
//   // };

//   // return <>{renderMenu()}</>;

// }


import { useIntl } from "react-intl";
import { AsideMenuMainUpdatedAir } from "../aside/AsideMenuMean_AirAdmin";
import { AsideMenuMainUpdatedAirUser } from "../aside/AsideMenuMain_UserAir";
import { AsideMenuMainUpdatedGround } from "../aside/AsideMenuMain_GroundAdmin";
import { AsideMenuMainUpdatedGroundUser } from "../aside/AsideMenuMain_UserGround";
import  AsideMenuMainUpdatedWater from "./AsideMenuMain_WaterAdmin";
import { AsideMenuMainUpdatedWaterUser } from "../aside/AsideMenuMain_UserWater";

export function AsideMenuMainUpdated() {
  const intl = useIntl();

  const type = localStorage.getItem("type");
  const role = localStorage.getItem("role"); 

 
  const renderMenu = () => {
    if (type === "water") {
      return role === "admin" ? (
        <AsideMenuMainUpdatedWater />
      ) : (
        <AsideMenuMainUpdatedWaterUser />
      );
    } else if (type === "ground") {
      return role === "admin" ? (
        <AsideMenuMainUpdatedGround />
      ) : (
        <AsideMenuMainUpdatedGroundUser />
      );
    } else if (type === "air") {
      return role === "admin" ? (
        <AsideMenuMainUpdatedAir />
      ) : (
        <AsideMenuMainUpdatedAirUser />
      );
    } else {
      
      return (
        <>
          <h5 className="text-muted">Invalid Type or Role</h5>
        </>
      );
    }
  };

  return <>{renderMenu()}</>;
}
