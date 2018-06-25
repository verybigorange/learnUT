import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Enzyme,{ mount } from 'enzyme'; //enzyme中mount（深渲染，渲染自身以及子）、shallow（浅渲染，只需染自身）
import Adapter from 'enzyme-adapter-react-16'; //适配器


Enzyme.configure({ adapter: new Adapter() }); 

describe('<App/>',() => {
  it('成功render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('判断app中的h2标签的文本是否是test',()=>{
    const wrap = mount(<App />);
    const h2 = wrap.find('#test');
    expect(h2.text()).toBe('test');
  })

  // .resolves
  it('期望promise的返回值是1',()=>{
    const p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(1)
      },1000)
    })
    expect(p).resolves.toBe(1)
    return p
  })

  // 异步情况
  it('期望promise的返回值是2',()=>{
    const p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(2)
      },1000)
    })
    p.then((a)=>{
      expect(a).toBe(2)
    })
    return p
  })

  // .toHaveBeenCalled
  it('确保fn被调用',()=>{
    const fn = jest.fn(()=>true);
    fn()
    expect(fn).toHaveBeenCalled()
  })

  // .toHaveBeenCalled
  it('确保fn被调用3次',()=>{
    const fn = jest.fn(()=>true);
    fn()
    fn()
    fn()
    expect(fn).toHaveBeenCalledTimes(3)
  })

  // .toBeFalsy,false, 0, '', null, undefined, and NaN都为假。相反地，.toBeTruthy
  it('值为假',()=>{
    expect('').toBeFalsy()
  })
  
  // .toEqual
  it('深比较字段相等',()=>{
    const obj1 = {name:"123",age:12,a:{a:1}};
    const obj2 = {name:"123",age:12,a:{a:1}};
    expect(obj1).toEqual(obj2)
  })

  // .toBeGreaterThan,.toBeLessThan,.toBeGreaterThanOrEqual,.toBeLessThanOrEqual
  it('比12大',()=>{
    expect(13).toBeGreaterThan(12)
  })

  // .toHaveLength
  it('数组长度是3',()=>{
    expect([1,2,3]).toHaveLength(3)
  })

})


// 自定义 received期望收到的,argument实际收到的。在自定义的拓展函数中可以用this调用一些工具方法
expect.extend({
  selfTestFn(received,argument){
    let pass = received%argument === 0?true:false;
    if(pass){
      return {
          pass: true,
      };
    }else{
      return {
        message: () =>`expected ${received} 不能被 ${argument} 整除`,
        pass: false,
      };
    }
  }
})

test("expect方法扩展",()=>{
  expect(4).selfTestFn(2)
})