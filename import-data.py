import requests
import json

# ⚠️ THAY URL API CỦA CẬU VÀO ĐÂY
BASE_URL = 'https://vk057ovew7.execute-api.ap-southeast-1.amazonaws.com/dev'

# Ảnh demo
DEMO_IMG = "https://quy-rn-ecommerce-uploads.s3.ap-southeast-1.amazonaws.com/uploads/e6d837e9-7698-40bd-8c05-6258c3ff294e.jpg"

# Dữ liệu Categories
categories = [
  { "id": "1", "name": "Đồ Nam", "slug": "do-nam" },
  { "id": "2", "name": "Đồ Nữ", "slug": "do-nu" },
  { "id": "3", "name": "Đồng hồ", "slug": "dong-ho" },
]

# Dữ liệu Products
products = [
  {
    "id": 1,
    "name": "Giày Chạy Trail Hoka Speedgoat 5",
    "price": 5100000,
    "categoryId": "1",
    "brandId": "hoka",
    "imgMain": DEMO_IMG,
    "images": [DEMO_IMG],
    "sizes": ["40", "41", "42"],
    "descriptionHtml": "<p>Hoka Speedgoat 5...</p>"
  },
  {
    "id": 2,
    "name": "Áo Khoác Nam On Running",
    "price": 7060000,
    "categoryId": "1",
    "brandId": "on",
    "imgMain": DEMO_IMG,
    "images": [DEMO_IMG],
    "descriptionHtml": "<p>Ao khoac...</p>"
  },
  {
    "id": 4,
    "name": "Đồng Hồ COROS Pace 3",
    "price": 6990000,
    "categoryId": "3",
    "brandId": "coros",
    "imgMain": DEMO_IMG,
    "images": [DEMO_IMG],
    "specs": { "battery": "38h" },
    "descriptionHtml": "<p>Dong ho Coros...</p>"
  }
]

def run_import():
    print("🚀 Bắt đầu import dữ liệu (Python)...")
    
    # 1. Import Categories
    print("\n--- Categories ---")
    for cat in categories:
        try:
            # Gửi request POST
            response = requests.post(f"{BASE_URL}/categories", json=cat)
            if response.status_code == 200:
                print(f"✅ Đã tạo: {cat['name']}")
            else:
                print(f"❌ Lỗi {cat['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Lỗi kết nối: {e}")

    # 2. Import Products
    print("\n--- Products ---")
    for p in products:
        try:
            # Convert ID sang string cho chắc chắn
            p['id'] = str(p['id'])
            response = requests.post(f"{BASE_URL}/products", json=p)
            if response.status_code == 200:
                print(f"✅ Đã tạo SP: {p['name']}")
            else:
                print(f"❌ Lỗi SP {p['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Lỗi kết nối: {e}")

    print("\n🏁 Hoàn tất!")

if __name__ == "__main__":
    run_import()