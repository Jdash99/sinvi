import numpy as np
from flask import Flask, render_template, request
from flask.ext.script import Manager
from flask.ext.bootstrap import Bootstrap
from plots import build_plot
from functions import Product, make_data, make_distribution

app = Flask(__name__)
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
                          price=8)


# Define our URLs and pages.
@app.route('/', methods=['GET', 'POST'])
def render_plot():
    # Default values
    periods = 0
    policy_params = {'method': "Qs", 'param1': 500, 'param2': 500}
    product = example_product

    # Receiving values
    try:
        periods = int(request.form['periods'])
        policy_params = {'method': request.form['policy'],
                         'param1': int(request.form['p1']),
                         'param2': int(request.form['p2'])
                         }
    except:
        print("An error has ocurred when getting the parameters")

    plot_data = make_data(product, policy_params, periods)
    plot_snippet = build_plot(plot_data, policy_params)
    table = plot_data.to_html(
        classes="table table-hover table-condensed").replace(
        'border="1"', 'border="0"')

    return render_template('plots.html',
                           plot=plot_snippet,
                           data=table)

if __name__ == '__main__':
    manager.run()
