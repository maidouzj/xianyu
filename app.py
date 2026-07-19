from flask import Flask, jsonify, render_template


app = Flask(__name__)


PRODUCT = {
    "share_url": "https://m.tb.cn/h.810klun?tk=9eZxgsz2RSV",
    "share_code": "CZ225",
    "share_text": "【闲鱼】https://m.tb.cn/h.810klun?tk=9eZxgsz2RSV CZ225 「我在闲鱼发布了【Codex官方直充 plus续费】」",
    "seller": "AI艺术家",
    "seller_level": "聊小铺 L3",
    "location": "成都",
    "price": 150,
    "wanted": 9,
    "views": 151,
    "title": "Codex Plus 官方渠道代充，账号直接充到自己名下，安全靠谱，随时可查。",
    "published": "2分钟前来过",
    "attributes": [
        {"label": "交易形式", "value": "在线卡密"},
        {"label": "会员类型", "value": "超级会员"},
        {"label": "工具类型", "value": "AI工具"},
        {"label": "使用周期", "value": "月卡"},
    ],
}


@app.get("/")
def index():
    return render_template("index.html", product=PRODUCT)


@app.get("/api/product")
def product_api():
    return jsonify(PRODUCT)


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
