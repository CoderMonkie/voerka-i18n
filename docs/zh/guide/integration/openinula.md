# OpenInula应用

`OpenInula`是华为开源的一个类`React`的构建用户界面的响应式`JavaScript`库，见[这里](https://openinula.net/)

本节介绍如何为`OpenInula`工程添加`voerkai18n`支持。
 
 ![](./openinula_demo.gif)

## 第一步：引入

`OpenInula`应用启用`VoerkaI18n`国际化功能的完整工程化流程如下：

- 调用`voerkai18n init`初始化多语言工程
- 调用`voerkai18n extract`提取要翻译的文本
- 调用`voerkai18n translate`进行自动翻译或人工翻译
- 调用`voerkai18n compile`编译语言包
- 在应用中引入`@voerkai18n/openinula`和`@voerkai18n/vite`插件
- 在源码中使用`t`函数进行翻译

完整的工程化流程请参见[工程化](../intro/get-started)，以下简要介绍如何在`Vue`应用中使用`VoerkaI18n`。

## 第二步： 安装`Vite`插件

在`vite.config.js`中配置导入安装`@voerkai18n/vite`插件。

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'
import Voerkai18nPlugin from "@voerkai18n/vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Inspect(),  // localhost:3000/__inspect/ 
        Voerkai18nPlugin({ 
            debug: true     // 输出一些调试信息
        }),
        react()
    ]
})
```

详见[@voerkai18n/vite](../tools/plugins)插件介绍。

## 第三步：导入`t`翻译函数

`t`翻译函数用来进行文件翻译，普通的`OpenInula`应用`t`翻译函数可以用在两个地方：

- 普通的`js`或`ts`文件
- 组件`jsx、tsx`文件

### 在`js|ts`文件中使用

只需要从`languages`直接导入`t`函数即可。

```javascript
import { t } from "./languages"
```
取决于您是从哪一个文件中导入，需要修改导入位置，可能类似这样：
```javascript
import { t } from "./languages"
import { t } from "../languages"
import { t } from "../../languages"
import { t } from "../../../languages"

console.log(t("中华人民共和国"))

```

- 导入`t`函数后就可以直接使用了。如果启用了`@voerkai18n/vite`插件的`autoImport`,则会自动导入`t`函数，无需手动导入。


### 在组件中使用

在组件中使用`t`函数翻译与在`js|ts`文件中使用的最大区别在于：**当切换语言时，需要触发组件的重新渲染**。为此我们需要在根应用配置`Provider`。

1. **配置根组件Provider**

使用`VoerkaI18nProvider`包装应用根组件，本质上是创建了一个`VoerkaI18nContext.Provider`。

```jsx

// 1.当前语言Scope
import { i18nScope } from "./languages"
import { VoerkaI18nProvider } from "@voerkai18n/openinula"

export default App(){
	return (
        <VoerkaI18nProvider scope={i18nScope}>
            <MyComponent/>
        <VoerkaI18nProvider/>
   )
}
```

`VoerkaI18nProvider`还具有一个`fallback`属性，用来指定语言包加载未完成时显示一些如`正在加载语言包...`等信息。

```jsx

// 1.当前语言Scope
import { i18nScope } from "./languages"
import { VoerkaI18nProvider } from "@voerkai18n/openinula"

export default App(){
	return (
        <VoerkaI18nProvider fallback={<div>正在加载语言包...</div>} scope={i18nScope}>
            <MyComponent/>
        <VoerkaI18nProvider/>
   )
}
```


2. **组件中使用`t`翻译函数**

接下来通过`useVoerkaI18n`获取当前作用域的`t`翻译函数。

```jsx
import { useVoerkaI18n } from "@voerkai18n/openinula"
export function MyComponent(){
     const { t } = useVoerkaI18n()
    return ( 
        <div>{t("要翻译的内容")}</div> 
    )
}

```

**注意：**
在组件中直接使用`import { t } from "languages`也是可以工作的，因为本质上`t`函数仅仅是一个普通的函数。但是当动态切换语言时，对应的组件不能自动重新渲染。因此，只有通过`{ t } = useVoerkaI18n()`导入的`t`函数，才可以在切换语言时自动重新渲染组件。

## 第四步：切换语言

接下来在一般我们还需要实现语言切换的功能界面,`useVoerkaI18n`提供了：
- `t`: 当前作用域的翻译函数
- `language`: 当前激活语言名称
- `defaultLanguage`: 默认语言名称
- `changeLanguage(language)`: 用来切换当前语言
- `languages`: 读取当应用支持的语言列表。


```jsx

import { useVoerkaI18n } from "@voerkai18n/openinula"

export function MyComponent(){
     const { t, activeLanguage,changeLanguage,languages,defaultLanguage } = useVoerkaI18n()
    return ( 
        <div>
            <h1>{t("当前语言")}:{activeLanguage}</h1>
            <h1>{t("默认语言")}:{defaultLanguage}</h1>
            <div> {
                {/* 遍历出支持的所有语言 */}
                languages.map(lang=>{
                return (<button 
                            key={lang.name}
                            onclick={()=>changeLanguage(lang.name)}>
                            {lang.title}
                        </button>)
                })}
            </div>             
        </div> 
    )
} 
```


## 小结

- 使用`<VoerkaI18nProvider scope={i18nScope}>`封装根组件
- `const { t } = useVoerkaI18n()`来导入翻译函数
- 使用`const { changeLanguage } = useVoerkaI18n()`来访问切换语言的函数
- 在普通`ts/js`文件中使用`import { t } from "./languages"`来导入`t`翻译函数
- `@voerkai18n/vite`插件是可选的，仅仅普通`ts/js`文件使用`t`翻译函数时用来自动导入。
- 完整示例见:
    - [openinula](https://github.com/zhangfisher/voerka-i18n/tree/master/examples/openinula) 

