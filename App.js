import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class App extends Component 
{
  //Hàm khởi tạo
  constructor()
  {
    super();
    this.state = {
      resultText: "", 
      calculationText: "",
      }
    this.operations = ['D','+','-','*','/','F'] //Các nút ở cột màu đen
    this.nums = [['C','+/-','%'],[1,2,3],[4,5,6],[7,8,9],['.',0,'=']] //Các nút ở phần màu vàng
  }


  history()
  {

  }
  // Hàm xóa hết ('C","+/-","%")
  delcalc(temp)
  {
    switch(temp)
    {
      case 'C':
        this.setState({calculationText: "",resultText: ""})
        break
      case '+/-':
        this.setState({resultText: this.state.resultText*-1})
        break
      case'%':
        this.setState({resultText: this.state.resultText+"/100"})
        break
    }

      
  }

  // Hàm tính toán
  calculateResult()
  {
    const text = this.state.resultText
    //console.log(text,eval(text))
    this.setState({calculationText: eval(text)})
  }

  validate()
  {
    const text = this.stage.resultText
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
  buttonPressed(text)
  {
    //console.log(text)
    if(text == '=')
    {
      return this.calculateResult() //Nếu nhấn = thì sẽ tính
    }
    this.setState({resultText: this.state.resultText+text}) // Xuất ký tự đã nhập trên khung màu đỏ
  }

  //Xử lý các nút D+-*/
  operate(operation)
  {
    switch(operation)
    {
      case 'D':
        console.log(this.state.resultText)
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({ resultText: text.join('')})
        break
      case '+':
      case '-':
      case '*':
      case '/':
        //const lastChar = this.state.text.split('').pop()
        //if(this.operations.indexOf(lastChar) >0) return
        //if(this.state.text == ''|| this.state.text.split('').pop()) return
        this.setState({resultText: this.state.resultText + operation})
    }
  }

  render()
  {
    let rows = []
    let row = []
    for(let i =0; i<3;i++)//Vòng lặp tạo các nút C,+/-,%
    {
      row.push(<TouchableOpacity onPress={() => this.delcalc(this.nums[0][i])} style={styles.btn}>
                  <Text style={styles.btntext}>{this.nums[0][i]}</Text>
                </TouchableOpacity>)
    }
    rows.push(<View style={styles.row}>{row}</View>)
    for(let i=1; i<5; i++)//Vòng lặp tạo các nút 1,2,3,4,5,6,7,8,9,.,0,=
    {
      let row = []
      for(let j=0; j<3; j++)
      {
        row.push(<TouchableOpacity onPress={() => this.buttonPressed(this.nums[i][j])} style={styles.btn}>
                  <Text style={styles.btntext}>{this.nums[i][j]}</Text>
                </TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    
    let ops = []
    for(let i = 0; i<6; i++)//Vòng lặp tạo các nút D,+,-,*,/,F
    {
      ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(this.operations[i])} >
                  <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
                </TouchableOpacity>)
    }
    return (
      <View style = {styles.container}>
        <View style={styles.result}>  
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
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
}

//Khu vực thay đổi UI
const styles = StyleSheet.create({
  container: {
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
    flex:2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  //khung output(màu xanh lá)
  calculation: {
    flex:1,
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