# Todo App

一个基于 vue 的待办事项应用。

## 碎碎念

非常好的应用让我反复感受到什么是绝望（bushi）。

找教程看教程就花了很多天，官网互动教程跟着敲了一遍，发现敲完连新手村都走不出去，没办法，开始各种找视频学习，然而大多数视频 vue2 和 vue3 的写法都混在了一起，于是就常常出现以下疑问：

- 这名词啥意思啊？
- 这玩意有啥用啊？
- 为什么他这样写就行我这样写就报错啊 TAT

幸好，最后发现了张天禹主讲的 vue3，不会 ts，不会 vue2，抱着随便听着玩玩的心态，然后打开了新世界的大门，感觉是讲的最清楚的了，实在是相见恨晚。

其实直到写完这个应用我还没有把尚硅谷教程看完，对组件通信和状态管理这些概念还很模糊，大概就是知道好用，关键，但是还不会上手。有个 bug 暂时还没解决，就是 post 之后 todos 数组新增的项没有 id，导致无法用 delete 删除，要手动刷新或者加一个 location.reload()，但是影响用户体验，所以还是把它注释掉了。其实之前作业也有遇到同样的问题，我打算后面多学习一下再来完善。

编写的全程就是痛并快乐着，痛就不用说了，越写越觉得自己真是菜啊，基本功相当不扎实啊，可恶，等我写完了一定要去学习啊。快乐就类似于得到新玩具，比如第一次尝试导入组件库后，就直接想躺平把所有的页面效果都交给组件库了。

事实上，以我现有的水平，只能凭浅薄的理解去拼凑一大坨，很多功能实现的都不够好。等我之后学的久了，理解更深刻了再来重构一下吧。
