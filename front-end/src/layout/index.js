import { Component } from 'react';
import { Layout, Tabs } from 'antd';
/*import SiderMenu from "../component/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';*/
import logo from '../assets/logo.svg';
import GlobalHeader from "../component/GlobalHeader";
import CardsPage from "../page/cards"
import CardsPage2 from "../page/detailContent"

const { Content, Header } = Layout;
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      showDetail: false,
      detailId: '',
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleShowDetail = (id) => {
    console.log(id);
    this.setState({
      showDetail: !this.state.showDetail,
      detailId: id,
    });
  };

  getDetailId = (id) => {
    this.setState({
      detailId: id,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout>
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: 'jiahao zhang',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
              }}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{padding: '30px', margin: 'auto', height: '100%', width: '790px', background: '#fff' }}>
            {!this.state.showDetail &&
            <Tabs defaultActiveKey="1" onChange={callback} type={"card"}>
              <TabPane tab={"所有内容"} key={1}>
                <CardsPage handleShowDetail={this.handleShowDetail}/>
              </TabPane>
              <TabPane tab={"未购买的内容"} key={2}>{children}</TabPane>
              <TabPane tab={"详细内容"} key={3}><CardsPage2 /></TabPane>
            </Tabs>
            }
            {this.state.showDetail &&
              <CardsPage2 detailId={this.state.detailId}/>
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
