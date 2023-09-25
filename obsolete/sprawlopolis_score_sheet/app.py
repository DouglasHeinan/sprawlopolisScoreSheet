"""Sets configurations and runs the app."""
from flask import Flask
# from sprawlopolis_score_sheet import login_manager db
from datetime import date
def init_app():
    """
    Initialises and runs the app.

    Configures the app using the config file, registers the flask blueprints from each of the packages, creates the
    database, and runs the app.
    """

    app = Flask(__name__, static_url_path = "/sprawlopolis_score_sheet")
    app.config.from_object("sprawlopolis_score_sheet.config.Config")

    # login_manager.create_login_manager(app)

    @app.context_processor
    def copyright_year():
        """Keeps footer copyright date current on every page of the app."""
        return dict(year=date.today().year)

    with app.app_context():
        # db.init_db(app)

        from sprawlopolis_score_sheet.home import dashboard
        # from sprawlopolis_score_sheet.auth import auth
        # from sprawlopolis_score_sheet.admin import admin
        # from sprawlopolis_score_sheet import contact
        # from sprawlopolis_score_sheet.profiles import user_profile

        app.register_blueprint(dashboard.home_bp)
        # app.register_blueprint(contact.contact_bp)
        # app.register_blueprint(auth.auth_bp)
        # app.register_blueprint(admin.admin_bp)
        # app.register_blueprint(user_profile.user_profile_bp)

        # db.create_db()

        return app


if __name__ == "__main__":
    app = init_app()
    app.run(debug=True)
