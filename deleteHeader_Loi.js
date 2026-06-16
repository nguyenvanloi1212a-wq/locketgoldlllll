// ========= Xoá Header bởi Loi ========= //
var modifiedHeaders = $request.headers;

if (modifiedHeaders['X-RevenueCat-ETag']) {
  delete modifiedHeaders['X-RevenueCat-ETag'];
}
if (modifiedHeaders['x-revenuecat-etag']) {
  delete modifiedHeaders['x-revenuecat-etag'];
}

$done({ headers: modifiedHeaders });
