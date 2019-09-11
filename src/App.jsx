
import React, { Component, PureComponent, memo } from 'react'

// class Foo extends Component {

//   render() {
//     console.log('Foo render')
//     return (
//       <div>Foo</div>
//     )
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     if(nextProps.name === this.props.name) {
//       return false;
//     }
//   }
// }

// PureComponent 只是对第一级有效
// class Foo extends PureComponent {
//   render() {
//     console.log('Foo render');
//     return (
//       <div>{this.props.person.age}</div>
//     )
//   }
// }

const Foo = memo(function Foo(props) {
  console.log('foo render');
  return <div>{props.person.age}</div>
})

export default class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1
    }
  };
  callback = () => {

  };

  render() {
    const person = this.state.person;
    return (
      <div>
        {/* <button onClick={() => this.setState({count: this.state.count + 1})}>Click</button> */}
        <button onClick={() => {
          person.age++;
          this.setState({
            person
          });
        }}>person</button>
        <Foo person={person} cb={this.callback} />
      </div>
    )
  }
}
