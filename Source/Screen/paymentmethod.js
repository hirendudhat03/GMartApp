//import React
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';

const dummyArray = [
  {id: '1', value: 'A'},
  {id: '2', value: 'B'},
];

const home = ({navigation}) => {
  const [ListItems] = useState(dummyArray);
  const [Alert_Visibility, setAlert_Visibility] = useState(false);

  const Filter = (visible) => {
    setAlert_Visibility(visible);
  };

  const AllCategory = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: GlobalInclude.GlobalColor.ColorBlack,
            borderRadius: scale(7),
            height: scale(200),
            marginTop: scale(20),
          }}>
          <View style={{marginHorizontal: scale(20)}}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.Card}
              style={{
                height: scale(30),
                width: scale(40),
                fontSize: scale(15),
                marginTop: scale(25),
              }}
            />

            <GlobalInclude.GlobalTextBox
              text={'**** **** **** 3947'}
              style={{
                marginTop: scale(20),
                textAlign: 'left',
                fontSize: scale(20),
                color: GlobalInclude.GlobalColor.ColorWhite,
              }}
            />

            <View style={{flexDirection: 'row', marginTop: scale(30)}}>
              <View style={{flex: 2}}>
                <GlobalInclude.GlobalTextBox
                  text={'Card Holder Name'}
                  style={{
                    color: GlobalInclude.GlobalColor.ColorWhite,
                    textAlign: 'left',
                    fontSize: scale(12),
                  }}
                />
                <GlobalInclude.GlobalTextBox
                  text={'Jennyfer Doe'}
                  style={{
                    color: GlobalInclude.GlobalColor.ColorWhite,
                    textAlign: 'left',
                    fontSize: scale(15),
                  }}
                />
              </View>
              <View style={{flex: 1.5}}>
                <GlobalInclude.GlobalTextBox
                  text={'Expiry Date'}
                  style={{
                    color: GlobalInclude.GlobalColor.ColorWhite,
                    textAlign: 'left',
                    fontSize: scale(12),
                  }}
                />
                <GlobalInclude.GlobalTextBox
                  text={'05/23'}
                  style={{
                    color: GlobalInclude.GlobalColor.ColorWhite,
                    textAlign: 'left',
                    fontSize: scale(15),
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <GlobalInclude.GlobalImageBox
                  source={GlobalInclude.GlobalAssets.Card}
                  style={{
                    height: scale(30),
                    width: scale(40),
                    fontSize: scale(15),
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: scale(30),
            alignItems: 'center',
          }}>
          <View
            style={{
              height: scale(15),
              width: scale(15),
              // backgroundColor: GlobalInclude.GlobalColor.ColorBlack,
              borderRadius: scale(3),
              borderWidth: scale(1),
              borderColor: GlobalInclude.GlobalColor.LightGray,
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={'Use As default payment method'}
            style={{marginLeft: scale(10)}}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      <View
        style={{
          height: scale(80),
          backgroundColor: GlobalInclude.GlobalColor.ColorRed,
          justifyContent: 'flex-end',
        }}>
        <View style={{flexDirection: 'row', height: scale(50)}}>
          <View style={{flex: 1}}>
          <TouchableOpacity onPress={ () => navigation.goBack()}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.LeftIcon2}
              style={{
                height: scale(20),
                width: scale(14),
                marginLeft: scale(20),
              }}
              viewstyle={{
                height: scale(40),
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            />
            </TouchableOpacity>
          </View>
          <GlobalInclude.GlobalTextBox
            text={'Payment methods'}
            style={{
              fontSize: scale(20),
              color: GlobalInclude.GlobalColor.ColorWhite,
              textAlign: 'center',
            }}
            viewstyle={{justifyContent: 'center', height: scale(40)}}
          />
          <View style={{flex: 1}}>
            {/* <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.Search}
              style={{
                height: scale(20),
                width: scale(20),
                marginRight: scale(20),
                tintColor: GlobalInclude.GlobalColor.ColorWhite,
              }}
              viewstyle={{
                height: scale(40),
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            /> */}
          </View>
        </View>
      </View>

      {/* Design */}

      <ScrollView>
        <View style={{marginHorizontal: scale(15)}}>
          
          <GlobalInclude.GlobalTextBox
            text={'Your payment cards'}
            style={{textAlign: 'left', fontSize: scale(15)}}
            viewstyle={{marginTop: scale(20)}}
          />
          <View style={{marginTop: scale(10)}}>
            <FlatList
              data={ListItems}
              renderItem={AllCategory}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <TouchableOpacity onPress={() => Filter()}>
            <View style={{alignItems: 'flex-end'}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Plus}
                style={{height: scale(15), width: scale(15)}}
                viewstyle={{
                  height: scale(50),
                  width: scale(50),
                  borderRadius: scale(50),
                  backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: scale(20),
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Model */}

      <Modal
        visible={Alert_Visibility}
        transparent={true}
        animationType={'slide'}>
        
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <TouchableOpacity onPress={ () => Filter(false)}>
          <View style={{height:'100%'}}></View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              height: '72%',
              borderTopLeftRadius: scale(40),
              borderTopRightRadius: scale(40),
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
            <ScrollView style={{marginTop: scale(20)}}>
              <GlobalInclude.GlobalTextBox
                text={'Add new card'}
                style={{fontSize: scale(15)}}
              />

              <GlobalInclude.FlotingTextInput placeholder={'Name on card'} />
              <GlobalInclude.FlotingTextInput
                placeholder={'Card number'}
                iconright={GlobalInclude.GlobalAssets.Card}
                iconstyleright={{height: scale(25), width: scale(32)}}
                viewstyle={{flexDirection: 'row'}}
                innerviewstyle={{flex: 3}}
                viewstylerightmain={{flex: 1}}
                viewstyleright={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              />
              <GlobalInclude.FlotingTextInput placeholder={'Expire Date'} />
              <GlobalInclude.FlotingTextInput
                placeholder={'CVV'}
                iconright={GlobalInclude.GlobalAssets.CVV}
                iconstyleright={{height: scale(25), width: scale(25)}}
                viewstyle={{flexDirection: 'row'}}
                innerviewstyle={{flex: 3}}
                viewstylerightmain={{flex: 1}}
                viewstyleright={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  height: scale(30),
                  alignItems: 'center',
                  marginHorizontal: scale(20),
                  marginTop: scale(20),
                }}>
                <View
                  style={{
                    height: scale(15),
                    width: scale(15),
                    // backgroundColor: GlobalInclude.GlobalColor.ColorBlack,
                    borderRadius: scale(3),
                    borderWidth: scale(1),
                    borderColor: GlobalInclude.GlobalColor.LightGray,
                  }}
                />
                <GlobalInclude.GlobalTextBox
                  text={'Use As default payment method'}
                  style={{marginLeft: scale(10)}}
                />
              </View>

              <GlobalInclude.GlobalTextBox
                text={'ADD CARD'}
                style={{
                  fontSize: scale(15),
                  color: GlobalInclude.GlobalColor.ColorWhite,
                }}
                viewstyle={{
                  backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                  marginHorizontal: scale(20),
                  height: scale(45),
                  borderRadius: scale(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: scale(20),
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default home;
