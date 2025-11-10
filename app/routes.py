from flask import Blueprint, render_template

# 1. สร้าง Blueprint ชื่อ 'main'
main_bp = Blueprint('main', __name__)

# 2. สร้าง Route เดียวสำหรับหน้าเว็บทั้งหมด
@main_bp.route('/')
def index():
    # เราจะ Render แค่ index.html ที่เป็น Single-Page App
    return render_template('index.html')