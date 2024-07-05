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
