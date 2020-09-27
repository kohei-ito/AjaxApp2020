function check() {
  const posts = document.getElementsByClassName("post");

  postsA = Array.from(posts);

  postsA.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    post.addEventListener("click", (e) => {
      const postId = post.getAttribute("data-id");

      const XHR = new XMLHttpRequest();

      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);

      // レスポンスのタイプを指定
      XHR.responseType = "json";

      // sendでリクエストを送信する
      XHR.send();

      // レスポンスを受け取った時
      XHR.onload = () => {
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }

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
  });
}

setInterval(check, 1000);
