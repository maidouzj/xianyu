from flask import Flask, jsonify, render_template


app = Flask(__name__)


PRODUCT = {
    "share_url": "https://m.tb.cn/h.8XBUg2F?tk=sfuugsBb0tM",
    "share_code": "CZ057",
    "share_text": "【闲鱼】https://m.tb.cn/h.8XBUg2F?tk=sfuugsBb0tM CZ057 「我在闲鱼发布了【codex plus官方渠道代充，账号直接充到自己名下，安全】」",
    "title": "Codex Plus 官方渠道代充",
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
