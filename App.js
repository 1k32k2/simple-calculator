// App.js
import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { SafeAreaView } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SafeAreaView,StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width
const windowheight = Dimensions.get('window').height

  let  resultText= " "
  let  calculationText= " "
  let  historyText= ""

  let operations = ['D','+','-','*','/'] //Các nút ở cột màu đen
  let nums = [['C','+/-','%'],[1,2,3],[4,5,6],[7,8,9],['.',0,'=']] //Các nút ở phần màu vàng


  //Khu vực thay đổi UI
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowheight,
    flex:1
  },
  //Kích cỡ chữ nhập vào (khung màu đỏ)
  resultText:{
    fontSize:30,
    color: 'white'
  },
  //Vị trí các nút
  btn:{
    flex:1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  //các nút C +/- % 1 2 3 4 5 ...
  btntext: {
    fontSize:30,
    color: 'black'
  },
  //các nút D + - * / F
  white: {
    fontSize: 30,
    color: 'white'
  },
  //Kích cỡ chữ xuất ra(khung màu xanh lá)
  calculationText:{
    fontSize:24,
    color: 'white'
  },

  row:{
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignContent: 'center'
  },
  //khung input(màu đỏ)
  result: {
    marginTop: 0,
    flex: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  //khung output(màu xanh lá)
  calculation: {
    marginTop: 0,
    flex: 2,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flexGrow:7,
    flexDirection: 'row'
  },
  //Các nút 1 2 3 4 5 ...
  numbers: {
    flex:3,
    backgroundColor: 'yellow'
  },
  //các nút D + - * / F
  operations: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'black'
  },

})

  // Hàm xóa hết ('C","+/-","%")
  function delcalc(temp)
  {
    switch(temp)
    {
      case 'C':
        calculationText = " "
        resultText= " "
        break
      case '+/-':
        resultText= resultText*-1
        break
      case'%':
        resultText=resultText+"/100"
        break
    }

      
  }

  // Hàm tính toán
  function calculateResult()
  {
    const text = resultText
    //console.log(text,eval(text))
    calculationText = eval(text)
  }

  function validate()
  {
    const text = resultText
    switch(text.slice(-1))
    {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
  }
  
  //các nút 123456789.0=
  function buttonPressed(text)
  {
    //console.log(text)
    if(text == '=')
    {
      return calculateResult() //Nếu nhấn = thì sẽ tính
    }
    resultText = resultText+text // Xuất ký tự đã nhập trên khung màu đỏ
  }

  //Xử lý các nút D+-*/F
  function operate(operation)
  {
    switch(operation)
    {
      case 'D':
        if(resultText!=" ")
        {
          console.log(resultText)
          let text = resultText.split('')
          text.pop()
          resultText = text.join('')
        }
        break
      case '+':
      case '-':
      case '*':
      case '/':
        //const lastChar = this.state.text.split('').pop()
        //if(this.operations.indexOf(lastChar) >0) return
        //if(this.state.text == ''|| this.state.text.split('').pop()) return
        resultText= resultText + operation
        break
    }
  }


    let rows = []
    let row = []
    for(let i =0; i<3;i++)//Vòng lặp tạo các nút C,+/-,%
    {
      row.push(<TouchableOpacity onPress={() => delcalc(nums[0][i])} style={styles.btn}>
                  <Text style={styles.btntext}>{nums[0][i]}</Text>
                </TouchableOpacity>)
    }
    rows.push(<View style={styles.row}>{row}</View>)
    for(let i=1; i<5; i++)//Vòng lặp tạo các nút 1,2,3,4,5,6,7,8,9,.,0,=
    {
      let row = []
      for(let j=0; j<3; j++)
      {
        row.push(<TouchableOpacity onPress={() => buttonPressed(nums[i][j])} style={styles.btn}>
                  <Text style={styles.btntext}>{nums[i][j]}</Text>
                </TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    
    let ops = []
    for(let i = 0; i<5; i++)//Vòng lặp tạo các nút D,+,-,*,/,F
    {
      ops.push(<TouchableOpacity style={styles.btn} onPress={() => operate(operations[i])} >
                  <Text style={[styles.btntext, styles.white]}>{operations[i]}</Text>
                </TouchableOpacity>)
    }
    //ops.push(<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(SettingsScreen)} >
    //        <Text style={[styles.btntext, styles.white]}>{'F'}</Text>
    //        </TouchableOpacity>)



function calc()
    {
      return (
        <View style = {styles.container}>
          <View style={styles.result}>  
            <Text style={styles.resultText}>{resultText}</Text>
          </View>
          <View style={styles.calculation}>
            <Text style={styles.calculationText}>{calculationText}</Text>
          </View>
          <View style={styles.buttons}>
            <View style={styles.numbers}>
              {rows}
            </View>
            <View style={styles.operations}>
              {ops}
            </View>
          </View>
        </View>
      );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }



const Tab = createBottomTabNavigator();

function calculator()
{
  <NavigationContainer>
      <calc />
    </NavigationContainer>
}

function MyTabs() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </SafeAreaView>   
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}