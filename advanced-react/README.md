# [Advanced React](https://book.douban.com/subject/36631232/)

* [Developer Way](https://www.developerway.com/)
* [Advanced React](https://www.advanced-react.com/)
* [Author Youtube](https://www.youtube.com/@developerwaypatterns)

## Intro-to re-renders

![Moving State Down](./movingStateDown.png)

![React.memo](./memo.png)

* Re-rendering is how React updates components with new data. Without re-renders, there will be no interactivity in our apps.
* State update is the initial source of all re-renders.
* If a component's re-render is triggered, all nested components inside that component will be re-rendered.
* During the normal React re-renders cycle ( without the use of memoization ) , props change doesn't matter: components will re-render even if they don't have any props.
* We can use the pattern known as "moving state down" to prevent unnecessary re-renders in big apps.
* State update in a hook will trigger the re-render of a component that uses this hook, even if the state is not used.
* In the case of hooks using other hooks, any state update within that chain of hooks will trigger the re-render of a component that uses the very first hook.

## Elements, children as props, and re-renders (**Components as Props Pattern**)

Passing components as props can improve the performance.

```tsx
<Parent>
    <ExpensiveChild/>
</Parent>
```

当Parent组件因为自身状态变化rerender的时候，ExpensiveChild是作为props传进来的，因而不会被rerender( call ExpensiveChild function )。 在diff过程中，因为 ExpensiveChild 对应的 Element是 完全一致的，因而可以跳过diff过程。

* A component is just a function that accepts an argument (props) and returns Elements that should be rendered when this Component renders on the screen.
* An Element is an object that describes what needs to be rendered on the screen, with the type either a string for string for DOM element or a reference to a Component for components.
* Re-render is just React calling the Component's function.
* A component re-renders when its element object changes, as determined by ```Object.is``` comparison of it before and after re-render.
* When element are passed as props to a component, and this component triggers a re-render through a state update , elements that are passed as props won't re-render.

## Configuration concerns with elements as props

Components as Props Pattern 是 separation of concerns 的一种体现

### Conditional rendering and performance

```tsx
const App = ()=>{
    const [isOpen,setIsOpen] = useState(false);
    // Footer component will get involked after the isOpen is set to true
    const footer = <Footer />;

    return isOpen ? (
        <ModalDialog footer={footer} />
    ) : null;
}
```

If a component that has elements as props is rendered conditionally, then even if those elements are created outside of the condition, they will only be rendered when the conditional component is rendered.

### Default values for the elements from props

[Demo](https://www.advanced-react.com/examples/03/05)

```tsx
type ButtonProps = {
  icon: ReactElement;
  size?: 'large' | 'normal';
  appearance?: 'primary' | 'secondary';
};
const Button = ({ icon, size = 'normal', appearance = 'primary' }: ButtonProps) => {
  // create default props
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  const newProps = {
    ...defaultIconProps,
    // make sure that props that are coming from the icon override default if they exist
    ...icon.props,
  };

  // clone the icon and assign new props to it
  const clonedIcon = React.cloneElement(icon, newProps);

  return <button className={`button ${appearance}`}>Submit {clonedIcon}</button>;
};
```

基于cloneElement方法添加一些props。当然这个API现在已经不推荐使用了
