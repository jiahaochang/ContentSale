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
import LoginPage from  '../page/loginPage/loginPage'
import ReleaseProduct from '../page/releaseProduct/releaseProduct'

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
      //loginStatus: 'notLoggedIn',
    };
  }

  componentWillMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus =()=>{
    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    });
    console.log("检查登录状态 "+this.props.loginStatus)
  };

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

  handleShowLoginPage=()=>{
    this.setState({
      showContent: 'loginPage'
    });
  };

  doNotShowLoginPage=()=>{
    this.setState({
      showContent: 'doNotShowLoginPage'
    });
  };

  handleRelease=()=>{
    this.setState({
      showContent: 'releasePage'
    });
  };

  render() {
    const { loginStatus, uid } = this.props;
    const { collapsed } = this.state;
    // console.log('登录状态 = '+this.props.loginStatus);
    // console.log('显示的内容 = '+this.state.showContent);

    return (
      <Layout>
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: uid,
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                // notifyCount: 12,
              }}
              onCollapse={this.handleMenuCollapse}
              handleShowIndexPage={this.handleShowIndexPage}
              handleShowBill={this.handleShowBill}
              handleShowShoppingCart={this.handleShowShoppingCart}
              loginStatus={loginStatus}
              handleShowLoginPage={this.handleShowLoginPage}
              handleRelease={this.handleRelease}
              checkLoginStatus={this.checkLoginStatus}
            />
          </Header>
          {
            this.state.showContent === 'loginPage' &&
            <Content style={{padding: '30px', margin: 'auto', height: '100%', width: '790px', background: '#fff' }}>
                <LoginPage
                  checkLoginStatus={this.checkLoginStatus}
                  doNotShowLoginPage={this.doNotShowLoginPage}
                  handleShowIndexPage={this.handleShowIndexPage}
                />
            </Content>
          }
          {
            this.state.showContent !== 'loginPage' &&
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
                //如果状态是未登录状态或者seller登录，则只显示商品列表
                this.state.showContent === 'goodsList' && (loginStatus === 'notLoggedIn'|| loginStatus === 'sellerLoggedIn') &&
                <Tabs defaultActiveKey="1" onChange={callback} type={"card"}>
                  <TabPane tab={"所有内容"} key={1}>
                    <CardsPage handleShowDetail={this.handleShowDetail}/>
                  </TabPane>
                </Tabs>
              }
              {
                //显示商品详情
                this.state.showContent === 'detail' &&
                <CardsPage2 detailId={this.state.detailId}/>
              }
              {
                //显示账单页面
                this.state.showContent === 'bill' &&
                <Bills handleShowDetail={this.handleShowDetail}></Bills>
              }
              {
                //显示购物车页面
                this.state.showContent === 'shoppingCart' &&
                <ShoppingCart handleShowBill={this.handleShowBill}></ShoppingCart>
              }
              {
                //显示发布商品页面
                this.state.showContent === 'releasePage' &&
                <ReleaseProduct/>
              }
            </Content>
          }

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
    uid: state.loginStatus.loginStatus.uid,
  };
}

export default connect(mapStateToProps)(BasicLayout);
