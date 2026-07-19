# 闲鱼商品分享页

PC 端静态页面由 Flask 托管，前端使用独立的 HTML、CSS、JavaScript 文件。

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
