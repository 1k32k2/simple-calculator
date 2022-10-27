import React, { Component } from 'react';
import { Text, TextInput, View,TouchableOpacity,StyleSheet } from 'react-native';

export default class Lich_su extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', his_arr: this.props.history_arr}
    this.oper = ['D', '+', '-', '*', '/']; //Các nút ở cột màu đen
    this.number = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['.', 0, '='],
    ]; //Các nút ở phần màu vàng
  }
  //this.props.calculationText
//['6+6=12','100+100=12','10+10=20']

  pressbtn(text) {
      this.setState({ text: this.state.text + text }); // Xuất ký tự đã nhập trên khung màu đỏ
    }

  operate(operation) {
    switch (operation) {
      case 'D':
        if (this.state.text != ' ') {
          console.log(this.state.text);
          let t = this.state.text.split('');
          t.pop();
          this.setState({ text: t.join('') });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        //const lastChar = this.state.text.split('').pop()
        //if(this.operations.indexOf(lastChar) >0) return
        //if(this.state.text == ''|| this.state.text.split('').pop()) return
        this.setState({ text: this.state.text + operation });
        break;
    }
  }

  Searching (str, strArray) {
    if (typeof strArray === 'undefined') return -1;
    const arr = []
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) 
          arr.push(j);
    }
    if(arr.length == 0)
    return -1;
    return arr
  }

  check(num) {
    if(num == -1)
      return "404 not found"
    else
      return this.state.his_arr[num]
  }

  findhistory()
  {
    if(this.state.his_arr.length < 1)
      return "404 not found"
    else
    {
      let temp =this.Searching (this.state.text, this.state.his_arr);
      if(temp ==-1)
      return "Not in history"
      else
      {
        if(temp.length<0)
        return "ERROR!!!!"
        else
        {
          let temp_arr=[]
          let count = 0
          for(var i=0; i<temp.length; i++)
          {
            temp_arr[count] = this.state.his_arr[temp[i]];
            count = count + 1;
          }
          if(temp_arr.length <1)
            return "Nothing"
          if(temp_arr.length <2)
            return temp_arr
          return temp_arr.join('\n')
        }
      }
//      let array_of_history=[];
//      for(var i=0; i<this.state.his_arr.length; i++)
//      {
//        this.array_of_history.push(this.check(this.Searching (this.state.text, this.state.his_arr)))
 //     }
//      return array_of_history
    }
    
  }

  print()
  {
    if(this.state.his_arr.length <1)
      return "Nothing"
    if(this.state.his_arr.length <2)
      return this.state.his_arr
    return this.state.his_arr.join('\n')
  }

  render() {
    let rows = [];
    //Vòng lặp tạo các nút 1,2,3,4,5,6,7,8,9,.,0,=
    for (let i = 0;i < 4;i++ ) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            onPress={() => this.pressbtn(this.number[i][j])}
            style={sty.btn}>
            <Text style={sty.btntext}>{this.number[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={sty.row}>{row}</View>);
    }

    let ops = [];
    //Vòng lặp tạo các nút D,+,-,*,/,F
    for (let i = 0;i < 5;i++ ) {
      ops.push(
        <TouchableOpacity
          style={sty.btn}
          onPress={() => this.operate(this.oper[i])}>
          <Text style={[sty.btntext, sty.white]}>
            {this.oper[i]}
          </Text>
        </TouchableOpacity>
      );
      
    }
    return (
      <View style={{flex: 1}}>
        <TextInput
          placeholder="Search history"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text style={{padding: 10, fontSize: 10}}>
          {this.findhistory()}
        </Text> 
        <View style={sty.buttons}>
            <View style={sty.numbers}>{rows}</View>
            <View style={sty.operations}>{ops}</View>
        </View>
        
      </View>
    );
  }
}

const sty = StyleSheet.create({

  //Kích cỡ chữ nhập vào (khung màu đỏ)
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


  row: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-around',
    alignContent: 'center',
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
    white: {
    fontSize: 30,
    color: 'white',
  },
});

//<Text style={{padding: 10, fontSize: 10}}>
//          {this.print()}
//       </Text> 