import json
import numpy as np
from flask import Flask, render_template, session, redirect, url_for, request
from flask.ext.script import Manager
from flask.ext.bootstrap import Bootstrap
from flask.ext.wtf import Form
from wtforms import SelectField, IntegerField, SubmitField
from wtforms.validators import NumberRange
from functions import Product, make_data, make_distribution, build_formatters

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
manager = Manager(app)
bootstrap = Bootstrap(app)


# This is an example product, but the idea is to create your own products with
# different demand and lead time distributions. Not implemented yet...
example_product = Product(name="Product_A",
                          demand_dist=make_distribution(
                              np.random.normal, 8000, 1000),
                          lead_time_dist=make_distribution(
                              np.random.triangular, 0, 1, 2),
                          initial_inventory=24000,
                          price=8,
                          ord_cost=200)


class ParametersForm(Form):
    periods = IntegerField('Periods', validators=[
        NumberRange(min=1, message="This number must be greater than zero")])
    policy = SelectField('Policy',
                         choices=[("Qs", "Qs"), ("RS", "RS")],
                         default="Qs")
    p1 = IntegerField('p1', validators=[
        NumberRange(min=1, message="This number must be greater than zero")])
    p2 = IntegerField('p2', validators=[
        NumberRange(min=1, message="This number must be greater than zero")])
    submit = SubmitField('Submit')


# Define our URLs and pages.
@app.route('/', methods=['GET', 'POST'])
def render_plot():
    form = ParametersForm()
    return render_template('plots.html', form=form)


@app.route('/plot', methods=['GET', 'POST'])
def plot():
    if request.method == "POST":
        data = request.get_json()
        policy = data['policy']
        periods = int(data['periods'])
        p1 = int(data['p1'])
        p2 = int(data['p2'])
        product_A = Product(name="Product_A",
                            demand_dist=8000,
                            lead_time_dist=1,
                            initial_inventory=24000,
                            price=18,
                            ord_cost=200)

        df_A = make_data(product_A,
                         policy={'method': policy,
                                 'param1': p1,
                                 'param2': p2},
                         periods=periods)

        carrying_costs = int(df_A['AVG'].sum() * product_A.price * (0.21/52))
        stock_out_costs = int(df_A['LS'].sum() * product_A.price)
        ordering_costs = int(df_A.ORD[df_A.ORD > 0].count() * product_A.ord_cost)
        step_data = [{"PERIOD": int(x), "FIP": int(y)} for x, y in zip(df_A.index, df_A["FIP"])]

        pie_data = [{"TipoCosto": "Carrying", "Costo": carrying_costs},
                    {"TipoCosto": "Stock-Out", "Costo": stock_out_costs},
                    {"TipoCosto": "Ordering", "Costo": ordering_costs}]

        data = [step_data, pie_data]
        return json.dumps(data)

if __name__ == '__main__':
    manager.run()
