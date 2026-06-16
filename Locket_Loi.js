// ========= Siêu Tối Ưu Locket Gold bởi Loi v4 ========= //
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj;

try {
  obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

if (obj) {
  if (!obj.subscriber) obj.subscriber = {};
  if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
  if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

  // Ép vùng quốc gia
  obj.subscriber.country_code = "US";

  var fakeSub = {
    is_sandbox: true,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "9999-01-09T10:10:14Z",
    original_purchase_date: "2024-01-09T10:10:15Z",
    purchase_date: "2024-01-09T10:10:14Z",
    store: "app_store",
    store_transaction_id: "2000001108724193"
  };

  var fakeEntitlement = {
    purchase_date: "2024-01-09T10:10:14Z",
    product_identifier: "locket_1600_1y",
    expires_date: "9999-01-09T10:10:14Z"
  };

  if (ua && ua.includes("Locket")) {
    // Đắp tất cả các ID sản phẩm phổ biến của Locket
    obj.subscriber.subscriptions["locket_1600_1y"] = fakeSub;
    obj.subscriber.subscriptions["locket_gold_yearly"] = fakeSub;
    obj.subscriber.subscriptions["locket_premium_yearly"] = fakeSub;
    
    // Mở khóa mọi nhãn quyền từ viết hoa đến viết thường để phá băng 5s
    let tags = ["Gold", "gold", "pro", "premium", "plus", "locket_gold", "LocketGold", "video_infinity", "extended_video", "long_video"];
    tags.forEach(tag => {
      obj.subscriber.entitlements[tag] = fakeEntitlement;
    });
  }

  $done({ body: JSON.stringify(obj) });
}
