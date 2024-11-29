import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import { selectAbility, selectRoles, setRoles } from "../store/auth-slice";

const items = [
  { key: "/", label: "首頁", subject: "Home" },
  {
    key: "/examplace-management",
    label: "考場管理",
    subject: "ExamPlaceManagement",
  },
  { key: "/exam-management", label: "考務管理", subject: "ExamManagement" },
  {
    key: "/examinee-management",
    label: "考生管理",
    subject: "ExamineeManagement",
  },
];

const roles = ["Manager", "Examer", "Examplacer", "Examiner"];

export default function RootLayout() {
  const dispatch = useDispatch();
  const ability = useSelector(selectAbility);
  const currentRoles = useSelector(selectRoles);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = items.map((item) => ({
    ...item,
    disabled: !ability.can("view", item.subject), // 沒有 "view" 權限的項目禁用
  }));

  const addRole = (role) => {
    if (currentRoles.includes(role)) {
      return;
    } else {
      const newRoles = [...currentRoles, role]; // 正確構建新陣列
      dispatch(setRoles(newRoles));
    }
  };

  const resetRole = () => {
    dispatch(setRoles([]));
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
          }}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            minHeight: "90dvh",
            padding: 24,
          }}
        >
          <h3>您目前的角色權限 : {currentRoles.join(" | ")}</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            增加權限 :
            {roles.map((role) => (
              <Button key={role} onClick={() => addRole(role)}>
                {role}
              </Button>
            ))}
            <Button variant={"filled"} onClick={resetRole}>
              重製
            </Button>
          </div>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
