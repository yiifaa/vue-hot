国际化组件message使用示例:
```
<message :keys="'sti.title'"/>
```
需要注意的是：
1. keys的值必须用单引号，让其成为js String对象；
2. keys的值必须是在国际化文件中注册过的；