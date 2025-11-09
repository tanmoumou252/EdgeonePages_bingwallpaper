
export default async function onRequest(context) {
  // 定义图片列表
  const images = [
'/pic/light/bingwallpaper_01.jpg',
'/pic/light/bingwallpaper_02.jpg',
'/pic/light/bingwallpaper_03.jpg',
'/pic/light/bingwallpaper_04.jpg',
'/pic/light/bingwallpaper_05.jpg',
'/pic/light/bingwallpaper_06.jpg',
'/pic/light/bingwallpaper_07.jpg',
'/pic/light/bingwallpaper_08.jpg',
'/pic/light/bingwallpaper_09.jpg',
'/pic/light/bingwallpaper_10.jpg',
'/pic/light/bingwallpaper_11.jpg',
'/pic/light/bingwallpaper_12.jpg',
'/pic/light/bingwallpaper_13.jpg'
  ];

 // --- 处理 CORS 预检请求 (OPTIONS) ---
  if (context.request.method === 'OPTIONS') {
    const origin = context.request.headers.get("Origin");
    return new Response(null, {
      status: 204, // No Content
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      }
    });
  }

  // --- 处理实际的图片请求 (GET) ---
  
  // 随机选择一个图片
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];

  // 获取当前站点的域名
  const originUrl = new URL(context.request.url).origin;
  const targetUrl = originUrl + selectedImage;

  // 设置 302 重定向的响应头
  const headers = {
    'Location': targetUrl,
    // 允许跨域访问，解决 OpaqueResponseBlocking
    'Access-Control-Allow-Origin': '*', 
    // 防止浏览器缓存这个 API URL
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
  };

  // 返回 302 重定向响应
  return new Response(null, {
    status: 302,
    headers: headers
  });
}