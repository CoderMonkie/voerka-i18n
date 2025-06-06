
适用于`Javascript/Vue/React/ReactNative`的国际化解决方案


[官方网站](https://zhangfisher.github.io/voerka-i18n/)


基于`javascript`的国际化方案很多，比较有名的有`fbt`、`i18next`、`react-i18next`、`vue-i18n`、`react-intl`等等，每一种解决方案均有大量的用户。为什么还要再造一个轮子？好吧，再造轮子的理由不外乎不满足于现有方案，总想着现有方案的种种不足之处，然后就撸起袖子想造一个轮子。

那么到底是对现有解决方案有什么不满？

- 大部份均为要翻译的文本信息指定一个`key`，然后在源码文件中使用形如`$t("message.login")`之类的方式，然后在翻译时将之转换成最终的文本信息。此方式最大的问题是，在源码中必须人为地指定每一个`key`，在中文语境中，想为每一句中文均配套想一句符合语义的`英文key`是比较麻烦的，也很不直观不符合直觉。我希望在源文件中就直接使用中文，如`t("中华人民共和国万岁")`，然后国际化框架应该能自动处理后续的一系列麻烦。

- 要能够比较友好地支持多库多包`monorepo`场景下的国际化协作，当主程序切换语言时，其他包或库也可以自动切换，并且在开发上每个包或库均可以独立地进行开发，集成到主程序时能无缝集成。这点在现有方案上没有找到比较理想的解决方案。

  

**基于此就开始打造`VoerkaI18n`国际化多语言解决方案，主要特性包括：**
 

- 全面工程化解决方案，提供初始化、提取文本、自动翻译、编译等工具链支持。
- 符合直觉，不需要手动定义文本`Key`映射。
- 强大的插值变量`格式化器`机制，可以扩展出强大的多语言特性。
- 支持`babel`插件自动导入`t`翻译函数。
- 支持`nodejs`、浏览器(`vue`/`react`/`solid`)等、`React Native`等任意JS场景
- 采用`工具链`与`运行时`分开设计，发布时只需要集成很小的运行时。
- 高度可扩展的`复数`、`货币`、`数字`等常用的多语言处理机制。
- 翻译过程内，提取文本可以自动进行同步，并保留已翻译的内容。
- 可以动态在线添加支持的语言
- 支持发布后的在线打语言包补丁，修复翻译错误
- 支持调用在线自动翻译对提取文本进行翻译。
- 核心运行时`@voerkai18n/runtime`超过90%的测试覆盖率
- 支持`TypeScript`开发


  

# **开源推荐：** 

- [全流程一健化React/Vue/Nodejs国际化方案 - VoerkaI18n](https://zhangfisher.github.io/voerka-i18n/)
- [极致优雅的状态管理库 - AutoStore](https://zhangfisher.github.io/autostore/)
- [无以伦比的React表单开发库 - speedform](https://zhangfisher.github.io/speed-form/)
- [终端界面开发增强库 - Logsets](https://zhangfisher.github.io/logsets/)
- [简单的日志输出库 - VoerkaLogger](https://zhangfisher.github.io/voerkalogger/)
- [装饰器开发 - FlexDecorators](https://zhangfisher.github.io/flex-decorators/)
- [有限状态机库 - FlexState](https://zhangfisher.github.io/flexstate/)
- [通用函数工具库 - FlexTools](https://zhangfisher.github.io/flex-tools/)
- [小巧优雅的CSS-IN-JS库 - flexstyled](https://zhangfisher.github.io/flexstyled/)
- [为JSON文件添加注释的VSCODE插件 - json_comments_extension](https://github.com/zhangfisher/json_comments_extension)
- [开发交互式命令行程序库 - mixed-cli](https://github.com/zhangfisher/mixed-cli)
- [强大的字符串插值变量处理工具库 - flexvars](https://github.com/zhangfisher/flexvars)
- [前端link调试辅助工具 - yald](https://github.com/zhangfisher/yald)
- [异步信号 - asyncsignal](https://github.com/zhangfisher/asyncsignal)
- [React/Vue/WebComponent树组件 - LiteTree](https://zhangfisher.github.io/lite-tree/)
