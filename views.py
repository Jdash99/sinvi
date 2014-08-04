import numpy as np
from flask import Flask, render_template, session, redirect, url_for
from flask.ext.script import Manager
from flask.ext.bootstrap import Bootstrap
from flask.ext.wtf import Form
from wtforms import SelectField, IntegerField, SubmitField
from wtforms.validators import NumberRange
from plots import build_plot
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
                          price=8)


class ParametersForm(Form):
    periods = IntegerField('Periods', validators=[
        NumberRange(min=1, message="This number must be greater than zero")])
    policy = SelectField('Policy',
                         choices=[("Qs", "Qs"), ("RS", "RS")],
                         default="Qs")
    p1 = IntegerField(validators=[
        NumberRange(min=1, message="This number must be greater than zero")])
    p2 = IntegerField(validators=[
        NumberRange(min=1, message="This number must be greater than zero")])
    submit = SubmitField('Submit')


# Define our URLs and pages.
@app.route('/', methods=['GET', 'POST'])
def render_plot():

    form = ParametersForm()

    if form.validate_on_submit():
        periods = form.periods.data
        policy_params = {'method': form.policy.data,
                         'param1': form.p1.data,
                         'param2': form.p2.data
                         }
        plot_data = make_data(example_product,
                              policy_params,
                              periods)
        session['plot_snippet'] = build_plot(plot_data, policy_params)
        num_format = lambda x: '{:,}'.format(x)
        formatters = build_formatters(plot_data, num_format)
        session['table'] = plot_data.to_html(
            formatters=formatters,
            classes="table table-hover table-condensed").replace(
            'border="1"', 'border="0"')
        print "before {}".format(session.keys())
        return redirect(url_for('render_plot',
                        plot_snippet=session.get('plot_snippet'),
                        table=session.get('table')))
    print "after {}".format(session.keys())
    return render_template('plots.html',
                           form=form,
                           plot_snippet=session.get('plot_snippet'),
                           table=session.get('table')
                           )

if __name__ == '__main__':
    manager.run()
