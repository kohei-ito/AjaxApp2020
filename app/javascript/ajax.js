function ajax() {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", (e) => {
    const XHR = new XMLHttpRequest();
    const formData = new FormData(document.getElementById("form"));

    // openでリクエストを初期化する
    XHR.open("POST", "/posts", true);

    // レスポンスのタイプを指定
    XHR.responseType = "json";

    // sendでリクエストを送信する
    XHR.send(formData);

    // レスポンスを受け取った時
    XHR.onload = () => {
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);

      formText.value = "";

      if (XHR.status != 200) {
        // レスポンスの HTTP ステータスを解析
        alert(`Error ${XHR.status}: ${XHR.statusText}`); // e.g. 404: Not Found
      } else {
        return null;
      }
    };

    // リクエストが送信できなかった時
    XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();
  });
}

window.addEventListener("load", ajax);
