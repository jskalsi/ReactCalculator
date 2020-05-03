import React, {Component} from 'react';
import Button from './components/Button';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      current: '0',
      previous: [],
      resetNext: false
    }
  }

  reset = () =>{
    this.setState({
      current: '0',
      previous: [],
      resetNext: false
    })
  }

  addToCurrent = (symbol) =>{
    if(["/", "*", "-", "+"].indexOf(symbol)>-1){
      let {current, previous} = this.state;
      if(this.state.previous.length>0){
        previous.push(eval(String(previous[previous.length-1]+current))+symbol);
      }else{
        previous.push(this.state.current+symbol);
      }
      this.setState({previous: previous, resetNext: true});
    }else{
      if((this.state.current==="0" && symbol !== ".") || this.state.resetNext){
        this.setState({current: symbol, resetNext: false});
      }else{
        this.setState({current: this.state.current + symbol});
      }
    }
  }

  calculate = (symbol) =>{
    let {current, previous, resetNext} = this.state;
    if(previous.length>0){
      current=eval(String(previous[previous.length-1]+current));
      this.setState({
        current,
        previous:[],
        resetNext:true
      });
    }
  }

  render(){
    const buttons = [
      {symbol: 'C', colWidth:3, action:this.reset},
      {symbol: '/', colWidth:1, action:this.addToCurrent},
      {symbol: '7', colWidth:1, action:this.addToCurrent},
      {symbol: '8', colWidth:1, action:this.addToCurrent},
      {symbol: '9', colWidth:1, action:this.addToCurrent},
      {symbol: '*', colWidth:1, action:this.addToCurrent},
      {symbol: '4', colWidth:1, action:this.addToCurrent},
      {symbol: '5', colWidth:1, action:this.addToCurrent},
      {symbol: '6', colWidth:1, action:this.addToCurrent},
      {symbol: '-', colWidth:1, action:this.addToCurrent},
      {symbol: '1', colWidth:1, action:this.addToCurrent},
      {symbol: '2', colWidth:1, action:this.addToCurrent},
      {symbol: '3', colWidth:1, action:this.addToCurrent},
      {symbol: '+', colWidth:1, action:this.addToCurrent},
      {symbol: '0', colWidth:2, action:this.addToCurrent},
      {symbol: '.', colWidth:1, action:this.addToCurrent},
      {symbol: '=', colWidth:1, action:this.calculate},
    ];

    return (
      <div className="App">
        {this.state.previous.length>0 ? 
          <div className="last">{this.state.previous[this.state.previous.length-1]}</div>
        :null}
        <input className="result" type="text" value={this.state.current} />

        {buttons.map((btn,index)=>{
          return <Button key={index} symbol={btn.symbol} colWidth={btn.colWidth} action={(symbol)=>btn.action(symbol)} />
        })}

      </div>
    );
  }
}

export default App;
