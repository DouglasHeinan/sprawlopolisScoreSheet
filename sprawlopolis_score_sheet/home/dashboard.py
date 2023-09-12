"""Creates the home blueprint and runs the home and about routes."""
from flask import Blueprint, render_template#, redirect, url_for, send_from_directory
# from flask_login import current_user

home_bp = Blueprint(
    "home_bp",
    __name__,
    template_folder="templates",
    static_folder="static"
)

@home_bp.route("/")
def home():
    return render_template("dashboard.html")