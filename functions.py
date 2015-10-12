import numpy as np
from pandas import DataFrame


def clean(value):
    try:
        cleaned = float(value)
    except ValueError:
        cleaned = 0
    return cleaned


class Order(object):
    """Object that stores basic data of an order"""

    def __init__(self, quantity, lead_time):
        self.quantity = quantity
        self.lead_time = lead_time


def make_data(product, policy, periods):
    """ Returns dataframe with the details of the inventory simulation.

    Keyword arguments:
    product -- Product object
    policy -- dict that contains the policy name and parameters. For example:

        policy = {'method': "Qs",
                  'param1': 20000,
                  'param2': 10000
                  }

    periods -- numbers of periods of the simulation
    """

    periods += 1
    # Create zero-filled Dataframe
    period_lst = np.arange(periods)  # index

    # Abbreviations
    # IIP: Initial inventory position
    # INI: Initial net inventory
    # D: Demand
    # FIP: Final inventory position
    # FNI: Final net inventory
    # LS: Lost sales
    # AVG: Average inventory
    # ORD: order quantity
    # LT: lead time
    header = ['IIP', 'INI', 'D', 'FIP',
              'FNI', 'LS', 'AVG', 'ORD', 'LT']
    df = DataFrame(index=period_lst, columns=header).fillna(0)

    # Create a list that will store each period order
    order_l = [Order(quantity=0, lead_time=0)
               for x in range(periods)]

    # Fill DataFrame
    for period in period_lst:
        if period == 0:
            df['IIP'][period] = product.initial_inventory
            df['INI'][period] = product.initial_inventory
            df['FIP'][period] = product.initial_inventory
            df['FNI'][period] = product.initial_inventory

        if period >= 1:
            df['IIP'][period] = df['FIP'][period - 1] + order_l[period - 1].quantity
            df['INI'][period] = df['FNI'][period - 1] + pending_order(order_l, period)

            demand = int(product.demand())

            # We can't have negative demand
            if demand > 0:
                df['D'][period] = demand
            else:
                df['D'][period] = 0

            # We can't have negative IIP
            if df['IIP'][period] - df['D'][period] < 0:
                df['FIP'][period] = 0
            else:
                df['FIP'][period] = df['IIP'][period] - df['D'][period]

            order_l[period].quantity, order_l[period].lead_time = placeorder(product, df['FIP'][period], policy, period)

            df['FNI'][period] = df['INI'][period] - df['D'][period]
            if df['FNI'][period] < 0:
                df['LS'][period] = abs(df['FNI'][period])
                df['FNI'][period] = 0
            else:
                df['LS'][period] = 0
            df['AVG'][period] = (df['INI'][period] + df['FNI'][period]) / 2.0
            df['ORD'][period] = order_l[period].quantity
            df['LT'][period] = order_l[period].lead_time

    return df


def make_distribution(function, *pars):
    """ The distribution factory"""
    def distribution():
        return function(*pars)
    return distribution


def pending_order(order_l, period):
    """Return the order that arrives in actual period"""
    indices = [i for i, order in enumerate(order_l) if order.quantity]
    sum = 0
    for i in indices:
        if period - (i + order_l[i].lead_time + 1) == 0:
            sum += order_l[i].quantity
    return sum


def placeorder(product, final_inv_pos, policy, period):
    """Place the order according the inventory policy:

       Keywords arguments:
       product -- object Product
       final_inv_pos -- final inventory position of period
       policy -- chosen policy Qs or RS
       period -- actual period

       Return:
       quantity to order
       lead time
    """

    lead_time = int(product.lead_time())

    # Qs = if we hit the reorder point s, order Q units
    if policy['method'] == 'Qs' and \
            final_inv_pos <= policy['param2']:
        return policy['param1'], lead_time
    # RS = if we hit the review period R and the reorder point S, order: (S -
    # final inventory pos)
    elif policy['method'] == 'RS' and \
        period % policy['param1'] == 0 and \
            final_inv_pos <= policy['param2']:
        return policy['param2'] - final_inv_pos, lead_time
    else:
        return 0, 0

num_format = lambda x: '{:,}'.format(x)


def build_formatters(df, format):
    return {column: format
            for (column, dtype) in df.dtypes.iteritems()
            if dtype in [np.dtype('int64'), np.dtype('float64')]}
