import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip, Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import Link from 'umi/link';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class GlobalHeader extends PureComponent {


  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  changLang() {
    const locale = getLocale();
    if (!locale || locale === 'zh-CN') {
      setLocale('en-US');
    } else {
      setLocale('zh-CN');
    }
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        {/*<Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />*/}
        <div className={styles.middle}>
          {
            //如果是seller登录状态，则显示“首页”按钮和“发布”按钮
            this.props.loginStatus === 'sellerLoggedIn' &&
            <div className={styles.left}>
              <Link to="/" >
                <Button onClick={this.props.handleShowIndexPage}>首页</Button>
              </Link>
              <Button onClick={this.props.handleRelease}>发布</Button>
            </div>
          }
          {
            //如果是购买者登录状态，则显示账务和购物车按钮
            this.props.loginStatus === 'userLogged' &&
            <div className={styles.left}>
              <Link to="/" >
                <Button onClick={this.props.handleShowIndexPage}>首页</Button>
              </Link>
              <Button onClick={this.props.handleShowBill}>账务</Button>
              <Button onClick={this.props.handleShowShoppingCart}>购物车</Button>
            </div>
          }
          {
            //如果是未登录状态，则只显示首页按钮
            this.props.loginStatus === 'notLoggedIn' &&
            <div className={styles.left}>
              <Link to="/" >
                <Button onClick={this.props.handleShowIndexPage}>首页</Button>
              </Link>
            </div>
          }
          {
            //如果是未登录状态，则显示登录超链接
            this.props.loginStatus === 'notLoggedIn' &&
            <div className={styles.right}>
              请<Button onClick={this.props.handleShowLoginPage}>登录</Button>
            </div>
          }
          {
            this.props.loginStatus === 'userLogged'|| this.props.loginStatus === 'sellerLoggedIn' &&
            <div className={styles.right}>
              <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={value => {
                  console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={value => {
                  console.log('enter', value); // eslint-disable-line
                }}
              />
              <Tooltip title="使用文档">
                <a
                  target="_blank"
                  href="http://pro.ant.design/docs/getting-started"
                  rel="noopener noreferrer"
                  className={styles.action}
                >
                  <Icon type="question-circle-o" />
                </a>
              </Tooltip>
              <NoticeIcon
                className={styles.action}
                count={currentUser.notifyCount}
                onItemClick={(item, tabProps) => {
                  console.log(item, tabProps); // eslint-disable-line
                }}
                onClear={onNoticeClear}
                onPopupVisibleChange={onNoticeVisibleChange}
                loading={fetchingNotices}
                popupAlign={{ offset: [20, -16] }}
              >
                <NoticeIcon.Tab
                  list={noticeData['通知']}
                  title="通知"
                  emptyText="你已查看所有通知"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['消息']}
                  title="消息"
                  emptyText="您已读完所有消息"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['待办']}
                  title="待办"
                  emptyText="你已完成所有待办"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                />
              </NoticeIcon>
              {currentUser.name ? (
                <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                  <span className={styles.name}>{currentUser.name}</span>
                </span>
                </Dropdown>
              ) : (
                <Spin size="small" style={{ marginLeft: 8 }} />
              )}
              <Button
                size="small"
                onClick={() => {
                  this.changLang();
                }}
              >
                <FormattedMessage id="lang" />
              </Button>
            </div>
          }
        </div>
      </div>
    );
  }
}
