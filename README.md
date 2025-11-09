
<details>

<summary><code><strong>配合Edgeone Pages Functions实现随机背景</strong></code></summary>

## edgeone创建page

- [edgeone page](https://console.tencentcloud.com/edgeone/pages/)创建选什么随便 可以从github关联创建,也可以下载整个项目上传
- 下载项目,修改[day-api.js](./edge-functions/api/day-api.js)里的图片列表
```js
  const images = [
'/pic/light/bingwallpaper_01.jpg',
'/pic/light/bingwallpaper_02.jpg'
  ];
```
- `edge-functions/api/day-api.js`不会显示在部署的`构建产物`文件中,而会出现在`部署-函数`
```js
edgeFunctionsRoutes:[ {
routePath:"/api/day-api",
mountPath:"/api",
module:["edge-functions/api/day-api.js:onRequest"]},]
```

- 设置自定义域
注意上述代码里出现的`routePath` : `domain/api/day-api`这就是图片的访问地址

访问后会跳转具体图片的url `domain/pic/light/bingwallpaper_12.jpg` 这和cf worker的实现不一样 应该也能做到不跳具体的图片

- 参阅

  - [Pages Functions概览](https://pages.edgeone.ai/zh/document/pages-functions-overview)

  - [如何在 Pages Functions 上启用 CORS？](https://pages.edgeone.ai/zh/resources/how-to-enable-cors)
  
</details>

**cloudflare菩萨的速度有点慢了,但我还是爱你的❤️❤️❤️❤️❤️❤️❤️❤️❤️**

<details>
<summary><code><strong>配合cloudflare workers实现GitHub图库的随机背景</strong></code></summary>

## 创建cf worker 写入workers.js 修改图片url

```workers.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
var background_urls = [
'https://cdn.jsdelivr.net/gh/tanmoumou252/bingwallpaper@main/pic/light/bingwallpaper_01.jpg',
'https://cdn.jsdelivr.net/gh/tanmoumou252/bingwallpaper@main/pic/light/bingwallpaper_02.jpg'
]
var index = Math.floor((Math.random()*background_urls.length));
res = await fetch(background_urls[index])
  return new Response(res.body, {
      headers: { 'content-type': 'image/jpeg' },
  })
}
```
如此,在workers的自定义域 路由中配置一下,就可以打开同一个地址每次出现不同的图了
</details>


#### 使用场景

比如下面的openlist 自定义头部
```css
<style>
/*白天背景图*/
.hope-ui-light {
    background-image: url("https://***/bing-light/") !important;
    background-repeat:no-repeat;
    background-size:cover;
    background-attachment:fixed;
    background-position-x:center;
    --hope-colors-background: #f7f8fa00 !important;    
}
/*夜间背景图*/
.hope-ui-dark {
    background-image: url("https://***/bing-dark/") !important;
    background-repeat:no-repeat;
    background-size:cover;
    background-attachment:fixed;
    background-position-x:center;
    --hope-colors-background: #f7f8fa00 !important;
}
</style>
```
