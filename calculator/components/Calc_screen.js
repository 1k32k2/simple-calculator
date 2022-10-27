import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar ,
} from 'react-native';
import Child from './history_screen';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default class May_tinh extends React.Component {
  //Hàm khởi tạo
  constructor(props) {
    super(props);
    this.state = {
      resultText: ' ',
      calculationText: ' ',
      historyText: '',
      history: [],
    };

    this.operations = ['D', '+', '-', '*', '/']; //Các nút ở cột màu đen
    this.nums = [
      ['C', '+/-', '%'],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['.', 0, '='],
    ]; //Các nút ở phần màu vàng
  }

  create_history() {}

  // Hàm xóa hết ('C","+/-","%")
  delcalc(temp) {
    switch (temp) {
      case 'C':
        this.setState({ calculationText: ' ', resultText: ' ' });
        break;
      case '+/-':
        this.setState({ resultText: this.state.resultText * -1 });
        break;
      case '%':
        this.setState({ resultText: this.state.resultText + '/100' });
        break;
    }
  }

  // Hàm tính toán
  calculateResult() {
    const text = this.state.resultText;
    const text1 = eval(text);
    //console.log(text,eval(text))
    this.setState({ calculationText: text1 });
    this.state.history.push(text + '=' + text1);
  }

  validate() {
    const text = this.stage.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
  }

  //các nút 123456789.0=
  buttonPressed(text) {
    //console.log(text)
    if (text == '=') {
      return this.calculateResult(); //Nếu nhấn = thì sẽ tính
    }
    this.setState({ resultText: this.state.resultText + text }); // Xuất ký tự đã nhập trên khung màu đỏ
  }

  //Xử lý các nút D+-*/F
  operate(operation) {
    switch (operation) {
      case 'D':
        if (this.state.resultText != ' ') {
          console.log(this.state.resultText);
          let text = this.state.resultText.split('');
          text.pop();
          this.setState({ resultText: text.join('') });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        //const lastChar = this.state.text.split('').pop()
        //if(this.operations.indexOf(lastChar) >0) return
        //if(this.state.text == ''|| this.state.text.split('').pop()) return
        this.setState({ resultText: this.state.resultText + operation });
        break;
    }
  }

  render() {
    const {history} = this.state;
    let rows = [];
    let row = [];
    for (
      let i = 0;
      i < 3;
      i++ //Vòng lặp tạo các nút C,+/-,%
    ) {
      row.push(
        <TouchableOpacity
          onPress={() => this.delcalc(this.nums[0][i])}
          style={styles.btn}>
          <Text style={styles.btntext}>{this.nums[0][i]}</Text>
        </TouchableOpacity>
      );
    }
    rows.push(<View style={styles.row}>{row}</View>);
    for (
      let i = 1;
      i < 5;
      i++ //Vòng lặp tạo các nút 1,2,3,4,5,6,7,8,9,.,0,=
    ) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            onPress={() => this.buttonPressed(this.nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btntext}>{this.nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (
      let i = 0;
      i < 5;
      i++ //Vòng lặp tạo các nút D,+,-,*,/,F
    ) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btntext, styles.white]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
      
    }
    ops.push(
      <TouchableOpacity
        style={styles.btn}
        onPress={() => this.props.navigation.navigate('History')}
        >
        <Text style={[styles.btntext, styles.white]}>{'F'}</Text>
        
      </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>
          <View style={styles.calculation}>
            <Text style={styles.calculationText}>
              {this.state.calculationText}
            </Text>
          </View>
          <View style={styles.buttons}>
            <View style={styles.numbers}>{rows}</View>
            <View style={styles.operations}>{ops}</View>
          </View>
          <Child history_arr={this.state.history} />
          </ScrollView >
        </View>
        
    );
  }
}

//Khu vực thay đổi UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  //Kích cỡ chữ nhập vào (khung màu đỏ)
  resultText: {
    fontSize: 30,
    color: 'white',
  },
  //Vị trí các nút
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  //các nút C +/- % 1 2 3 4 5 ...
  btntext: {
    fontSize: '2em',
    color: 'black',
  },
  //các nút D + - * / F
  white: {
    fontSize: 30,
    color: 'white',
  },
  //Kích cỡ chữ xuất ra(khung màu xanh lá)
  calculationText: {
    fontSize: 24,
    color: 'white',
  },

  row: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  //khung input(màu đỏ)
  result: {
    marginTop: 0,
    width: '100%',
    height: '20%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  //khung output(màu xanh lá)
  calculation: {
    marginTop: 0,
    width: '100%',
    height: '10%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row',
  },
  //Các nút 1 2 3 4 5 ...
  numbers: {
    flex: 3,
    backgroundColor: 'yellow',
  },
  //các nút D + - * / F
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  }, 
});
