// import React from 'react';
// import {Button, View, Text} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';

// //component
// import {scale} from '../../Theme/Scalling';
// import GlobalInclude from '../GlobalInclude/globalinclude';

// //screen
// import Home from '../../Screen/home';
// import DrawerMenu from '../../Screen/drawermenu';
// import Category from '../../Screen/Category';
// import Favorites from '../../Screen/Favorites';
// import TabBarItem from '../../Component/tabbar';
// import MyProfile from '../../Screen/myprofile';
// import MyBag from '../../Screen/mybag';
// import MyOrder from '../../Screen/myorder';
// import OrderDetail from '../../Screen/orderdetail';
// import PaymentMethod from '../../Screen/paymentmethod';
// import Login from '../../Screen/login';
// import SignUp from '../../Screen/signup';
// import ForgatPassword from '../../Screen/forgotpass';
// import Setting from '../../Screen/setting';
// import CheckOut from '../../Screen/checkout';
// import Success from '../../Screen/success';
// import ProductDetail from '../../Screen/productdetail';
// import MyAccount from '../../Screen/myaccount';
// import ContectUs from '../../Screen/contectus';
// import Product from '../../Screen/product';
// import SubCategory from '../../Screen/subcategory';
// import ShippingAddress from '../../Screen/shippingaddress';
// import PromoCodes from '../../Screen/promocodes';
// import Offer from '../../Screen/offer';
// import Help from '../../Screen/help';
// import AboutUs from '../../Screen/aboutus';
// import TearmsAndCondition from '../../Screen/tearmsandcondition';
// import PrivacyPolicy from '../../Screen/privacypolicy';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// export const RootNavigators = () => {
//   const StackScreen = () => {
//     return (
//       <Stack.Navigator initialRouteName={'Home'} headerMode={false}>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="MyAccount" component={MyAccount} />
//         <Stack.Screen name="Offer" component={Offer} />
//         <Stack.Screen name="Help" component={Help} />
//         <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
//         <Stack.Screen name="ProductDetail" component={ProductDetail} />
//       </Stack.Navigator>
//     );
//   };

//   const DrawerNavigation = () => {
//     return (
//       <Drawer.Navigator
//         initialRouteName="StackScreen"
//         drawerContent={() => {
//           return (
//             // <View
//             //   style={{
//             //     height: '100%',
//             //     width: '100%',
//             //   }}></View>
//             <DrawerMenu />
//           );
//         }}>
//         <Drawer.Screen name="StackScreen" component={StackScreen} />
//         {/* <Drawer.Screen name="MyOrder" component={MyOrder} />
//         <Drawer.Screen name="Category" component={Category} />
//         <Drawer.Screen name="MyBag" component={MyBag} />
//         <Drawer.Screen name="Offer" component={Offer} />
//         <Drawer.Screen name="Help" component={Help} /> */}
//       </Drawer.Navigator>
//     );
//   };

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         // TabBarItem={() => {
//         //   return <TabBarItem />;
//         // }}>

//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             // let iconName;
//             // if (route.name === 'TabA') {
//             //   iconName = focused
//             //     ? 'ios-information-circle'
//             //     : 'ios-information-circle-outline';
//             // } else if (route.name === 'TabB') {
//             //   iconName = focused ? 'ios-list-box' : 'ios-list';
//             // }
//             return (
//               // <View
//               //   style={{
//               //     height: '220%',
//               //     width: '100%',
//               //     backgroundColor: 'blue',
//               //     flexDirection: 'row',
//               //     marginTop: scale(30),
//               //   }}></View>
//               <TabBarItem />
//             );
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'white',
//           inactiveTintColor: 'gray',
//         }}>
//         <Tab.Screen name="Home" component={DrawerNavigation} />
//         <Tab.Screen name="Category" component={Category} />
//         <Tab.Screen name="MyBag" component={MyBag} />
//         <Tab.Screen name="Favorites" component={Favorites} />
//         <Tab.Screen name="MyProfile" component={MyProfile} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigators;

import React from 'react';
//Tab
import {createBottomTabNavigator} from 'react-navigation-tabs';

//stack_screen
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Drawer
import {createDrawerNavigator} from 'react-navigation-drawer';

//screen
import Home from '../../Screen/home';
import DrawerMenu from '../../Screen/drawermenu';
import Category from '../../Screen/Category';
import Favorites from '../../Screen/Favorites';
import TabBarItem from '../../Component/tabbar';
import MyProfile from '../../Screen/myprofile';
import MyBag from '../../Screen/mybag';
import MyOrder from '../../Screen/myorder';
import OrderDetail from '../../Screen/orderdetail';
import PaymentMethod from '../../Screen/paymentmethod';
import Login from '../../Screen/login';
import SignUp from '../../Screen/signup';
import ForgatPassword from '../../Screen/forgotpass';
import Setting from '../../Screen/setting';
import CheckOut from '../../Screen/checkout';
import Success from '../../Screen/success';
import ProductDetail from '../../Screen/productdetail';
import MyAccount from '../../Screen/myaccount';
import ContectUs from '../../Screen/contectus';
import Product from '../../Screen/product';
import SubCategory from '../../Screen/subcategory';
import ShippingAddress from '../../Screen/shippingaddress';
import PromoCodes from '../../Screen/promocodes';
import Offer from '../../Screen/offer';
import Help from '../../Screen/help';
import AboutUs from '../../Screen/aboutus';
import TearmsAndCondition from '../../Screen/tearmsandcondition';
import PrivacyPolicy from '../../Screen/privacypolicy';

import GlobalInclude from '../GlobalInclude/globalinclude';
import {scale} from '../../Theme/Scalling';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});

const FavoritesStack = createStackNavigator({
  Favorites: {
    screen: Favorites,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MyProfileStack = createStackNavigator({
  MyProfile: {
    screen: MyProfile,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});
const MyBagStack = createStackNavigator({
  MyBag: {
    screen: MyBag,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});
const CategoryStack = createStackNavigator({
  Category: {
    screen: Category,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});
const ContactUsStack = createStackNavigator({
  ContactUs1: {
    screen: ContectUs,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});
const OfferStack = createStackNavigator({
  Offer1: {
    screen: Offer,

    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
});

const DrawerNavigation = (drawerroute) =>
  createDrawerNavigator(
    {
      Home: HomeStack,
      Category: CategoryStack,
      MyBag: MyBagStack,
      Favorites: FavoritesStack,
      MyProfile: MyProfileStack,
      ContactUs: ContactUsStack,
      Offer: OfferStack,
    },

    {
      initialRouteName: drawerroute,
      drawerBackgroundColor: 'white',

      contentOptions: {
        activeTintColor: 'red',
      },
      contentComponent: DrawerMenu,
    },
  );

const TabNavigation = (tab) =>
  createBottomTabNavigator(
    {
      Home: {
        screen: DrawerNavigation('Home'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Home}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Homefill
                  : GlobalInclude.GlobalAssets.Homeunfill
              }
              focused={focused}
              viewstyle={{borderTopLeftRadius: scale(10)}}
            />
          ),
        },
      },
      Category: {
        screen: DrawerNavigation('Category'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Category}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Shopefill
                  : GlobalInclude.GlobalAssets.Shopeunfill
              }
              focused={focused}
            />
          ),
        },
      },
      MyBag: {
        screen: DrawerNavigation('MyBag'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Bag}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Bagfill
                  : GlobalInclude.GlobalAssets.Bagunfill
              }
              notification={true}
              focused={focused}
            />
          ),
        },
      },
      Favorites: {
        screen: DrawerNavigation('Favorites'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Favorites}
              focused={focused}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Favoritesfill
                  : GlobalInclude.GlobalAssets.Favoritesunfill
              }
            />
          ),
        },
      },

      MyProfile: {
        screen: DrawerNavigation('MyProfile'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Setting}
              style={{width: scale(20)}}
              focused={focused}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Profilefill
                  : GlobalInclude.GlobalAssets.Profileunfill
              }
              viewstyle={{borderTopRightRadius: scale(10)}}
            />
          ),
        },
      },
    },
    {
      initialRouteName: tab,
      tabBarOptions: {
        showLabel: false,
        tabStyle: {
          backgroundColor: 'black',
        },
      },
      activeColor: '#000',
      inactiveColor: '#3e2465',
    },
  );

const TabNavigationwithoutLogin = (tab) =>
  createBottomTabNavigator(
    {
      Home: {
        screen: DrawerNavigation('Home'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Home}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Homefill
                  : GlobalInclude.GlobalAssets.Homeunfill
              }
              focused={focused}
              viewstyle={{borderTopLeftRadius: scale(10)}}
            />
          ),
        },
      },
      Category: {
        screen: DrawerNavigation('Category'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.Category}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Shopefill
                  : GlobalInclude.GlobalAssets.Shopeunfill
              }
              focused={focused}
            />
          ),
        },
      },
      MyBag: {
        screen: DrawerNavigation('Offer'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.offer}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Bagfill
                  : GlobalInclude.GlobalAssets.Bagunfill
              }
              focused={focused}
            />
          ),
        },
      },
      Favorites: {
        screen: DrawerNavigation(global.Favorites),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={'Favorites'}
              focused={focused}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Favoritesfill
                  : GlobalInclude.GlobalAssets.Favoritesunfill
              }
            />
          ),
        },
      },

      MyProfile: {
        screen: DrawerNavigation('ContactUs'),
        navigationOptions: {
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              text={global.contect_us}
              style={{width: scale(20)}}
              focused={focused}
              source={
                focused
                  ? GlobalInclude.GlobalAssets.Profilefill
                  : GlobalInclude.GlobalAssets.Profileunfill
              }
              viewstyle={{borderTopRightRadius: scale(10)}}
            />
          ),
        },
      },
    },
    {
      initialRouteName: tab,
      tabBarOptions: {
        showLabel: false,
        tabStyle: {
          backgroundColor: 'black',
        },
      },
      activeColor: '#000',
      inactiveColor: '#3e2465',
    },
  );

const RootStacks = (load) => {
  return createStackNavigator(
    {
      Tab: {
        screen: TabNavigation('Home'),
        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      TabWithoutLogin: {
        screen: TabNavigationwithoutLogin('Home'),
        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      ProductDetail: {
        screen: ProductDetail,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      CheckOut: {
        screen: CheckOut,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Success: {
        screen: Success,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      PaymentMethod: {
        screen: PaymentMethod,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Setting: {
        screen: Setting,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Category: {
        screen: Category,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      MyOrder: {
        screen: MyOrder,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      OrderDetail: {
        screen: OrderDetail,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      MyAccount: {
        screen: MyAccount,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      ContectUs: {
        screen: ContectUs,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Product: {
        screen: Product,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      SubCategory: {
        screen: SubCategory,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Login: {
        screen: Login,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      SignUp: {
        screen: SignUp,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
          ProductDetail,
        },
      },
      ForgatPassword: {
        screen: ForgatPassword,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      ShippingAddress: {
        screen: ShippingAddress,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      PromoCodes: {
        screen: PromoCodes,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Offer: {
        screen: Offer,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      Help: {
        screen: Help,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      AboutUs: {
        screen: AboutUs,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      TearmsAndCondition: {
        screen: TearmsAndCondition,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      PrivacyPolicy: {
        screen: PrivacyPolicy,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
      MyProfile: {
        screen: MyProfileStack,

        headerMode: 'none',
        navigationOptions: {
          headerShown: false,
        },
      },
    },

    {
      initialRouteName: load,
      mode: 'modal',
    },
  );
};

export const RootNavigators = (root) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        MainApp: RootStacks(root),
      },
      {
        initialRouteName: 'MainApp',
      },
    ),
  );
};
