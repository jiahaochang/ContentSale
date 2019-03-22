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
import EditProduct from '../page/editProduct/editProduct'

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
      loginStatus: 'notLoggedIn',
    };
  }

  componentWillMount() {
    this.checkLoginStatus();
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
      return;
    };
  }

  checkLoginStatus =()=>{
    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });
      }
    });
  };


  handleMenuCollapse = () => {

    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });
        //如果状态为未登录，则跳转到登录页面
        if (res.result.loginStatus==="notLoggedIn"){
          this.handleShowLoginPage();
        }else {
          this.setState({
            collapsed: !this.state.collapsed,
          });
        }
      }
    });

  };

  handleShowDetail = (id) => {

    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });

        this.setState({
          showContent: 'detail',
          detailId: id,
        });

      }
    });

  };

  handleShowIndexPage=()=>{

    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });

        this.setState({
          showContent: 'goodsList',
        });

      }
    });

  };

  handleShowBill=()=>{

    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });
        //如果是购买者登录则跳转到账单页面
        if (res.result.loginStatus==="userLogged"){
          this.setState({
            showContent: 'bill'
          });
        }else if (res.result.loginStatus==="notLoggedIn") {
          this.handleShowLoginPage();
        }

      }
    });

  };

  handleShowShoppingCart=()=>{

    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });
        //如果是购买者登录则跳转到购物车页面
        if (res.result.loginStatus==="userLogged"){
          this.setState({
            showContent: 'shoppingCart'
          });
        }else if (res.result.loginStatus==="notLoggedIn") {
          this.handleShowLoginPage();
        }

      }
    });

  };

  //展示登录界面
  handleShowLoginPage=()=>{
    this.setState({
      showContent: 'loginPage'
    });
  };

  /*doNotShowLoginPage=()=>{
    this.setState({
      showContent: 'doNotShowLoginPage'
    });
  };*/

  //展示发布商品页面
  handleRelease=()=>{

    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });
        
        if (res.result.loginStatus==="sellerLoggedIn"){
          this.setState({
            showContent: 'releasePage'
          });
        }else if (res.result.loginStatus==="notLoggedIn") {
          this.handleShowLoginPage();
        }

      }
    });

  };

  //展示编辑商品详情页面
  handleEditProductPage=()=>{
    this.props.dispatch({
      type: 'loginStatus/getLoginStatus',
    }).then((res) => {
      if (res.code===200){
        // console.log(res.result);
        this.setState({
          loginStatus: res.result.loginStatus,
        });

        if (res.result.loginStatus==="sellerLoggedIn"){
          this.setState({
            showContent: 'editProductPage',
          });
        }else {
          this.handleShowLoginPage();
        }

      }
    });

  };

  render() {
    const { uid } = this.props;
    const { collapsed } = this.state;
    const loginStatus = this.state.loginStatus;
    console.log('登录状态 = '+loginStatus);
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
              loginStatus={this.state.loginStatus}
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
                  //doNotShowLoginPage={this.doNotShowLoginPage}
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
                    <CardsPage
                      handleShowDetail={this.handleShowDetail}
                      loginStatus={this.state.loginStatus}
                    />
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
                    <CardsPage
                      handleShowDetail={this.handleShowDetail}
                      loginStatus={this.state.loginStatus}
                    />
                  </TabPane>
                </Tabs>
              }
              {
                //显示商品详情
                this.state.showContent === 'detail' &&
                <CardsPage2
                  detailId={this.state.detailId}
                  loginStatus={this.state.loginStatus}
                  handleEditProductPage={this.handleEditProductPage}
                  handleShowShoppingCart={this.handleShowShoppingCart}
                />
              }
              {
                //显示账单页面
                this.state.showContent === 'bill' &&
                <Bills
                  handleShowDetail={this.handleShowDetail}
                />
              }
              {
                //显示购物车页面
                this.state.showContent === 'shoppingCart' &&
                <ShoppingCart
                  handleShowBill={this.handleShowBill}
                  handleShowIndexPage={this.handleShowIndexPage}
                />
              }
              {
                //显示发布商品页面
                this.state.showContent === 'releasePage' &&
                <ReleaseProduct handleShowIndexPage={this.handleShowIndexPage}/>
              }
              {
                //显示编辑商品详情页面
                this.state.showContent === 'editProductPage' &&
                <EditProduct
                  detailId={this.state.detailId}
                  handleShowDetail={this.handleShowDetail}
                />
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
