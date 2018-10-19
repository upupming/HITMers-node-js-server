# HITSchedule 源代码剖析

## Bmob 后端

软件使用了 `Bmob` 的后端服务，可以先读一读它的[文档](http://doc.bmob.cn/data/android/index.html)。主要思想是提供了一个封装类 `BmobObject`，用户可以继承这个类来存储各种数据（[JavaBeans](https://en.wikipedia.org/wiki/JavaBeans)），再调用 Bmob 提供的方法实现对后端数据的操作：添加、获取、修改、删除等等。

## TimetableView

https://github.com/zfman/TimetableView

## LitePal for Android 本地数据库

https://github.com/LitePalFramework/LitePal

在 `assets/litepal` 中定义了三个数据表项：

```xml
<?xml version="1.0" encoding="utf-8"?>
<litepal>
    <dbname value="classes" ></dbname>

    <version value="5" ></version>

    <list>
        <!-- MySubject 继承了 TimetableView，主要用来存储课程信息 -->
        <mapping class="com.example.aclass.database.MySubject"></mapping>
        <mapping class="com.example.aclass.database.User">< /mapping>
        <mapping class="com.example.aclass.database.Info"></mapping>
    </list>
</litepal>
```

## 登录到教务处网站

### MainActivity.java

经过 Bmob 初始化、检测登录状态、初始化布局等一系列过程。

在检测登录状态 `checkLogin` 方法中调用了 `LoginActivity` 这个类：

```java
// 查询数据库
List<User> users = LitePal.findAll(User.class);
if(users.size() > 0){
    // 直接从数据库获取用户信息
    stuId = users.get(0).getStuId();
    pwd = users.get(0).getPwd();
} else {
    // 无法从数据库获取信息
    Toast.makeText(MainActivity.this, "您尚未登录，请先登录", Toast.LENGTH_SHORT).show();
    // 使用显式 Intent 启动进程
    // https://developer.android.com/guide/components/intents-filters
    Intent intent = new Intent(MainActivity.this, LoginActivity.class);
    startActivity(intent);
    // 结束当前进程
    finish();
}
```

#### LoginActivity.java

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login);

    Bmob.initialize(this, "d2ad693a0277f5fc81c6dc84a91ca08f");

    et_stu_id = findViewById(R.id.stu_id);
    et_pwd = findViewById(R.id.pwd);
    login = findViewById(R.id.login);

    // 用户按下登录按钮
    login.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            stu_id = et_stu_id.getText().toString().trim();
            pwd = et_pwd.getText().toString().trim();

            // 验证账号密码是否正确
            if(!stu_id.isEmpty() && !pwd.isEmpty()){
                // 登录vpn的表单
                final FormBody vpn_data = new FormBody.Builder()
                        .add("tz_offset","480")
                        .add("username", stu_id)
                        .add("password", pwd)
                        .add("realm", "学生")
                        .add("btnSubmit", "登录")
                        .build();

                dialogFragment = new CircleDialog.Builder()
                        .setProgressText("登录中...")
                        .setProgressStyle(ProgressParams.STYLE_SPINNER)
                        .show(getSupportFragmentManager());

                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            //TODO 找到一个更好的判断账号密码是否正确的方法
                            vpn_post("https://vpn.hit.edu.cn/dana-na/auth/url_default/login.cgi", vpn_data,1);
                            vpn_post("https://vpn.hit.edu.cn/dana-na/auth/url_default/login.cgi", vpn_data, 0);
                        } catch (Exception e) {
                            Log.d(TAG, "run: " + e.getMessage());
                        }
                    }
                }).start();
            }
        }
    });
}
```

我们看到请求表单的格式是：

```js
{
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
  // UTC +08:00 对应 -60 * 80 = -480
  tz_offset: "480"
  username: '学号'
  password: '密码'
  realm: '学生'
  btnSubmit: '登录'
}
```

请求的 URL 是：

```
https://vpn.hit.edu.cn/dana-na/auth/url_default/login.cgi
```

在 vpn_post 中可以看到采用的是 POST 方法：

```java
Request request = new Request.Builder()
        .url(url)
        .post(body)
        .build();
```

这一部主要用来验证用户名、密码是否正确。

验证成功后，在 `uiHandler` 中返回 `MainActivity`：

```java
else {
    User user = new User();
    user.setStuId(stu_id);
    user.setPwd(pwd);
    user.save();
    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
    startActivity(intent);
    finish();
    break;
}
```

当本地不存在数据时，调用 `loadData(true)` 从教务处加载数据：

```java
if(mySubjects != null && mySubjects.size() > 0){
            Message msg = new Message();
            msg.what = 0;
            msg.obj = mySubjects;
            uiHandler.sendMessage(msg);
        }
else {
    dialogFragment = new CircleDialog.Builder()
            .setProgressText("加载中...")
            .setProgressStyle(ProgressParams.STYLE_SPINNER)
            .show(getSupportFragmentManager());
    loadData(true);
}
```

再来看 `initData`，定义了登录 jwts.hit.edu.cn 的表单：

```java
// 登录jwts的表单
final FormBody jwts_data = new FormBody.Builder()
        .add("usercode", stuId)
        .add("password", pwd)
        .add("code","")
        .build();
```

再调用 `httpUtil` 提交表单：

```java
// (2)
httpUtil.jwts_post(jwts_data);
// (1)
String cookie = "JSESSIONID=" + httpUtil.JSESSIONID + "; clwz_blc_pst=" + httpUtil.clwz_blc_pst + ";";
httpUtil.kb_get("http://jwts.hit.edu.cn/kbcx/queryGrkb", cookie, uiHandler);
```

`JSESSIONID` 和 `clwz_blc_pst` 在 `HttpUtil` 内部定义。

查到一条 `JSESSIONID` 的赋值语句，在 `getClient` 方法中：

```java
new CookieJar() {
  @Override
  public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
      // ...
      if(cookie.name().equals("JSESSIONID")){
        JSESSIONID = cookie.value();
      }
      // ...
  }
  // ...
}
```

可以看到 `saveFromResponse` 是重载的 `CookieJar` 中的方法，看到文件起始处这么一条语句：

```java
import okhttp3.CookieJar;
```

查看[文档](https://square.github.io/okhttp/3.x/okhttp/okhttp3/CookieJar.html)得知其根据相应的 Cookie 策略 保存指定的 Cookie。

直接在 (1) 处增加打印语句可以看到生成的两者格式如下：

```
2018-09-27 11:25:55.317 6160-6258/com.example.aclass D/Learning log: JSESSIONID = rpw1bsNCNPc2mynRhBcxQD8Pjgllr3CnX52lvYs36RGXfwQpLRh6!922482899
2018-09-27 11:25:55.317 6160-6258/com.example.aclass D/Learning log: clwz_blc_pst = 67113132.24859
```

还是不太清楚它们是怎么得来的。在 (2) 处增加一条打印语句看到：

```
2018-09-27 11:31:54.404 6471-6545/com.example.aclass D/Learning log: Before jwts_post, JSESSIONID = 
2018-09-27 11:31:54.405 6471-6545/com.example.aclass D/Learning log: Before jwts_post, clwz_blc_pst = 
```

因此我们可以确定，这两个 Cookie 值是在调用 `httpUtil.jwts_post(jwts_data)` 的时候拿到的。

看看在 `HttpUtil.java` 中的 `jwts_post`：

```java
/**
  * 校园网登录jwts
  * @param body
  * @return
  * @throws Exception
  */
public String jwts_post(RequestBody body) throws Exception {
    String url = "http://jwts.hit.edu.cn/loginLdap";

    OkHttpClient client = getHttpClient();

    // 先get拿到cookie值
    // (3)
    Request request = new Request.Builder()
            .addHeader("Cookie","JSESSIONID=" + JSESSIONID + "; clwz_blc_pst=" + clwz_blc_pst + ";")
            .url(url)
            .post(body)
            .build();

    Call call = client.newCall(request);
    Response response = call.execute();
    String string = response.body().string();
    if(response.isSuccessful()){
        Log.d(TAG, "jwts_post: " + string);
    }else {
        Log.d(TAG, "jwts_post: failed");
    }
    return string;
}
```

我们同样在 (3) 处打印一下这两个 Cookie 值：

