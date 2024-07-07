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

## Advanced configuration with render props

* Render props were very useful when we needed to share stateful logic between components without lifting it up.
* But hooks replaced that use case in 99% of cases.
* Render props for sharing stateful logic and data can still be useful even today, for example, when this logic is attached to a DOM element.

```tsx
type ScrollDetectorProps = {
  children: (width: number) => ReactElement;
};

const ScrollDetector = ({ children }: ScrollDetectorProps) => {
  const [scroll, setScroll] = useState(0);
    // DOM related
  return (
    <div className="scrollable-block" onScroll={(e) => setScroll(e.currentTarget?.scrollTop)}>
      {children(scroll)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
```

## Memorization with useMemo useCallback and React.memo

* Memorizing props on a component makes sense only when:
  * This component is wrapped in React.memo
  * This component uses those props as dependencies in any of the hooks
  * This component passes those props down to other components and they have either of the situations from above
* If a component is wrapped in React.memo and its re-render is triggered by its parent, then React will not re-render this component if its props havn't changed. In any other case, re-render will proceed as usual.
* Memorizing all props on a component wrapped in React.memo is harder than it seems. Avoid passing non-primitive values that are coming from other props or hooks to it.
* When memorizing props, remember that "children" is also a non-primitive prop that need to be memorized.

```tsx
const Component1 = ()=>{
    const content = useMemo(()=> <div>children content</div>,[] );
    return <MemoChild>{content}</MemoChild>
}
const Component2 = ()=>{
    const contentfn = useCallback(()=><div>render props content</div>,[]);
    return <MemoChild>{contentfn}</MemoChild>
}
```

React.memo 过于脆弱，相关的 props (包括children)都要缓存起来才能避免不必要的re-render.

在以往的实践中， useMemo useCallback有滥用的倾向。在很少使用React.memo这个大前提下，这两个主要应该服务于 作为其他 hook的dep的一部分，这时候缓存才有意义，尤其是useCallback。useMemo还可以argue是为了缓存 expensive calculations ，然而前端的计算大部分算不上昂贵。
