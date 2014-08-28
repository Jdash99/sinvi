import os
import json
import numpy as np
from flask import Flask, render_template, request
from flask.ext.script import Manager, Shell
from flask.ext.bootstrap import Bootstrap
from functions import make_data, make_distribution
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.orm.exc import NoResultFound
from pandas import DataFrame

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
manager = Manager(app)
bootstrap = Bootstrap(app)
db = SQLAlchemy(app)


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


# Define our URLs and pages.
@app.route('/', methods=['GET', 'POST'])
def render_plot():
    return render_template('plots.html')


def clean(value):
    try:
        cleaned = float(value)
    except ValueError:
        cleaned = 0
    return cleaned


@app.route('/populate_select', methods=["GET", 'POST'])
def populate_select():
    return json.dumps(ProductDB.get_all_names())


@app.route('/delete_product', methods=["GET", 'POST'])
def delete_product():
    data = request.get_json()
    item = ProductDB.get_product(data['pname'])
    if item:
        db.session.delete(item)
        db.session.commit()
    result = {}
    return json.dumps(result), 200


@app.route('/save_product', methods=['GET', 'POST'])
def save_product():
    pdata = request.get_json()
    print(pdata)
    product = ProductDB(
        name=pdata['name'],
        price=clean(pdata['price']),
        order_cost=clean(pdata['order_cost']),
        initial_inventory=clean(pdata['initial_inventory']),
        demand_dist=pdata['demand_dist'],
        demand_p1=clean(pdata['demand_p1']),
        demand_p2=clean(pdata['demand_p2']),
        demand_p3=clean(pdata['demand_p3']),
        leadtime_dist=pdata['leadtime_dist'],
        leadtime_p1=clean(pdata['leadtime_p1']),
        leadtime_p2=clean(pdata['leadtime_p2']),
        leadtime_p3=clean(pdata['leadtime_p3']),
        )
    db.session.add(product)
    db.session.commit()
    result = {}
    return json.dumps(result), 200


@app.route('/plot', methods=['GET', 'POST'])
def plot():
    if request.method == "POST":
        data = request.get_json()
        if data['product'] == "Example Product":
            header = ['IIP', 'INI', 'D', 'FIP',
                      'FNI', 'LS', 'AVG', 'ORD', 'LT']
            df_A = DataFrame(index=np.arange(52), columns=header).fillna(1)
            price = 18
            order_cost = 200
        else:
            product_A = ProductDB.get_product(data['product'])
            policy = data['policy']
            periods = int(data['periods'])
            p1 = int(data['p1'])
            p2 = int(data['p2'])

            df_A = make_data(product_A,
                             policy={'method': policy,
                                     'param1': p1,
                                     'param2': p2},
                             periods=periods)
            price = product_A.price
            order_cost = product_A.order_cost

        carrying_costs = int(df_A['AVG'].sum() * price * (0.21/52))
        stock_out_costs = int(df_A['LS'].sum() * price)
        ordering_costs = int(df_A.ORD[df_A.ORD > 0].count() * order_cost)
        step_data = [{"PERIOD": int(x), "FIP": int(y)} for x, y in zip(df_A.index, df_A["FIP"])]

        pie_data = [{"TipoCosto": "Carrying", "Costo": carrying_costs},
                    {"TipoCosto": "Stock-Out", "Costo": stock_out_costs},
                    {"TipoCosto": "Ordering", "Costo": ordering_costs}]

        data = [step_data, pie_data]
        return json.dumps(data)


def make_shell_context():
    return dict(
        app=app, db=db,
        Product=ProductDB)

manager.add_command("shell", Shell(make_context=make_shell_context))

if __name__ == '__main__':
    manager.run()
