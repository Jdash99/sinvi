from config import db
from sqlalchemy.orm.exc import NoResultFound
from functions import make_distribution
import numpy as np


class ProductDB(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    price = db.Column(db.Float)
    order_cost = db.Column(db.Float)
    initial_inventory = db.Column(db.Integer)
    demand_dist = db.Column(db.String())
    demand_p1 = db.Column(db.Float)
    demand_p2 = db.Column(db.Float)
    demand_p3 = db.Column(db.Float)
    leadtime_dist = db.Column(db.String())
    leadtime_p1 = db.Column(db.Float)
    leadtime_p2 = db.Column(db.Float)
    leadtime_p3 = db.Column(db.Float)

    @staticmethod
    def all():
        return ProductDB.query.all()

    @staticmethod
    def get_all_names():
        product_list = db.session.query(ProductDB.id, ProductDB.name).all()
        return [{"pk": pk, "pname": pname} for pk, pname in product_list]

    @staticmethod
    def get_product(name):
        try:
            item = db.session.query(ProductDB).filter(
                ProductDB.name == name).one()
        except NoResultFound:
            print "Product not found"
            return None
        return item

    def demand(self):
        if self.demand_dist == "Constant":
            return self.demand_p1
        elif self.demand_dist == "Normal":
            return make_distribution(
                np.random.normal,
                self.demand_p1,
                self.demand_p2)()
        elif self.demand_dist == "Triangular":
            return make_distribution(
                np.random_triangular,
                self.demand_p1,
                self.demand_p2,
                self.demand_p3
                )()

    def lead_time(self):
        if self.leadtime_dist == "Constant":
            return self.leadtime_p1
        elif self.leadtime_dist == "Normal":
            return make_distribution(
                np.random.normal,
                self.leadtime_p1,
                self.leadtime_p2)()
        if self.leadtime_dist == "Triangular":
            return make_distribution(
                np.random.triangular,
                self.leadtime_p1,
                self.leadtime_p2,
                self.leadtime_p3
                )()

    def __repr__(self):
        return '<Product %r>' % self.name
