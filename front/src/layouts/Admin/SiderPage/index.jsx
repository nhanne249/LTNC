import { TiThSmall } from "react-icons/ti";
import { Menu } from "antd";
import "./index.scss";
const SiderPage = () => {
  return (
    <div className="sider-content-container">
      <div className="menu-name">
        <TiThSmall />
        <b> Chức năng</b>
      </div>
      <Menu></Menu>
    </div>
  );
};
export default SiderPage;
