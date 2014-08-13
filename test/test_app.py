import unittest
import pandas as pd
import numpy as np
from functions import make_data, Product, make_distribution


# Product with constants distributions
product_A = Product(name="Product_A",
                    demand_dist=8000,
                    lead_time_dist=1,
                    initial_inventory=24000,
                    price=18)

df_A = make_data(product_A,
                 policy={'method': "Qs",
                         'param1': 20000,
                         'param2': 10000},
                 periods=52)

# Product with a normal demand and triangular lead_time
# Set the seed so we can get the same sequence of number
np.random.seed(42)

product_B = Product(name="Product_B",
                    demand_dist=make_distribution(
                        np.random.normal, 8082, 783),
                    lead_time_dist=make_distribution(
                        np.random.triangular, 1, 1, 2),
                    initial_inventory=24000,
                    price=18)

df_B = make_data(product_B,
                 policy={'method': "Qs",
                         'param1': 20000,
                         'param2': 10000},
                 periods=52)


class TestDataframe(unittest.TestCase):

    def test_dataframeA_type(self):
        "make_data() return a dataframe"
        self.assertEqual(type(df_A), pd.DataFrame)

    def test_dataframeB_type(self):
        "make_data() return a dataframe"
        self.assertEqual(type(df_B), pd.DataFrame)

    def test_dataframeA_expected(self):
        "make_data() return a dataframe"
        self.assertEqual(df_A.sum()["FIP"], 648000)

    def test_dataframeB_expected(self):
        "make_data() return a dataframe"
        self.assertEqual(df_B.sum()["FIP"], 642055)
