import boto3
from decimal import Decimal
import json

# 1. Cấu hình kết nối DynamoDB
# Nếu đã chạy 'aws configure' thì không cần aws_access_key_id/secret
dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-1') # Thay region của bạn (vd: us-east-1)

def insert_data(table_name, item_data):
    try:
        table = dynamodb.Table(table_name)
        response = table.put_item(Item=item_data)
        print(f"✅ Đã thêm vào bảng {table_name}: PK={list(item_data.values())[0]}")
    except Exception as e:
        print(f"❌ Lỗi thêm vào {table_name}: {str(e)}")

# --- BẮT ĐẦU THÊM DỮ LIỆU ---

# 1. Table: CategoryTypes
# SQL: category_type_id int [pk], name, slug
insert_data('CategoryTypes', {
    'category_type_id': 1,
    'name': 'Thời trang Nam',
    'slug': 'thoi-trang-nam'
})

# 2. Table: Categories
# SQL: category_id [pk], category_type_id, parent_id, name, slug...
insert_data('Categories', {
    'category_id': 10,
    'category_type_id': 1,
    'parent_id': 0, # Hoặc bỏ field này nếu null
    'name': 'Áo phông',
    'slug': 'ao-phong-nam',
    'description': 'Các loại áo phông nam basic, graphic...',
    'is_active': True
})

# 3. Table: Products (Quan trọng: Xử lý Decimal và List)
# SQL: product_id [pk], ... size_variants_json, images_json ...
insert_data('Products', {
    'product_id': 1001,
    'category_id': 10,
    'brand_name': 'Urban Soul',
    'name': 'Áo Thun Basic Oversize',
    'product_code': 'TS-001',
    
    # Decimal: DynamoDB yêu cầu dùng Decimal cho số thực/tiền tệ
    'current_price': Decimal('350000'), 
    'old_price': Decimal('450000'),
    
    # JSON Fields: Trong DynamoDB, hãy lưu dưới dạng List (Mảng) thật sự
    # Thay vì lưu string "[S, M, L]", ta lưu List Python ['S', 'M', 'L']
    'size_variants_json': ['S', 'M', 'L', 'XL'], 
    'images_json': [
        'https://img.com/a1.jpg',
        'https://img.com/a2.jpg'
    ],
    
    'main_image_url': 'https://img.com/a1.jpg',
    'html_description': '<p>Áo thun cotton 100%...</p>',
    'is_new': True,
    'is_on_sale': True,
    'is_best_seller': False,
    'highlight_features': 'Thấm hút mồ hôi, Form rộng',
    'created_at': '2024-05-20T10:00:00Z' # Lưu timestamp dạng chuỗi ISO 8601
})

# 4. Table: Users
insert_data('Users', {
    'user_id': 501,
    'email': 'khachhang@example.com',
    'password_hash': 'hashed_secret_password',
    'full_name': 'Nguyễn Văn A',
    'phone_number': '0901234567',
    'created_at': '2024-01-01T12:00:00Z'
})

# 5. Table: Carts
insert_data('Carts', {
    'cart_item_id': 9999,
    'user_id': 501,
    'cart_owner_id': 'device-uuid-12345',
    'product_id': 1001,
    'selected_size': 'L',
    'quantity': 2,
    'unit_price': Decimal('350000'),
    'created_at': '2024-05-21T08:00:00Z'
})

# 6. Table: Orders
# SQL: order_details_json -> Lưu dạng List of Maps (Mảng các object)
insert_data('Orders', {
    'order_id': 8001,
    'user_id': 501,
    'order_date': '2024-05-22T09:30:00Z',
    'total_amount': Decimal('700000'),
    'shipping_address': '123 Đường Lê Lợi, Q1, TP.HCM',
    'order_status': 'pending',
    
    # Lưu chi tiết đơn hàng trực tiếp vào đây (NoSQL Pattern)
    'order_details_json': [
        {
            'product_id': 1001,
            'name': 'Áo Thun Basic Oversize',
            'quantity': 2,
            'price': Decimal('350000'),
            'size': 'L'
        }
    ]
})

print("\n🎉 Hoàn tất seed dữ liệu!")