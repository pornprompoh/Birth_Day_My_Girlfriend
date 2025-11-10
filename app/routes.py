from flask import Blueprint, render_template

# 1. สร้าง Blueprint ชื่อ 'main'
main_bp = Blueprint('main', __name__)

# 2. สร้าง Route เดียวสำหรับหน้าเว็บทั้งหมด
@main_bp.route('/')
def index():
    # [แก้ไข] เราจะ Render แค่ index.html (โดยไม่ส่ง list รูปภาพใดๆ)
    return render_template('index.html')