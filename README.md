
1. run npm run eject to config project to ensure PWA.

including context, ContextType, lazy, Suspense memo(优化渲染))

context: context提供了一种方式，能够让数据在组件树种传递而不必一级一级手动传递。可以跳过层级，直接从最上级继承， 
context 有两个派生组件：<Provider> 和 <Consumer>， consumer 是 provider 的后代

API： createContext(defaultValue?) defaultValue 经常在consumer 在 provider找不到的时候可以使用，经常用于单元测试

一般一个组件只是使用一个context，

```
const BatteryContext = createContext();
const OnlineContext = createContext();

class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => (
            <OnlineContext.Consumer>
              {
                online => <h1>Battery: {battery}, Online: {String(online)}</h1>
              }
            </OnlineContext.Consumer>
          )
        }
      </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component {
  render() {
    return (
      <Leaf />
    )
  }
}
class App extends Component {
  // simplify the state
  constructor(props) {
    super(props);
    this.state = {
      battery: 60,
      online: false
    }
  }
  render() {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button type='button' onClick={() => this.setState({battery: battery - 1})}>
            Press
          </button>
          <button type='button' onClick={() => this.setState({online: !online})}>
            Switch
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
  
}
```


```
static contextType = BatteryContext;
  // contextType will replace BatteryContext.Consumer
```

程序运行的时候的提升性能： lazy, suspense
暂时没有使用的资源就需要：延迟加载
webpack code-splitting 
import `import('..).then(...)`

memo: 运行时性能优化

React 就是数据和视图的桥梁

```
const About = lazy(() => import(/*webpackChunkName: "about" */'./About'));

<Fragment>
  <Suspense fallback={<div>loading</div>}>
    <About />
  </Suspense>
</Fragment>

componentDidCatch() {
  this.setState({
    hasError: true
  })
}

// static getDerivedStateFromError() {
//   reurn {
//     hasError: true,
//   };
// }

```

考虑到PureComponent 以及memo的问题，应该可以使用静态类方法或者静态类属性，也就是箭头函数.可以和pureComponent 联合使用了，当然也可以使用memo for 函数组件

