import { Component } from 'react';
import { Layout, Tabs } from 'antd';
import { connect } from 'dva';
/*import SiderMenu from "../component/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';*/
import logo from '../assets/logo.svg';
import GlobalHeader from "../component/GlobalHeader";
import CardsPage from "../page/cards"
import CardsPage2 from "../page/detailContent"
import Bills from '../page/bill/billInfo'
import ShoppingCart from '../page/shoppingCart/shoppingCart'
import UnpurchasedContent from '../page/unpurchasedContent/unpurchasedContent'

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

  componentWillMount() {
    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    });
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

  handleShowShoppingCart=()=>{
    this.setState({
      showContent: 'shoppingCart'
    });
  };

  render() {
    const { children, location, loginStatus } = this.props;
    const { collapsed } = this.state;
    console.log('loginStatus = '+loginStatus);
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
              handleShowShoppingCart={this.handleShowShoppingCart}
              loginStatus={loginStatus}
            />
          </Header>
          <Content style={{padding: '30px', margin: 'auto', height: '100%', width: '790px', background: '#fff' }}>
            {
              //如果是购买者登录，显示 所有内容 和 未购买内容
              this.state.showContent === 'goodsList' && loginStatus === 'userLogged' &&
              <Tabs defaultActiveKey="1" onChange={callback} type={"card"}>
                <TabPane tab={"所有内容"} key={1}>
                  <CardsPage handleShowDetail={this.handleShowDetail}/>
                </TabPane>
                <TabPane tab={"未购买的内容"} key={2}>
                  {/*children*/}
                  <UnpurchasedContent handleShowDetail={this.handleShowDetail}/>
                </TabPane>
              </Tabs>
            }
            {
              //如果状态是未登录，则只显示商品列表
              this.state.showContent === 'goodsList' && loginStatus === 'notLoggedIn' &&
              <Tabs defaultActiveKey="1" onChange={callback} type={"card"}>
                <TabPane tab={"所有内容"} key={1}>
                  <CardsPage handleShowDetail={this.handleShowDetail}/>
                </TabPane>
              </Tabs>
            }
            {
              this.state.showContent === 'detail' &&
              <CardsPage2 detailId={this.state.detailId}/>
            }
            {
              this.state.showContent === 'bill' &&
              <Bills handleShowDetail={this.handleShowDetail}></Bills>
            }
            {
              this.state.showContent === 'shoppingCart' &&
              <ShoppingCart handleShowBill={this.handleShowBill}></ShoppingCart>
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// export default BasicLayout;

function mapStateToProps(state) {
  // console.log('state');
  // console.log(state);
  return {
    loginStatus: state.loginStatus.loginStatus.loginStatus,
  };
}

export default connect(mapStateToProps)(BasicLayout);
