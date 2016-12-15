系统通用组件都由STI技术小组开发，严格遵守Vue 2.0规范，代码示例：
1. <label id="#description">国际化文件注册说明</label>
``` javascript
// 找到configs下的I18nConfig.es6文件
//  第一步:引入国际化文件
import sti_zh_CN from 'i18n/sti_zh_CN.es6'
//  第二步：添加到相关的时区键值中
//  如果是中文简体，则添加到zh_CN中，如下
zh_CN : {
     sti : sti_zh_CN
}
//   现在可以对国际化信息进行使用了
```
2. 
