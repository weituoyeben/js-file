# js-file

transformation functions of file/blob/base64

## usage

`npm install blob-url-file`

`import { blobToBase64 } from 'blob-url-file'`

## blobToBase64

```javascript
const b64Data = await blobToBase64(blob);
```

## urlToBlob

```javascript
const blob = await urlToBlob(url); // url is a dataUrl, like: 'data:application/json;base64,ewogICJoZWxsbyI6ICJ3b3JsZCIKfQ==';
```

## base64ToBlob

```javascript
const blob = await base64ToBlob({ b64Data="", contentType="", sliceSize=512, name=""}); // b64Data is required;
```

## fileUrlToUrl(fileUrl)

```javascript
const fileUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Falco_peregrinus_-_01.jpg/1920px-Falco_peregrinus_-_01.jpg";
const url = await fileUrlToUrl(fileUrl);
```

## downloadFile(fileUrl, name)

```javascript
// autodownload
const fileUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Falco_peregrinus_-_01.jpg/1920px-Falco_peregrinus_-_01.jpg";
downloadFile(fileUrl, name);
```
