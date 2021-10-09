function request(config) {
    return new Promise((resolve, reject) => {
        const { url, data = {}, method="GET"} = config;
        if (!config.url) {
            reject(new Error('Url 不存在'));
        }

        const req = new FormData();
        for (let k in data) {
            req.append(k, data[k]);
        }

        const request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.status === 200 && request.readyState === 4) {
                resolve(request.response);
            }
        }
        request.onerror = function() {
            reject(new Error('请求不到'+ url + '的文件'));
        }

        request.open(method.toUpperCase(), url);
        request.responseType = 'blob';
        request.send(req);
    });
}
// blob to base64
const blobToBase64 = function (blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(blob);
    reader.onerror = () => {
      reject(new Error("文件流异常"));
    };
  });
};

// url 非图片
const urlToBase64 = function (url) {
  const list = url.split(",");
  // const type = list[0].match(/:(.*?);/)[1];
  const base64 = atob(list[1]);
  return base64;
};

const urlToBlob = function (url) {
  const list = url.split(",");
  const contentType = list[0].match(/:(.*?);/)[1];
  const b64Data = list[1];
  return base64ToBlob({ b64Data, contentType });
};

// base64 to blob
const base64ToBlob = function ({
  b64Data = "",
  contentType = "",
  sliceSize = 512,
  name = "",
}) {
  return new Promise((resolve, reject) => {
    try {
      const byteCharts = atob(b64Data);
      const byteArray = [];
      for (let offset = 0; offset < byteCharts.length; offset += sliceSize) {
        const slice = byteCharts.slice(offset, offset + sliceSize);
        const byteNumbers = [];
        for (let i = 0; i < slice.length; i++) {
          byteNumbers.push(slice.charCodeAt(i));
        }
        byteArray.push(new Uint8Array(byteNumbers));
      }
      let result = new Blob(byteArray, { type: contentType });
      result = Object.assign(result, {
        preview: URL.createObjectURL(result),
        name,
      });
      resolve(result);
    } catch (e) {
      reject(new Error("base64 错误"));
    }
  });
};

const isValidString = (str) => {
  if (!str) {
    return false;
  }
  if (typeof str !== "string") {
    return false;
  }
  return true;
};

// url to base64 图片法
const imageUrlToBase64 = function (url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      resolve(canvas.toDataURL());
    };
    image.setAttribute("crossOrigin", "Anonymous");
    image.src = url;
    image.onerror = () => {
      reject(new Error("图片流异常"));
    };
  });
};

// fileUrl to blob
const fileUrlToUrl = function (fileUrl) {
  return new Promise((resolve, reject) => {
    try {
      request({ url: fileUrl })
        .then((r) => {
          resolve(URL.createObjectURL(r));
        })
        .catch((e) => {
          reject(e);
        });
    } catch (error) {
      reject(new Error("请求不到文件"));
    }
  });
};

const downloadFile = async function (fileUrl, name) {
  const url = await fileUrlToUrl(fileUrl);
  toDownload(url, name);
};

const toDownload = (url, name) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  a.remove();
};

export {
    blobToBase64, urlToBase64, urlToBlob, base64ToBlob, fileUrlToUrl, downloadFile, toDownload
}