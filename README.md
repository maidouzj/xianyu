# 闲鱼移动端任务引导页

页面由 Flask 托管，前端使用独立的 HTML、CSS、JavaScript 文件，针对手机浏览器设计。

当前页面包含闲鱼口令复制与跳转、六步任务说明，以及操作截图大图预览。

## 本地运行

```powershell
python -m pip install -r requirements.txt
python app.py
```

浏览器打开 `http://127.0.0.1:5000`。

## Linux 服务器运行

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
gunicorn -w 2 -b 0.0.0.0:5000 app:app
```

建议生产环境在 Gunicorn 前配置 Nginx 与 HTTPS。
