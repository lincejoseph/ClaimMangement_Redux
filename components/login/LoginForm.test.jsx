import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginComponent from './LoginForm.jsx';
  
configure({adapter: new Adapter()});

describe("LoginComponent", () => {
  let wrapper;
  it("should render my component", () => {
    wrapper = shallow(<LoginComponent />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should check alert ", () => {
    wrapper = mount(<LoginComponent />);
    const countState = wrapper.state().invalidUser;
    expect(countState).toBe(false);
  });

  test('username check',()=>
	{
		wrapper = mount(<LoginComponent/>);
		wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'ab'}});
		expect(wrapper.state('emptyuser')).toEqual(true);
	})
	it('password check',()=>
	{

		wrapper = mount(<LoginComponent />);
		const container = wrapper.find('input[type="password"]');
		expect(container.length).toEqual(1)
		container.simulate('change', {target: {name: 'password', value: 'test123'}});
		expect(wrapper.state('password')).toEqual('test123');
	})


	it('login check with wrong data',()=>{
		wrapper = mount(<LoginComponent/>);
		wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'test'}});
		wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'test'}});
		wrapper.find('button').simulate('click');
		expect(wrapper.state('invalidUser')).toBe(false);
	})


  
});
