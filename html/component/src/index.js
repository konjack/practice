//import "./styles.css";
import * as UserDialog from "./components/UserDialog.js";

document.getElementById("app").innerHTML = /* html */ `
  ${UserDialog.render()}
`;
(() => {
  UserDialog.getInstance().init();
})();
