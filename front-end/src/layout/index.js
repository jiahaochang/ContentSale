import { Component } from 'react';
import { Layout, Tabs } from 'antd';
/*import SiderMenu from "../component/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';*/
import logo from '../assets/logo.svg';
import GlobalHeader from "../component/GlobalHeader";
import CardsPage from "../page/cards"
import CardsPage2 from "../page/detailContent"
import Bills from '../page/bill/billInfo'

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
      showContent: 'goodsList',
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
      showContent: 'detail',
      detailId: id,
    });
  };

  handleShowIndexPage=()=>{
    this.setState({
      showContent: 'goodsList',
    });
  };

  handleShowBill=()=>{
    this.setState({
      showContent: 'bill'
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
              handleShowIndexPage={this.handleShowIndexPage}
              handleShowBill={this.handleShowBill}
            />
          </Header>
          <Content style={{padding: '30px', margin: 'auto', height: '100%', width: '790px', background: '#fff' }}>
            {this.state.showContent === 'goodsList' &&
            <Tabs defaultActiveKey="1" onChange={callback} type={"card"}>
              <TabPane tab={"所有内容"} key={1}>
                <CardsPage handleShowDetail={this.handleShowDetail}/>
              </TabPane>
              <TabPane tab={"未购买的内容"} key={2}>
                {children}
              </TabPane>
            </Tabs>
            }
            {this.state.showContent === 'detail' &&
              <CardsPage2 detailId={this.state.detailId}/>
            }
            {
              this.state.showContent === 'bill' &&
                <Bills></Bills>
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
